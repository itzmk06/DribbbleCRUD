const SearchBar = () => {
    return (
      <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 xl:w-1/3 rounded-full px-4 py-3 flex items-center bg-zinc-100">
        {/* Input Field */}
        <div className="flex w-full">
          <input
            className="bg-transparent w-full outline-none text-sm sm:text-base placeholder:text-gray-500"
            type="text"
            placeholder="What are you looking for?"
          />
        </div>
  
        <div className="w-fit cursor-pointer ml-2">
          <img
            className="w-6 h-6 sm:w-8 sm:h-8 lg:w-6 lg:h-6"
            src="https://cdn-icons-png.flaticon.com/128/3917/3917132.png"
            alt="Search Icon"
          />
        </div>
      </div>
    );
  };
  
  export default SearchBar;
  