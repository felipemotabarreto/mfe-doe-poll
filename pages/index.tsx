import Poll from "../components/Poll";
import PollResult from "../components/PollResult";

export default function Home() {
  return (
    <>
      <Poll userId={1} />
      <br />
      <PollResult />
    </>
  );
}
