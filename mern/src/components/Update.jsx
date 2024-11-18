import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Update = () => {
  const { id } = useParams();
  const [item, setItem] = useState({ src: "", type: "" });
  const [loading, setLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:3000/items/${id}`);
        if (!response.ok) throw new Error("Error fetching item");
        const data = await response.json();
        setItem(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching item:", error);
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        const updatedItem = await response.json();
        setItem(updatedItem);
        setIsUpdated(true);
        setTimeout(() => navigate("/"), 2000); 
      } else alert("Error updating item.");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    const confirmation = window.confirm("Are you sure you want to delete this item?");
    if (confirmation) {
      try {
        const response = await fetch(`http://localhost:3000/delete/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("Item deleted successfully!");
          navigate("/");
        } else alert("Error deleting item.");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <Skeleton height={50} className="mb-6" />
        <Skeleton height={400} className="rounded-lg mb-6" />
        <Skeleton count={4} height={30} className="mb-6" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-gray-50 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Update Post</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">Current Details</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-600 font-semibold  mb-2">Image</label>
              <img
                src={item?.src}
                alt="Item"
                className="w-full h-64 object-cover rounded-md"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-600 font-medium mb-2">Type</label>
              <p className="text-gray-700 text-lg">{item.type}</p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg space-y-6"
        >
          <h2 className="text-xl font-semibold text-gray-700">Update Details</h2>
          <div>
            <label className="block text-gray-600 font-medium mb-2">Image URL</label>
            <input
              type="text"
              name="src"
              value={item.src}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring focus:ring-blue-500 focus:outline-none"
              placeholder="Enter image URL"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">Type</label>
            <input
              type="text"
              name="type"
              value={item.type}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring focus:ring-blue-500 focus:outline-none"
              placeholder="Enter type (e.g., Web Design)"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 transition duration-300"
            disabled={loading}
          >
            Save Changes
          </button>
        </form>
      </div>

      <button
        onClick={handleDelete}
        className="w-full mt-8 py-3 px-4 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500 transition duration-300"
      >
        Delete Post
      </button>

      {isUpdated && (
        <div className="mt-6 text-center text-green-600 text-xl font-medium">
          Post updated successfully! Redirecting...
        </div>
      )}
    </div>
  );
};

export default Update;
