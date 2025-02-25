import { useState } from "react";
import { RiMenuFold2Fill } from "react-icons/ri";
import { NavLink, useLocation } from "react-router";
import Sidebar from "./Sidebar";

export const navLinks = [
  {
    name: "Home",
    linkTo: "/",
  },
  {
    name: "Movies",
    linkTo: "/movies",
  },
  {
    name: "Analytics",
    linkTo: "/analytics",
  },
];

const Header = () => {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <header className="bg-black text-white py-4 px-4 lg:px-20 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Goody Streams</h1>
      <div
        className={`fixed z-10 top-0 right-0 h-full bg-white overflow-x-hidden transition-width duration-500 ease-in lg:hidden ${
          showSidebar ? "p-6 w-full" : "w-0"
        }`}
      >
        <Sidebar showSidebar={showSidebar} toggle={toggleSidebar} />
      </div>
      <div className="hidden lg:flex flex-row items-center gap-6">
        {navLinks.map((link, index) => (
          <NavLink
            to={`${link.linkTo}`}
            className={({ isActive }) =>
              isActive ||
              (link.linkTo === "/movies" &&
                location.pathname.startsWith("/movies"))
                ? "border-b-2 border-white pb-1"
                : "border-b-2 border-transparent hover:border-white pb-1"
            }
            key={index}
          >
            {link.name}
          </NavLink>
        ))}
      </div>
      <div onClick={toggleSidebar} className="block lg:hidden">
        <RiMenuFold2Fill size={26} />
      </div>
    </header>
  );
};

export default Header;
