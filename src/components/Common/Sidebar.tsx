import { CgClose } from "react-icons/cg";
import { NavLink } from "react-router";
import { navLinks } from "./Header";

interface Props {
  toggle: () => void;
  showSidebar: boolean;
}
const Sidebar: React.FC<Props> = ({ toggle, showSidebar }) => {
  return (
    <div className="overflow-hidden text-black">
      {showSidebar && (
        <>
          <div className="flex justify-end" onClick={toggle}>
            <CgClose />
          </div>
          <div className="h-[80vh] flex flex-col w-full items-center justify-center gap-10">
            {navLinks.map((link, index) => (
              <NavLink key={index} to={link.linkTo}>
                <h1 className="text-xl">{link.name}</h1>
              </NavLink>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
