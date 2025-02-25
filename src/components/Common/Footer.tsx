import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 text-center pt-10">
      <p className="mb-3">
        &copy; {new Date().getFullYear()} Goody Streams. All rights reserved.
      </p>
      <div className="flex justify-center space-x-4">
        <a href="#" className="text-gray-400 hover:text-yellow-500">
          <FaFacebook size={20} />
        </a>
        <a href="#" className="text-gray-400 hover:text-yellow-500">
          <FaXTwitter size={20} />
        </a>
        <a href="#" className="text-gray-400 hover:text-yellow-500">
          <FaInstagram size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
