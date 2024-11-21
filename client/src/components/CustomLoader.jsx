import React from "react";
import Xmark from "../assets/icons/Xmark";
import Omark from "../assets/icons/Omark";
import style from "../assets/style/loader.module.css";
const CustomLoader = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className={style.custom_loader}>
        <div className={style.first_set}>
          <Xmark />
          <Omark />
        </div>
        <div className={style.second_set}>
          <Omark />
          <Xmark />
        </div>
        <div className={style.third_set}>
          <Xmark />
          <Omark />
        </div>
      </div>
    </div>
  );
};

export default CustomLoader;
