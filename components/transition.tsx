import React, { ReactNode } from "react";

export type TransitionType = {
  children: ReactNode;
  execute: boolean;
  translateTo?: string;
  translateFrom?: string;
};
export const TransitionY = ({
  children,
  execute,
  translateTo,
}: TransitionType) => {
  return (
    <div
      className={`transition-all duration-1000 ease-in  ${
        execute
          ? `translate-y-${translateTo} opacity-100`
          : "translate-y-0 opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

export default TransitionY;
