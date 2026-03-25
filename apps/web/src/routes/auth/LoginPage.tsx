import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "@tt-platform/shared";
import SEOMeta from "../../components/seo/SEOMeta";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await authService.signIn(email, password);
      navigate("/sessions");
    } catch (err: any) {
      setError(err.message ?? "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOMeta title="Login – TT Platform" />
      <div style={{ maxWidth: 400, margin: "4rem auto", padding: "2rem" }}>
        <h1>Sign In</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p>
          No account? <Link to="/auth/register">Register</Link>
        </p>
      </div>
    </>
  );
}
