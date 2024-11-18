import SearchBar from "./shared/SearchBar";
import { filter_options, trending_search } from '../constants/constant';
import Card from "./shared/Card";
import NavBar from "./shared/Navbar";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const [imageDetails, setImageDetails] = useState([]);
    const navigate = useNavigate(); // Initialize navigate hook

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:3000/items'); 
                setImageDetails(response.data); 
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImages(); 
    }, []);

    // Function to navigate to the Create Post page
    const handleCreateClick = () => {
        navigate('/create');  
    };

    return (
        <>
            <NavBar />
            <div className="w-full h-auto flex flex-col items-center gap-10 px-4 sm:px-8 md:px-12 lg:px-24">
                <div className="tagLine flex pt-24 justify-center flex-col items-center text-6xl sm:text-5xl md:text-6xl lg:text-8xl font-semibold">
                    <h1>Discover the world&apos;s</h1>
                    <h1>top designers</h1>
                </div>
                <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[50%] text-lg flex items-center justify-center text-center">
                    <p className="text-center">Explore work from the most talented and accomplished designers ready to take on your next project</p>
                </div>
                <div className="w-full flex items-center justify-center">
                    <SearchBar />
                </div>
                <div className="flex gap-4 flex-wrap items-center justify-center mt-6 px-4 sm:px-8 md:px-12 lg:px-24">
                    <h1 className="text-zinc-400 text-lg font-medium">Trending Searches</h1>
                    {
                        trending_search.map((item, index) => (
                            <div key={index} className="flex">
                                <p className="px-4 py-1 text-sm font-light rounded-full bg-zinc-100">{item.name}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="flex gap-4 flex-wrap justify-center mt-6 px-4 sm:px-8 md:px-12 lg:px-24">
                    {
                        filter_options.map((item, index) => (
                            <div key={index} className="flex gap-4 items-center">
                                <p className="px-4 py-1 text-sm font-medium rounded-full">{item.name}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="w-full gap-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 sm:px-8 md:px-12 lg:px-24 mt-8">
                    {
                        imageDetails?.map((item, index) => (
                            <Card key={index} imageDetails={item}  />
                        ))
                    }
                </div>

                {/* Create Button */}
                <div className="mt-10 mb-12 flex justify-center">
                    <button
                        onClick={handleCreateClick}
                        className="py-2 px-6 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        Create New Post
                    </button>
                </div>

                <footer className="w-full py-12 px-6 bg-gray-900 text-white">
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="flex gap-4 items-center text-sm font-light">
                            <h1>@2024 Dribbble</h1>
                            <h1>Terms</h1>
                            <h1>Privacy</h1>
                            <h1>Cookies</h1>
                        </div>
                        <div className="md:flex hidden gap-4 items-center text-sm font-light">
                            <h1>Jobs</h1>
                            <h1>Designers</h1>
                            <h1>Freelancers</h1>
                            <h1>Tags</h1>
                            <h1>Places</h1>
                            <h1>Resources</h1>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default HomePage;
