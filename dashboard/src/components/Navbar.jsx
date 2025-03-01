import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold">
            Media Council of Tanzania (MCT)
          </div>

          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex space-x-4">
            <Link to="/" className="px-3 py-2 rounded hover:bg-blue-700">
              Fomu ya Malalamiko
            </Link>
            <Link
              to="/dashboard"
              className="px-3 py-2 rounded hover:bg-blue-700"
            >
              Dashboard
            </Link>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden flex flex-col space-y-2 mt-2 bg-blue-700 p-4 rounded-lg">
            <Link to="/" className="block px-3 py-2 rounded hover:bg-blue-800">
              Fomu ya malalamiko
            </Link>
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded hover:bg-blue-800"
            >
              Dashboard
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
