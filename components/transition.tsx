import React, { ReactNode } from "react";

export type TransitionType = {
  children: ReactNode;
  execute: boolean;
};
export const TransitionY = ({ children, execute }: TransitionType) => {
  return (
    <div
      className={`w-full h-full flex justify-center items-center transition-all duration-1000 ease-in transform ${
        execute ? `opacity-100 translate-y-14` : "opacity-0 translate-y-0"
      }`}
    >
      {children}
    </div>
  );
};

export default TransitionY;
