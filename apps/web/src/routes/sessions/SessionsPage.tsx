import { useSessions } from "@tt-platform/shared";
import { SessionCard } from "@tt-platform/ui";
import SEOMeta from "../../components/seo/SEOMeta";

export default function SessionsPage() {
  const { sessions, loading, error } = useSessions();

  return (
    <>
      <SEOMeta title="Sessions – TT Platform" />
      <div>
        <h1>Sessions</h1>
        {loading && <p>Loading sessions...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div style={{ display: "grid", gap: "1rem" }}>
          {sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      </div>
    </>
  );
}
