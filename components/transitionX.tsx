import { TransitionType } from "./transition";

export const TransitionX = ({
  children,
  execute,
  translateTo,
  translateFrom,
}: TransitionType) => {
  return (
    <div
      className={`transform transition-all duration-1000 ease-in ${
        execute
          ? `${
              translateFrom !== undefined && translateFrom < 0
                ? `-translate-x-${translateFrom}`
                : `translate-x-${translateFrom}`
            } opacity-100`
          : `${
              translateTo < 0
                ? `-translate-x-${translateTo}`
                : `translate-x-${translateTo}`
            } opacity-0`
      }`}
    >
      {children}
    </div>
  );
};

export default TransitionX;
