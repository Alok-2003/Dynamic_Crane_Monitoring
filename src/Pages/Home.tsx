import { Eye } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[url(./bg.png)] object-cover text-white flex flex-col items-center justify-center p-0">
            {/* Heading Section */}
            <div className="w-full max-w-3xl p-8 bg-black/30 bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg border border-black/30" >
                <div className="text-center mb-6">
                    <h1 className="text-5xl font-bold mb-2">Dynamic Hackathon</h1>
                    <h2 className="text-3xl font-light mb-4">Innovating Safety Solutions for Material Handling Industry</h2>
                    <p className="text-5xl font-semibold mb-8 flex justify-center items-center">
                        Team Name:
                        <span className="italic text-cyan-200 flex items-center ml-2">
                            <Eye size={38} className="mr-2" />
                            TriNetra
                        </span>
                    </p>
                </div>

                {/* Buttons Section */}
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => navigate('/admin')}
                        className="px-6 py-3 text-white bg-teal-600 rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
                    >
                        Admin Dashboard
                    </button>
                    <button
                        onClick={() => navigate('/crane')}
                        className="px-6 py-3 text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                    >
                        Crane Dashboard
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Home;
