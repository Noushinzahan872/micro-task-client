import React from 'react';
import { Link } from 'react-router';

const MicroTaskLogo = () => {
    return (
        <div>
            <Link to="/">
            <div className='flex items-end'>
                <img className='mb-2' src="" alt="" />
                <p className='text-3xl -ml-2 font-extrabold'>MicroTask</p>
            </div>
        </Link>
        </div>
    );
};

export default MicroTaskLogo;