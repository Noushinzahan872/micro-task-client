// import { useEffect, useState } from "react";

// import useAuth from "../../../hooks/useAuth";
// import Swal from "sweetalert2";
// import { useParams } from "react-router";

// const TaskDetails = () => {
//   const { taskId } = useParams();
//   const { user } = useAuth();

//   const [task, setTask] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submissionDetails, setSubmissionDetails] = useState("");

//   useEffect(() => {
//     fetch(`http://localhost:3000/tasks/${taskId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setTask(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, [taskId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const submission = {
//       task_id: task._id,
//       task_title: task.task_title,
//       payable_amount: task.payable_amount,
//       worker_email: user.email,
//       worker_name: user.displayName,
//       buyer_email: task.buyer_email,
//       buyer_name: task.buyer_name,
//       submission_detail: submissionDetails,
//       submission_date: new Date().toISOString(),
//       status: "pending",
//     };

//     const res = await fetch("http://localhost:3000/submissions", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(submission),
//     });

//     const data = await res.json();
//     if (data.insertedId) {
//       Swal.fire("Success", "Submission sent!", "success");
//       setSubmissionDetails("");
//     }
//   };

//   if (loading) return <div className="text-center py-10">Loading task...</div>;

//   if (!task) return <div className="text-center py-10 text-red-500">Task not found</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-4 space-y-4">
//       <h2 className="text-2xl font-bold">{task.task_title}</h2>
//       <p><strong>Details:</strong> {task.task_detail}</p>
//       <p><strong>Buyer:</strong> {task.buyer_name}</p>
//       <p><strong>Amount:</strong> {task.payable_amount} coins</p>
//       <p><strong>Deadline:</strong> {task.completion_date}</p>

//       <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//         <label className="block">
//           <span className="font-semibold">Your Submission</span>
//           <textarea
//             required
//             value={submissionDetails}
//             onChange={(e) => setSubmissionDetails(e.target.value)}
//             className="textarea textarea-bordered w-full mt-2"
//             rows={4}
//             placeholder="Write your work or paste the required info here..."
//           />
//         </label>
//         <button className="btn btn-primary" type="submit">
//           Submit Task
//         </button>
//       </form>
//     </div>
//   );
// };

// export default TaskDetails;



// import { useEffect, useState } from "react";


// import Swal from "sweetalert2";
// import { useParams } from "react-router";
// import useAuth from "../../../hooks/useAuth";

// const TaskDetails = () => {
//   const { id } = useParams();
//   const { user } = useAuth();
//   const [task, setTask] = useState(null);
//   const [submissionDetail, setSubmissionDetail] = useState("");

//   useEffect(() => {
//     fetch(`http://localhost:3000/tasks/${id}`)
//       .then((res) => res.json())
//       .then((data) => setTask(data));
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const submission = {
//       task_id: task._id,
//       task_title: task.task_title,
//       payable_amount: task.payable_amount,
//       worker_email: user.email,
//       worker_name: user.displayName,
//       buyer_email: task.buyer_email,
//       buyer_name: task.buyer_name,
//       submission_detail: submissionDetail,
//     };

//     const res = await fetch("http://localhost:3000/submissions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(submission),
//     });

//     const data = await res.json();
//     if (data.insertedId) {
//       Swal.fire("Success", "Submission sent!", "success");
//       setSubmissionDetail("");
//     }
//   };

//   if (!task) return <div className="text-center p-10">Loading...</div>;

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">{task.task_title}</h2>
//       <p><strong>Buyer:</strong> {task.buyer_name}</p>
//       <p><strong>Deadline:</strong> {task.completion_date}</p>
//       <p><strong>Pay:</strong> {task.payable_amount} coins</p>
//       <p className="mb-4"><strong>Details:</strong> {task.task_detail}</p>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <textarea
//           rows="4"
//           className="textarea textarea-bordered w-full"
//           placeholder="Enter your submission detail..."
//           value={submissionDetail}
//           onChange={(e) => setSubmissionDetail(e.target.value)}
//           required
//         ></textarea>
//         <button type="submit" className="btn btn-success">Submit Task</button>
//       </form>
//     </div>
//   );
// };

// export default TaskDetails;




import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router";

const TaskDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [task, setTask] = useState(null);
  const [submissionDetail, setSubmissionDetail] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/tasks/available`)
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

    const res = await fetch("http://localhost:3000/submissions", {
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

  if (!task) return <p className="text-center py-10">Loading task...</p>;

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


