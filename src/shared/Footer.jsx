// import React from 'react';

// const Footer = () => {
//     return (
//         <div>
//             foot
//         </div>
//     );
// };

// export default Footer;





import React from 'react';
import { FaFacebook, FaGithub, FaLinkedinIn, FaSquareYoutube } from 'react-icons/fa6';
import { MdOutlineHistoryEdu } from 'react-icons/md';
import MicroTaskLogo from './MicroTaskLogo';

const Footer = () => {
    return (
        <footer className="px-4 divide-y bg-blue-300 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
            <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
                {/* Logo and Title */}
                <div className="lg:w-1/3">
                    <MicroTaskLogo></MicroTaskLogo>
                </div>

                {/* Footer Sections */}
                <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
                    <div className="space-y-3">
                        <h3 className="tracking-wide uppercase font-bold text-blue-600 dark:text-blue-400">Product</h3>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:underline">Features</a></li>
                            <li><a href="#" className="hover:underline">Integrations</a></li>
                            <li><a href="#" className="hover:underline">Pricing</a></li>
                            <li><a href="#" className="hover:underline">FAQ</a></li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="tracking-wide uppercase font-bold text-blue-600 dark:text-blue-400">Company</h3>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:underline">Privacy</a></li>
                            <li><a href="#" className="hover:underline">Terms of Service</a></li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="uppercase font-bold text-blue-600 dark:text-blue-400">Developers</h3>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:underline">Public API</a></li>
                            <li><a href="#" className="hover:underline">Documentation</a></li>
                            <li><a href="#" className="hover:underline">Guides</a></li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="uppercase font-bold text-blue-600 dark:text-blue-400">Social Media</h3>
                        <div className="flex space-x-4 text-xl">
                            <a target="_blank" rel="noreferrer" href="https://web.facebook.com/Noushin Zahan" className="hover:text-blue-600">
                                <FaFacebook />
                            </a>
                            <a target="_blank" rel="noreferrer" href="https://www.youtube.com/@NOUSHINZAHAN" className="hover:text-blue-600">
                                <FaSquareYoutube />
                            </a>
                            <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/noushinjahan" className="hover:text-blue-500">
                                <FaLinkedinIn />
                            </a>
                            <a target="_blank" rel="noreferrer" href="https://github.com/Noushinzahan872" className="hover:text-blue-600 dark:hover:text-white">
                                <FaGithub />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-6 text-sm text-center dark:text-gray-400">
                © {new Date().getFullYear()} MIcroTasker. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;