"use client";

import { useState } from "react";
import { TbMoodLookLeft, TbMoodLookRight } from "react-icons/tb";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { PiEyes } from "react-icons/pi";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label: string;
  nameAndId: "password" | "email";
  inputClassName?: string;
  labelClassName?: string;
  lookIcon?: boolean;
  eyeIcon?: boolean;
}

const iconsProperties = {
  iconsClassName: "cursor-pointer text-slate-700",
  size: 23,
};

export const PasswordInput = ({
  label,
  nameAndId,
  inputClassName,
  labelClassName,
  lookIcon = false,
  eyeIcon = false,
}: Props) => {
  const [icon, setIcon] = useState(false);
  const [type, setType] = useState("password");

  if (lookIcon && eyeIcon) eyeIcon = false;

  const showPassword = () => {
    setIcon((prevState) => {
      const newState = !prevState;
      setType(newState ? "text" : "password");
      return newState;
    });
  };

  return (
    <>
      <div className="flex flex-col">
        <label htmlFor="password" className={labelClassName}>
          {label}
        </label>
        <div className={`flex items-center focus-within:ring-2 focus-within:ring-blue-700 ${inputClassName}`}>
          <input
            type={type}
            name={nameAndId}
            id={nameAndId}
            className="flex-1 bg-transparent outline-none border-none"
          />

          {!lookIcon && !eyeIcon && (
            <>
              {icon ? (
                <LuEye
                  size={iconsProperties.size}
                  className={iconsProperties.iconsClassName}
                  onClick={showPassword}
                />
              ) : (
                <LuEyeOff
                  size={23}
                  className={iconsProperties.iconsClassName}
                  onClick={showPassword}
                />
              )}
            </>
          )}
          {lookIcon && !eyeIcon && (
            <>
              {icon ? (
                <TbMoodLookLeft
                  size={iconsProperties.size}
                  className={iconsProperties.iconsClassName}
                  onClick={showPassword}
                />
              ) : (
                <TbMoodLookRight
                  size={iconsProperties.size}
                  className={iconsProperties.iconsClassName}
                  onClick={showPassword}
                />
              )}
            </>
          )}
          {!lookIcon && eyeIcon && (
            <>
              {icon ? (
                <PiEyes
                  size={iconsProperties.size}
                  className={iconsProperties.iconsClassName}
                  onClick={showPassword}
                />
              ) : (
                <PiEyes
                  size={iconsProperties.size}
                  className={`${iconsProperties.iconsClassName} rotate-180`}
                  onClick={showPassword}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
