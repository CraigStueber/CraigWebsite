// src/components/Login/Login.jsx
import { useState, useEffect, useMemo } from "react";
import supabase from "../../client";
import { useNavigate, useLocation } from "react-router-dom";
import { useSession } from "../../context/SessionContext";
import "./Login.styles.css";

function Login({ redirectTo = "/wyrmspire" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { userId, setUserId, loading: sessionLoading } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  // Prefer redirect target from navigation state, then prop, then default
  const finalRedirect = useMemo(() => {
    return location.state?.redirectTo || redirectTo || "/wyrmspire";
  }, [location.state, redirectTo]);

  // If already logged in, redirect automatically (wait for session to finish loading)
  useEffect(() => {
    if (!sessionLoading && userId) {
      navigate(finalRedirect, { replace: true });
    }
  }, [sessionLoading, userId, finalRedirect, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("Login failed: " + error.message);
    } else {
      const uid = data.user?.id ?? data.session?.user?.id ?? null;
      setUserId(uid);
      navigate(finalRedirect, { replace: true });
    }

    setLoading(false);
  };

  return (
    <div className="login">
      <h2>You must be logged in to view this content</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />
            Show Password
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
      <p>Want to log in as a guest?</p>
      <p>Email: guest@guest.com</p>
      <p>Password: password</p>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
