


import { useEffect, useState } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("https://micro-task-server-ashen.vercel.app/tasks/available")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div className="p-4 max-w-7xl w-11/12 mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8 text-blue-600 text-center">
         Tasks
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-blue-200 hover:scale-[1.02] duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-1 rounded-full mb-4">
                <img
                  src={task.task_image_url}
                  alt="Task"
                  className="w-28 h-28 object-cover rounded-full border-4 border-white"
                />
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">{task.task_title}</h3>
              <p className="text-sm text-gray-500 mb-1">👤 Buyer: {task.buyer_name}</p>
              <p className="text-sm text-gray-500 mb-1">💰 Pay: {task.payable_amount} coins</p>
              <p className="text-sm text-gray-500 mb-1">📅 Deadline: {task.completion_date}</p>
              <p className="text-sm text-gray-500 mb-1">👥 Workers Needed: {task.required_workers}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;















// import { useEffect, useState } from "react";


// const Tasks = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     fetch("https://micro-task-server-ashen.vercel.app/tasks/available")
//       .then((res) => res.json())
//       .then((data) => setTasks(data));
//   }, []);

//   return (
//     <div className="p-4 max-w-6xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-blue-600"> Tasks</h2>
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
//         {tasks.map((task) => (
//           <div key={task._id} className="bg-white p-4 rounded-xl shadow">
//             <h3 className="text-lg font-semibold">{task.task_title}</h3>
//             <img className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500 object-cover" src={task.task_image_url}></img>
//             <p className="text-sm">Buyer: {task.buyer_name}</p>
//             <p className="text-sm">Pay: {task.payable_amount} coins</p>
//             <p className="text-sm">Deadline: {task.completion_date}</p>
//             <p className="text-sm">Need: {task.required_workers} workers</p>
            
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Tasks;
