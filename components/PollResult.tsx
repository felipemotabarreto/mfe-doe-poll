import { useEffect, useState, useMemo } from "react";
import Button from "react-bootstrap/Button";

export default function PollResult() {
  const [pollOptions, setPollOptions] = useState([]);

  const mostVotedOption = useMemo(() => {
    if (pollOptions.length === 0) {
      return null;
    }

    return pollOptions.reduce((mostVoted, option) => {
      if (option.count > mostVoted.count) {
        return option;
      }

      return mostVoted;
    }, pollOptions[0]);
  }, [pollOptions]);

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

  const createGame = async () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/game`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ option: mostVotedOption.option }),
    }).then((result) => result.json());
  };

  return (
    <>
      <h2>Poll Results:</h2>
      {pollOptions.map(({ option, count, id }) => (
        <p key={id}>
          {option}: {count}
        </p>
      ))}
      <Button
        variant="primary"
        type="button"
        onClick={createGame}
        disabled={!mostVotedOption}
      >
        Create Game
      </Button>
    </>
  );
}
