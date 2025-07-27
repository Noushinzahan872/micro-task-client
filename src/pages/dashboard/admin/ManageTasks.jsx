import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageTasks = () => {
  const [tasks, setTasks] = useState([]);

  
  const fetchTasks = async () => {
    try {
      const res = await fetch("https://micro-task-server-ashen.vercel.app/admin/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

 
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the task permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`https://micro-task-server-ashen.vercel.app/tasks/${id}`, {
          method: "DELETE",
        });

        const result = await res.json();
        if (res.ok) {
          Swal.fire("Deleted!", result.message, "success");
          fetchTasks(); 
        } else {
          Swal.fire("Error", result.message, "error");
        }
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Manage Tasks</h2>

      <table className="min-w-full border bg-white rounded shadow">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-2">Photo</th>
            <th>Title</th>
            <th>Buyer</th>
            <th>Workers</th>
            <th>Amount</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-black">
          {tasks.length > 0 ? (
            tasks.map((t) => (
              <tr key={t._id} className="text-center border-t hover:bg-blue-50">
                <td className="py-2 px-4"><img className="w-10 h-10 rounded-full mx-auto" src={t.task_image_url}></img></td>
                <td>{t.
task_title}</td>
                <td>{t.buyer_email}</td>
                <td>{t.required_workers}</td>
                <td>{t.payable_amount}</td>
                <td>
                  {t.completion_date
                    ? new Date(t.completion_date).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-gray-500 py-4">
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTasks;
