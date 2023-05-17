import { cn } from "@/lib/utils";

const Button = (props: React.HTMLProps<HTMLButtonElement>) => {
  return (
    <button
      onClick={props.onClick}
      className={cn(
        "px-6 py-3 border border-white rounded-full text-base font-medium text-white bg-white bg-opacity-25 hover:bg-opacity-30 focus:outline-none hover:shadow-outline",
        props.className
      )}
    >
      {props.children}
    </button>
  );
};

export default Button;
