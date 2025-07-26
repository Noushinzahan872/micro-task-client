


import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router";
import LoadingSpinner from "../../../shared/LoadingSpinner";

const TaskDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [task, setTask] = useState(null);
  const [submissionDetail, setSubmissionDetail] = useState("");

  useEffect(() => {
    fetch(`https://micro-task-server-ashen.vercel.app/tasks/available`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item._id === id);
        setTask(found);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task) return;

    const submission = {
      task_id: task._id,
      task_title: task.task_title,
      payable_amount: task.payable_amount,
      worker_email: user.email,
      worker_name: user.displayName,
      buyer_name: task.buyer_name,
      buyer_email: task.buyer_email,
      submission_detail: submissionDetail,       submission_date: new Date().toISOString(),
       status: "pending",
    };

    const res = await fetch("https://micro-task-server-ashen.vercel.app/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    });

    const data = await res.json();
    if (data.insertedId) {
      Swal.fire("Submitted!", "Your work has been submitted.", "success");
      setSubmissionDetail("");
    } else {
      Swal.fire("Error!", "Submission failed", "error");
    }
  };

  if (!task) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow mt-6">
     <div className="text-black">
       <h2 className="text-2xl font-bold mb-3">{task.task_title}</h2>
      <p><strong>Buyer:</strong> {task.buyer_name}</p>
      <p><strong>Deadline:</strong> {task.completion_date}</p>
      <p><strong>Payable:</strong> {task.payable_amount} coins</p>
      <p className="mb-4"><strong>Instructions:</strong> {task.task_detail}</p>

     </div>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium">Your Submission</label>
        <textarea
          required
          className="textarea textarea-bordered w-full mb-4"
          rows="4"
          placeholder="Write your answer here..."
          value={submissionDetail}
          onChange={(e) => setSubmissionDetail(e.target.value)}
        ></textarea>
        <button type="submit" className="btn bg-blue-600 w-full">
          Submit Task
        </button>
      </form>
    </div>
  );
};

export default TaskDetails;


