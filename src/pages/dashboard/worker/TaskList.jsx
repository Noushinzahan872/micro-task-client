

import { useEffect, useState } from "react";
import { Link } from "react-router";


const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("https://micro-task-server-ashen.vercel.app/tasks/available")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Available Tasks</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
        {tasks.map((task) => (
          <div key={task._id} className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold">{task.task_title}</h3>
            <p className="text-sm">Buyer: {task.buyer_name}</p>
            <p className="text-sm">Pay: {task.payable_amount} coins</p>
            <p className="text-sm">Deadline: {task.completion_date}</p>
            <p className="text-sm">Need: {task.required_workers} workers</p>
            <Link to={`/dashboard/task/${task._id}`}>
              <button className="btn btn-sm bg-blue-600 mt-3">View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
