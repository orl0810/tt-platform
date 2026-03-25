import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "@tt-platform/shared";
import SEOMeta from "../../components/seo/SEOMeta";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await authService.signUp(email, password, displayName);
      navigate("/sessions");
    } catch (err: any) {
      setError(err.message ?? "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOMeta title="Register – TT Platform" />
      <div style={{ maxWidth: 400, margin: "4rem auto", padding: "2rem" }}>
        <h1>Create Account</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
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
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
        <p>
          Have an account? <Link to="/auth/login">Sign In</Link>
        </p>
      </div>
    </>
  );
}
