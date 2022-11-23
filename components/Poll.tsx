import { useEffect, useState } from "react";
import S from "../styles/Poll.module.css";

import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";

export default function Poll({ userId }) {
  const [pollOptions, setPollOptions] = useState([]);
  const [selected, setSelected] = useState();
  const [showSuccess, setShowSuccess] = useState(null);
  const [showError, setShowError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/poll`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((data) => setPollOptions(data));
  }, []);

  useEffect(() => {
    if (!selected) {
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/poll`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: userId, option: selected }),
    })
      .then(() => setShowSuccess(true))
      .catch(() => setShowError(true));
  }, [selected, userId]);

  return (
    <div>
      <ToastContainer
        style={{
          maxWidth: "calc(100% - 46px)",
          position: "fixed",
          top: "20px",
        }}
      >
        <Toast
          bg="success"
          show={showSuccess}
          autohide
          delay={1000}
          onClose={() => setShowSuccess(false)}
        >
          <Toast.Body style={{ color: "white" }}>Poll updated.</Toast.Body>
        </Toast>
        <Toast
          bg="danger"
          show={showError}
          autohide
          delay={1000}
          onClose={() => setShowError(false)}
        >
          <Toast.Body style={{ color: "white" }}>
            There was an error updating the poll.
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <h1>Choose the game mode:</h1>
      <div className={S.pollContainer}>
        {pollOptions.map(({ id, option }) => (
          <div
            className={id === selected ? S.pollSelected : S.poll}
            key={id}
            onClick={() => setSelected(id)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}
