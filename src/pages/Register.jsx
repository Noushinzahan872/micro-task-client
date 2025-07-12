// import { useState } from "react";

// import { useNavigate } from "react-router";
// import useAuth from "../hooks/useAuth";


// const Register = () => {
//   const { createUser, updateUser } =useAuth();
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const name = e.target.name.value;
//     const email = e.target.email.value;
//     const password = e.target.password.value;
//     const photo = e.target.photo.value;
//     const role = e.target.role.value;

//     if (password.length < 6) return setError("Password must be at least 6 characters long");

//     try {
//       const res = await createUser(email, password);
//       await updateUser(name, photo);
//       const userData = {
//         name,
//         email,
//         photo,
//         role,
//         coins: role === "Worker" ? 10 : 50,
//       };
//       await fetch("http://localhost:3000/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData),
//       });
//       setError("");
//       navigate("/dashboard");
//     } catch (err) {
//       setError("Registration failed or Email already exists");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h2 className="text-2xl font-bold mb-4">Register</h2>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input type="text" name="name" placeholder="Name" required className="w-full p-2 border" />
//         <input type="email" name="email" placeholder="Email" required className="w-full p-2 border" />
//         <input type="text" name="photo" placeholder="Profile Picture URL" required className="w-full p-2 border" />
//         <input type="password" name="password" placeholder="Password" required className="w-full p-2 border" />
//         <select name="role" required className="w-full p-2 border">
//           <option value="">Select Role</option>
//           <option value="Worker">Worker</option>
//           <option value="Buyer">Buyer</option>
//         </select>
//         <button type="submit" className="bg-green-600 text-white w-full py-2">Register</button>
//         {error && <p className="text-red-500 text-sm">{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default Register;






// import { useState } from "react";
// import { useNavigate } from "react-router";
// import useAuth from "../hooks/useAuth";

// const Register = () => {
//   const { createUser, updateUser } = useAuth();
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const name = form.name.value;
//     const email = form.email.value;
//     const password = form.password.value;
//     const imageFile = form.photo.files[0];
//     const role = form.role.value;

//     if (password.length < 6) return setError("Password must be at least 6 characters");

//     try {
//       console.log("📸 Selected Image File:", imageFile); // Step 1

//       // Step 1: Upload image to imgbb
//       const formData = new FormData();
//       formData.append("image", imageFile);

//       const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
//         method: "POST",
//         body: formData,
//       });

//       const imgData = await imgRes.json();
//       if (!imgData.success) throw new Error("Image upload failed");
//       const photoURL = imgData.data.url;
//       console.log("Image uploaded:", photoURL); 

//       // Step 2: Create user in Firebase
//       const res = await createUser(email, password);
//       await updateUser(name, photoURL);
//       console.log("✅ Firebase user created:", res.user); // Step 3

//       // Step 3: Save user to MongoDB
//       const userData = {
//         name,
//         email,
//         photo: photoURL,
//         role,
//         coins: role === "Worker" ? 10 : 50,
//       };
//       console.log("📦 Sending user to DB:", userData); // Step 4

//       await fetch("http://localhost:3000/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData),
//       });

//       setError("");
//       navigate("/dashboard");
//     } catch (err) {
//       console.error("❌ Registration error:", err); // Step 5
//       setError("Registration failed. Try again.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h2 className="text-2xl font-bold mb-4">Register</h2>
//       <form onSubmit={handleSubmit} className="space-y-3">
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
//         {error && <p className="text-red-500 text-sm">{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default Register;



import { useState } from "react";

import useAuth from "../hooks/useAuth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { useNavigate } from "react-router";

const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;

const RegisterLogin = () => {
  const { createUser, updateUser } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  // Email-password registration handler
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
      // Upload image to imgbb
      const formData = new FormData();
      formData.append("image", imageFile);
      const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
        method: "POST",
        body: formData,
      });
      const imgData = await imgRes.json();
      if (!imgData.success) throw new Error("Image upload failed");
      const photoURL = imgData.data.url;

      // Firebase create user
      await createUser(email, password);
      await updateUser(name, photoURL);

      // Prepare user data
      const userData = {
        name,
        email,
        photo: photoURL,
        role,
        coins: role === "Worker" ? 10 : 50,
      };

      // Save user backend
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "User creation failed");
      }

      setError("");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message || "Registration failed");
    }
  };

  // Google login handler
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Prepare user data with default role and coins
      const userData = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        role: "Worker",  // default role, change if needed
        coins: 10,
      };

      // Send user to backend to create if not exists
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      // 400 means user exists, ignore or you can update here if you want

      navigate("/dashboard");
    } catch (err) {
      console.error("Google login failed:", err);
      setError("Google login failed. Try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="space-y-3">
        <input type="text" name="name" placeholder="Name" required className="w-full p-2 border" />
        <input type="email" name="email" placeholder="Email" required className="w-full p-2 border" />
        <input type="file" name="photo" accept="image/*" required className="w-full p-2 border" />
        <input type="password" name="password" placeholder="Password" required className="w-full p-2 border" />
        <select name="role" required className="w-full p-2 border">
          <option value="">Select Role</option>
          <option value="Worker">Worker</option>
          <option value="Buyer">Buyer</option>
        </select>
        <button type="submit" className="bg-green-600 text-white w-full py-2">Register</button>
      </form>

      <div className="mt-6 text-center">
        <p>Or</p>
        <button
          onClick={handleGoogleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-3 w-full"
        >
          Continue with Google
        </button>
      </div>

      {error && <p className="text-red-500 text-center mt-3">{error}</p>}
    </div>
  );
};

export default RegisterLogin;
