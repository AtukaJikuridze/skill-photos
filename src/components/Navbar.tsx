import React from "react";
import NavbarLeftsideImage from "/assets/navbar/navbar-left.png";
import NavbarRightsideImage from "/assets/navbar/navbar-right.png";

const Navbar: React.FC = () => {
  return (
    <nav className="relative flex justify-between items-center ">
      <div className="relative">
        <img
          src={NavbarLeftsideImage}
          alt="left background"
          className=" h-[200px] object-cover"
        />
        <div className="absolute top-0 left-0 w-10 h-full bg-gradient-to-r  to-transparent pointer-events-none" />
      </div>

      <div className="flex justify-center items-center w-full absolute h-full px-6 py-3 bg-gradient-to-r via-blue-600/80 from-blue-700/55 to-blue-700/80 shadow-[0_10px_30px_rgba(59,130,246,0.5)] text-center z-10">
        <h1 className="font-mainBold text-white text-xl">
          მოიძიე შენთვის სასურველი ფოტო სამყარო
        </h1>
      </div>

      <div className="relative">
        <img
          src={NavbarRightsideImage}
          alt="right background"
          className="h-[200px] object-cover"
        />
        {/* Right transparent gradient overlay */}
      </div>
    </nav>
  );
};

export default Navbar;
