import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const MyTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [form, setForm] = useState({
    task_title: '',
    task_detail: '',
    submission_info: ''
  });

  useEffect(() => {
    if (user?.email) {
      fetch(`https://micro-task-server-ashen.vercel.app/tasks/buyer/${user.email}`)
        .then(res => res.json())
        .then(data => setTasks(data));
    }
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "Deleting will refund coins.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    });
    if (!confirm.isConfirmed) return;

    fetch(`https://micro-task-server-ashen.vercel.app/tasks/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => {
        Swal.fire('Deleted!', 'Task deleted and coins refunded.', 'success');
        setTasks(tasks.filter(t => t._id !== id));
      });
  };

  const startEdit = (task) => {
    setEditTask(task);
    setForm({
      task_title: task.task_title,
      task_detail: task.task_detail,
      submission_info: task.submission_info
    });
  };

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitUpdate = () => {
    fetch(`https://micro-task-server-ashen.vercel.app/tasks/${editTask._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(() => {
        Swal.fire('Updated!', 'Task updated successfully.', 'success');
        setTasks(tasks.map(t => (t._id === editTask._id ? { ...t, ...form } : t)));
        setEditTask(null);
      });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Tasks</h1>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-blue-600">
            <tr>
              <th className="p-2">Title</th>
              <th className="p-2">Detail</th>
              <th className="p-2">Submission Info</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody className='text-black'>
            {tasks.map(task => (
              <tr key={task._id} className="border-b">
                <td className="p-2">{task.task_title}</td>
                <td className="p-2 max-w-xs truncate">{task.task_detail}</td>
                <td className="p-2">{task.submission_info}</td>
                <td className="p-2 space-x-2">
                  <button onClick={() => startEdit(task)} className="btn btn-primary btn-sm">Update</button>
                  <button onClick={() => handleDelete(task._id)} className="btn btn-error btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Modal */}
      {editTask && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded max-w-lg w-full space-y-4">
            <h2 className="text-xl font-semibold">Update Task</h2>
            <input
              name="task_title"
              value={form.task_title}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Task Title"
            />
            <textarea
              name="task_detail"
              value={form.task_detail}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              placeholder="Task Detail"
            />
            <input
              name="submission_info"
              value={form.submission_info}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Submission Info"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditTask(null)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button onClick={submitUpdate} className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTasks;
