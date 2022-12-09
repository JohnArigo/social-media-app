import { TransitionType } from "./transition";

export const TransitionX = ({
  children,
  execute,
  translateTo,
  translateFrom,
}: TransitionType) => {
  console.log(translateFrom);
  console.log(translateTo?.charAt(0) === "-");

  return (
    <div
      className={`transition-all duration-1000 ease-in ${
        execute
          ? `${
              translateFrom?.charAt(0) === "-"
                ? `-translate-x-${translateFrom?.slice(1)}`
                : `translate-x-${translateFrom}`
            } opacity-100`
          : `${
              translateTo?.charAt(0) === "-"
                ? `-translate-x-${translateTo?.slice(1)}`
                : `translate-x-${translateTo}`
            } opacity-0`
      }`}
    >
      {children}
    </div>
  );
};

export default TransitionX;
