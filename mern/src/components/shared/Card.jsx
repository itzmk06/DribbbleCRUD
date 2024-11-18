import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "remixicon/fonts/remixicon.css";

const Card = ({ imageDetails }) => {
  return (
    <Link
      to={`/view/${imageDetails._id}`}
      className="rounded-lg group relative w-full sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto mb-6 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl"
      aria-label={`View details of ${imageDetails.name}`}
    >
      <div className="relative w-full h-36 sm:h-32 md:h-40 lg:h-48 rounded-lg overflow-hidden shadow-lg">
        <img
          className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110 "
          src={imageDetails?.src}
          alt={imageDetails?.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="flex flex-col gap-2 sm:gap-3 justify-start px-3 py-2">
        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10 sm:w-8 sm:h-8 rounded-full object-cover shadow-md"
            src={imageDetails?.authorImage}
            alt={`${imageDetails.name} by ${imageDetails?.author}`}
          />
          <h1 className="text-sm font-semibold text-gray-800 truncate group-hover:text-black">
            {imageDetails?.name}
          </h1>
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <div className="flex items-center gap-1 group-hover:text-red-500 transition-colors duration-300">
            <i
              className="ri-heart-fill text-lg hover:scale-125 transition-transform"
              title="Likes"
            ></i>
            <h1 className="text-sm">{imageDetails?.likes}</h1>
          </div>

          <div className="flex items-center gap-1 group-hover:text-blue-500 transition-colors duration-300">
            <i
              className="ri-eye-fill text-lg hover:scale-125 transition-transform"
              title="Views"
            ></i>
            <h1 className="text-sm">{imageDetails?.views}</h1>
          </div>
        </div>
      </div>

    </Link>
  );
};

Card.propTypes = {
  imageDetails: PropTypes.shape({
    author:PropTypes.string,
    _id: PropTypes.string,
    id: PropTypes.number,
    src: PropTypes.string.isRequired,
    authorImage: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    likes: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    views: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
  }).isRequired,
};

export default Card;
