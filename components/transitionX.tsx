import { TransitionType } from "./transition";

export const TransitionX = ({
  children,
  execute,
  translateTo,
  translateFrom,
}: TransitionType) => {
  return (
    <div
      className={`transition-all duration-1000 ease-in ${
        execute
          ? `translate-x-${translateFrom} opacity-100`
          : `translate-x-${translateTo} opacity-0`
      }`}
    >
      {children}
    </div>
  );
};

export default TransitionX;
