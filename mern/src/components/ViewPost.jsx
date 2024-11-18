import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ViewPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:3000/items/${id}`);
                if (!response.ok) {
                    throw new Error('Post not found');
                }
                const data = await response.json();
                setItem(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:3000/delete/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Post deleted successfully');
                    navigate('/');
                } else {
                    alert('Error deleting post');
                }
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    if (loading) {
        return (
            <div className="max-w-full mx-auto p-6">
                <Skeleton height={400} className="rounded-lg" />
                <Skeleton height={30} width={200} className="mt-4" />
                <Skeleton count={5} className="mt-2" />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center text-xl font-semibold">Error: {error}</div>;
    }

    if (!item) {
        return <div className="text-center text-xl font-semibold text-gray-500">Post not found.</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Post Details</h1>
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-2/3">
                    <img
                        src={item.src}
                        alt="Post"
                        className="w-full h-auto max-h-96 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                            e.target.src = "https://via.placeholder.com/800x400?text=Image+Not+Found";
                        }}
                    />
                </div>
                <div className="w-full lg:w-1/3 space-y-4">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700">Type:</h2>
                        <p className="text-gray-600">{item.type}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700">Likes:</h2>
                        <p className="text-gray-600">{item.likes}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700">Views:</h2>
                        <p className="text-gray-600">{item.views}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700">Author:</h2>
                        <p className="text-gray-600">{item.username}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700">Location:</h2>
                        <p className="text-gray-600">{item.location}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700">Rating:</h2>
                        <p className="text-gray-600">{item.rating}</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-8">
                <Link
                    to={`/update/${id}`}
                    className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all transform hover:scale-105"
                >
                    Update
                </Link>
                <button
                    onClick={handleDelete}
                    className="bg-red-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-700 transition-all transform hover:scale-105"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

ViewPost.propTypes = {
    id: PropTypes.string,
};

export default ViewPost;
