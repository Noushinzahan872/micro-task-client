import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";


const Login = () => {
  const { signIn, googleLogin } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then(() => {
        setError("");
        navigate(from, { replace: true });
      })
      .catch(() => setError("Invalid email or password"));
  };

  const handleGoogle = () => {
    googleLogin()
      .then(() => navigate(from, { replace: true }))
      .catch(() => setError("Google login failed"));
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" placeholder="Email" required className="w-full p-2 border" />
        <input type="password" name="password" placeholder="Password" required className="w-full p-2 border" />
        <button type="submit" className="bg-blue-600 text-white w-full py-2">Login</button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
      <button onClick={handleGoogle} className="bg-red-600 text-white w-full mt-3 py-2">Sign in with Google</button>
    </div>
  );
};

export default Login;
