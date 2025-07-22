// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router";
// import useAuth from "../hooks/useAuth";


// const Login = () => {
//   const { signIn, googleLogin } = useAuth();
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/dashboard";

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     signIn(email, password)
//       .then(() => {
//         setError("");
//         navigate(from, { replace: true });
//       })
//       .catch(() => setError("Invalid email or password"));
//   };

//   const handleGoogle = () => {
//     googleLogin()
//       .then(() => navigate(from, { replace: true }))
//       .catch(() => setError("Google login failed"));
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h2 className="text-2xl font-bold mb-4">Login</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input type="email" name="email" placeholder="Email" required className="w-full p-2 border" />
//         <input type="password" name="password" placeholder="Password" required className="w-full p-2 border" />
//         <button type="submit" className="bg-blue-600 text-white w-full py-2">Login</button>
//         {error && <p className="text-red-500 text-sm">{error}</p>}
//       </form>
//       <button onClick={handleGoogle} className="bg-red-600 text-white w-full mt-3 py-2">Sign in with Google</button>
//     </div>
//   );
// };

// export default Login;




import { useState } from "react";

import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaRegLightbulb } from "react-icons/fa";

import Lottie from "lottie-react";
import loginLottie from "../assets/signin.json"
import { Link, useLocation, useNavigate } from "react-router";
const Login = () => {
  const { signIn, googleLogin } = useAuth();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then(() => {
        Swal.fire("Login Successful", "", "success");
        setError("");
        navigate(from, { replace: true });
      })
      .catch(() => {
        setError("Invalid email or password");
        Swal.fire("Login Failed", "Invalid email or password", "error");
      });
  };

  const handleGoogle = () => {
    googleLogin()
      .then(() => {
        Swal.fire("Login Successful", "Logged in with Google", "success");
        navigate(from, { replace: true });
      })
      .catch(() => {
        setError("Google login failed");
        Swal.fire("Google Login Failed", "Please try again", "error");
      });
  };

  return (
    <div className="min-h-screen py-12 bg-base-200 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full grid lg:grid-cols-2 items-center gap-6">
        {/* Lottie Left */}
        <div className="hidden lg:flex justify-center">
          <Lottie animationData={loginLottie} className="w-full max-w-md" />
        </div>

        {/* Right Form */}
        <div className="bg-base-100 shadow-xl rounded-xl p-6 md:p-10 w-full max-w-md mx-auto">
          <Link
            to="/"
            className="text-2xl flex items-center justify-center font-bold "
          >
          <span className="text-green-600">Micro</span><span className="text-blue-600">Task</span>
          </Link>
          <h1 className="text-xl font-bold mb-3 text-center">Login</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="label font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* Password */}
            <div>
              <label className="label font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  required
                  className="input input-bordered w-full pr-10"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-xl text-gray-500"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full text-white bg-blue-600 px-4 py-2 rounded text-sm"
              >
                Login
              </button>
            </div>
          </form>

          {/* Google Login */}
          <div className="text-center mt-4">
            <p className="text-sm mb-2">Or login with</p>
            <button
              onClick={handleGoogle}
              className="btn btn-outline w-full mt-3 px-4 py-2 rounded"
            >
              Continue with Google
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mt-3">{error}</p>}

          <p className="text-center mt-4 text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
