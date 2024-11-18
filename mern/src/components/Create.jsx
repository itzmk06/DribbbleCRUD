import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [src, setImageUrl] = useState('');
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:3000/upload', {
                src,
                type
            });

            console.log('Image saved successfully:', response.data);
            setImageUrl('');
            setType('');
            navigate('/'); 
        } catch (err) {
            console.error('Error saving image:', err);
            setError('Failed to save image. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "imageUrl") {
            setImageUrl(value);
        } else if (name === "type") {
            setType(value);
        }
        setIsPreviewVisible(true); 
    };

    const SkeletonLoader = () => (
        <div className="space-y-4">
            <div className="h-64 bg-gray-300 rounded-md animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
        </div>
    );

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h1 className="text-2xl font-semibold text-center mb-6">Upload Image</h1>

            {isPreviewVisible && !loading ? (
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                    <h2 className="text-xl font-semibold mb-2">Preview</h2>
                    <div className="flex flex-col items-center space-y-4">
                        <img
                            src={src}
                            alt="Preview"
                            className="w-full h-64 object-cover rounded-md shadow-md"
                            style={{ maxWidth: '300px', maxHeight: '300px' }}
                        />
                        <p className="text-lg font-medium text-gray-800">{type}</p>
                    </div>
                </div>
            ) : (
                <SkeletonLoader />
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    {loading ? (
                        <div className="h-10 bg-gray-300 rounded-md animate-pulse"></div>
                    ) : (
                        <input
                            type="text"
                            name="imageUrl"
                            value={src}
                            onChange={handleInputChange}
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter the image URL"
                        />
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    {loading ? (
                        <div className="h-10 bg-gray-300 rounded-md animate-pulse"></div>
                    ) : (
                        <input
                            type="text"
                            name="type"
                            value={type}
                            onChange={handleInputChange}
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter the type (e.g., Web Design)"
                        />
                    )}
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <button
                    type="submit"
                    className={`w-full py-2 px-4 ${loading ? 'bg-gray-500' : 'bg-blue-600'} text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default Create;
