import { useParams } from "react-router-dom";
import { useSessions } from "@tt-platform/shared";
import { ExercisePlayer } from "@tt-platform/ui";
import SEOMeta from "../../components/seo/SEOMeta";

export default function SessionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getSessionById } = useSessions();
  const session = getSessionById(id!);

  if (!session) return <p>Session not found.</p>;

  return (
    <>
      <SEOMeta title={`${session.title} – TT Platform`} />
      <div>
        <h1>{session.title}</h1>
        <p>{session.description}</p>
        <ExercisePlayer session={session} />
      </div>
    </>
  );
}
