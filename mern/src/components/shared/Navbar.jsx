const NavBar = () => {
    return (
      <div className="w-full h-auto py-2">
        <div className="flex flex-col sm:flex-row justify-between items-center py-2 px-4">
          {/* Logo */}
          <div>
            <img
              className="w-28 sm:w-36 md:w-"
              src="https://imgs.search.brave.com/8S4-Z1SEK0dg31NDc_emLpenIMkCPg4XLDCm2C7NcSI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zZWVr/bG9nby5jb20vaW1h/Z2VzL0QvZHJpYmJi/bGUtbG9nby1DODND/QzI4NTUyLXNlZWts/b2dvLmNvbS5wbmc"
              alt="Logo"
            />
          </div>
  
          {/* Nav Links */}
          <div className="flex flex-col sm:flex-row sm:gap-12 gap-4 items-center sm:mt-0 mt-4">
            <div className="flex items-center gap-1">
              <h1 className="text-lg font-medium">Explore</h1>
              <i className="fi fi-br-angle-small-down text-lg"></i>
            </div>
            <h1 className="text-lg font-medium">Hire a designer</h1>
            <h1 className="text-lg font-medium">Find Jobs</h1>
            <h1 className="text-lg font-medium">Blog</h1>
          </div>
  
          {/* Sign Up / Login Buttons */}
          <div className="flex  flex-col sm:flex-row justify-center items-center mt-4 sm:mt-0 gap-3 font-medium">
            <button className="w-fit px-4 py-2 cursor-pointer rounded-full border border-gray-300">Admin</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default NavBar;
  