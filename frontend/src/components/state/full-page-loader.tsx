import { clsx } from "clsx";
import { Loader } from "./loader";

// extends react component props
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export const FullPageLoader = ({ text = "Loading...", ...props }: Props) => {
  return (
    <div
      className={clsx(
        "flex items-center w-full justify-center h-screen",
        props.className
      )}
    >
      <div className="flex justify-center items-center flex-row gap-4">
        <Loader />
        <span className="text-gray cal-sans">{text}</span>
      </div>
    </div>
  );
};
