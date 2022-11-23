import { useEffect, useState } from "react";

export default function PollResult() {
  const [pollOptions, setPollOptions] = useState([]);

  useEffect(() => {
    const id = setInterval(() => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/poll`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((result) => result.json())
        .then((data) => setPollOptions(data));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <h2>Poll Results:</h2>
      {pollOptions.map(({ option, count, id }) => (
        <p key={id}>
          {option}: {count}
        </p>
      ))}
    </>
  );
}
