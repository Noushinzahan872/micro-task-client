import React from 'react';
import { Link } from 'react-router';
import { FaBriefcase } from "react-icons/fa";


const MicroTaskLogo = () => {
    return (
        <div>
            <Link to="/">
             <div className="flex items-center gap-2">
      <FaBriefcase className="text-2xl text-green-600" />
      <p className='font-extrabold text-2xl'><span className='text-green-600'>Micro</span><span className='text-blue-600'>Task</span></p>
    </div>
            </Link>

        </div>
    );
};

export default MicroTaskLogo;