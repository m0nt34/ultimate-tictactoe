import React from "react";
import Xmark from "../assets/icons/Xmark";
import Omark from "../assets/icons/Omark";

const CustomLoader = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="custom_loader">
        <div className="first_set">
          <Xmark />
          <Omark />
        </div>
        <div className="second_set">
          <Omark />
          <Xmark />
        </div>
        <div className="third_set">
          <Xmark />
          <Omark />
        </div>
      </div>
    </div>
  );
};

export default CustomLoader;
