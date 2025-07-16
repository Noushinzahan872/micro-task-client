


// import { useState } from "react";

// import useAuth from "../hooks/useAuth";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "../firebase/firebase.init";
// import { useNavigate } from "react-router";

// const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;

// const RegisterLogin = () => {
//   const { createUser, updateUser } = useAuth();
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const provider = new GoogleAuthProvider();

//   // Email-password registration handler
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const name = form.name.value;
//     const email = form.email.value;
//     const password = form.password.value;
//     const imageFile = form.photo.files[0];
//     const role = form.role.value;

//     if (password.length < 6) return setError("Password must be at least 6 characters");

//     try {
//       // Upload image to imgbb
//       const formData = new FormData();
//       formData.append("image", imageFile);
//       const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
//         method: "POST",
//         body: formData,
//       });
//       const imgData = await imgRes.json();
//       if (!imgData.success) throw new Error("Image upload failed");
//       const photoURL = imgData.data.url;

//       // Firebase create user
//       await createUser(email, password);
//       await updateUser(name, photoURL);

//       // Prepare user data
//       const userData = {
//         name,
//         email,
//         photo: photoURL,
//         role,
//         coins: role === "Worker" ? 10 : 50,
//       };

//       // Save user backend
//       const res = await fetch("http://localhost:3000/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData),
//       });
//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || "User creation failed");
//       }

//       setError("");
//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//       setError(err.message || "Registration failed");
//     }
//   };

//   // Google login handler
//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       // Prepare user data with default role and coins
//       const userData = {
//         name: user.displayName,
//         email: user.email,
//         photo: user.photoURL,
//         role: "Worker",  // default role, change if needed
//         coins: 10,
//       };

//       // Send user to backend to create if not exists
//       const res = await fetch("http://localhost:3000/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData),
//       });

//       // 400 means user exists, ignore or you can update here if you want

//       navigate("/dashboard");
//     } catch (err) {
//       console.error("Google login failed:", err);
//       setError("Google login failed. Try again.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h2 className="text-2xl font-bold mb-4">Register</h2>
//       <form onSubmit={handleRegister} className="space-y-3">
//         <input type="text" name="name" placeholder="Name" required className="w-full p-2 border" />
//         <input type="email" name="email" placeholder="Email" required className="w-full p-2 border" />
//         <input type="file" name="photo" accept="image/*" required className="w-full p-2 border" />
//         <input type="password" name="password" placeholder="Password" required className="w-full p-2 border" />
//         <select name="role" required className="w-full p-2 border">
//           <option value="">Select Role</option>
//           <option value="Worker">Worker</option>
//           <option value="Buyer">Buyer</option>
//         </select>
//         <button type="submit" className="bg-green-600 text-white w-full py-2">Register</button>
//       </form>

//       <div className="mt-6 text-center">
//         <p>Or</p>
//         <button
//           onClick={handleGoogleLogin}
//           className="bg-blue-600 text-white px-4 py-2 rounded mt-3 w-full"
//         >
//           Continue with Google
//         </button>
//       </div>

//       {error && <p className="text-red-500 text-center mt-3">{error}</p>}
//     </div>
//   );
// };

// export default RegisterLogin;



import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import useAuth from "../hooks/useAuth";

import Swal from "sweetalert2";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaRegLightbulb } from "react-icons/fa";

import Lottie from "lottie-react";
import lottieRegister from "../../src/assets/register.json"
import { Link, useNavigate } from "react-router";
import MicroTaskLogo from "../shared/MicroTaskLogo";

const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;

const RegisterLogin = () => {
  const { createUser, updateUser } = useAuth();
  const [error, setError] = useState("");
  // const [profilePic, setProfilePic] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const imageFile = form.photo.files[0];
    const role = form.role.value;

    if (password.length < 6) return setError("Password must be at least 6 characters");

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", imageFile);
      const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
        method: "POST",
        body: formData,
      });
      const imgData = await imgRes.json();
      if (!imgData.success) throw new Error("Image upload failed");
      const photoURL = imgData.data.url;

      await createUser(email, password);
      await updateUser(name, photoURL);

      const userData = {
        name,
        email,
        photo: photoURL,
        role,
        coins: role === "Worker" ? 10 : 50,
      };

      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "User creation failed");
      }

      setUploading(false);
      setError("");
      Swal.fire("Success!", "Account created successfully!", "success");
      navigate("/dashboard");
    } catch (err) {
      setUploading(false);
      console.error(err);
      setError(err.message || "Registration failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        role: "Worker",
        coins: 10,
      };
      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      navigate("/dashboard");
    } catch (err) {
      console.error("Google login failed:", err);
      setError("Google login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen py-12 bg-base-200 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full grid lg:grid-cols-2 items-center gap-6">
        <div className="hidden lg:flex justify-center flex-row-reverse">
          <Lottie animationData={lottieRegister} className="w-full max-w-md" style={{ transform: "scaleX(-1)" }} />
        </div>

        <div className="bg-base-100 shadow-xl rounded-xl p-6 md:p-10 w-full max-w-md mx-auto">
         <Link
                     to="/"
                     className="text-2xl flex items-center justify-center font-bold bg-gradient-to-r from-purple-500 via-pink-400 to-violet-400 bg-clip-text text-transparent"
                   >
                     MicroTask
                   </Link>
                    <h1 className="text-xl font-bold mb-3 text-center">Create an account</h1>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="label font-medium">Full Name</label>
              <input type="text" name="name" required placeholder="Your full name" className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label font-medium">Email Address</label>
              <input type="email" name="email" required placeholder="Your email" className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label font-medium">Profile Picture</label>
              <input type="file" name="photo" accept="image/*" required className="file-input file-input-bordered w-full" />
            </div>
            <div>
              <label className="label font-medium">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} name="password" required placeholder="Password" className="input input-bordered w-full pr-10" />
                <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 cursor-pointer text-xl text-gray-500">
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
            </div>
            <div>
              <label className="label font-medium">Role</label>
              <select name="role" required className="select select-bordered w-full">
                <option value="">Select Role</option>
                <option value="Worker">Worker</option>
                <option value="Buyer">Buyer</option>
              </select>
            </div>
            <button type="submit" disabled={uploading} className="w-full btn text-white bg-blue-600">
              {uploading ? "Uploading..." : "Register"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p>Or</p>
            <button onClick={handleGoogleLogin} className="btn btn-outline w-full mt-3">
              Continue with Google
            </button>
          </div>

          {error && <p className="text-red-500 text-center mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
