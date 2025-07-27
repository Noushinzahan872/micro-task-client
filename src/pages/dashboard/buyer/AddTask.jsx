

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AddTask = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [buyer, setBuyer] = useState({});
  const navigate = useNavigate();
  const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

  // Load buyer info
  useEffect(() => {
    if (user?.email) {
      fetch(`https://micro-task-server-ashen.vercel.app/users/${user.email}`)
        .then(res => res.json())
        .then(data => setBuyer(data));
    }
  }, [user]);

  //  Upload image to imgbb
  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data?.data?.url;
  };

  const onSubmit = async (data) => {
    const {
      task_title,
      task_detail,
      required_workers,
      payable_amount,
      completion_date,
      submission_info,
      task_image,
    } = data;

    const required = parseInt(required_workers);
    const payable = parseInt(payable_amount);
    const totalCost = required * payable;

    // Check buyer has enough coins
    if (totalCost > buyer.coins) {
      Swal.fire({
        icon: "error",
        title: "Not enough coins!",
        text: "Please purchase coins first.",
      });
      return navigate("/dashboard/purchase-coins");
    }

    // Upload image
    let taskImageURL = "";
    if (task_image[0]) {
      taskImageURL = await uploadImageToImgBB(task_image[0]);
    }

    const newTask = {
      task_title,
      task_detail,
      required_workers: required,
      payable_amount: payable,
      completion_date,
      submission_info,
      task_image_url: taskImageURL,
      buyer_email: user.email,
      status: "active",
      createdAt: new Date()
    };

    // Save task to DB
    fetch("https://micro-task-server-ashen.vercel.app/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((task) => {
        if (task.insertedId) {
          // Reduce coins
          fetch(`https://micro-task-server-ashen.vercel.app/users/deduct-coins/${user.email}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ coins: totalCost }),
          });

          Swal.fire({
            icon: "success",
            title: "Task Added!",
            text: "Your task was added successfully.",
          });
          reset();
        }
      });
  };

  return (
    <div className="max-w-3xl mx-auto shadow-md p-6 rounded">
      <h2 className="text-2xl font-bold mb-4  text-blue-600">Add New Task</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("task_title")} placeholder="Task Title" className="input input-bordered w-full" required />
        <textarea {...register("task_detail")} placeholder="Task Detail" className="textarea textarea-bordered w-full" required />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="number" {...register("required_workers")} placeholder="Required Workers" className="input input-bordered w-full" required />
          <input type="number" {...register("payable_amount")} placeholder="Payable Amount per Worker" className="input input-bordered w-full" required />
        </div>
        <input type="date" {...register("completion_date")} className="input input-bordered w-full" required />
        <input {...register("submission_info")} placeholder="Submission Info (e.g., Screenshot)" className="input input-bordered w-full" required />
        
        {/*  File input for image */}
        <input type="file" {...register("task_image")} accept="image/*" className="file-input file-input-bordered w-full" required />

        <button className="btn bg-blue-600 w-full mt-4">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
