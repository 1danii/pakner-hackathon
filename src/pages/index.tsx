import { cn } from "@/lib/utils";
import { Pause, Play } from "lucide-react";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const Button = (props: React.HTMLProps<HTMLButtonElement>) => {
  return (
    <button
      onClick={props.onClick}
      className={cn(
        "px-4 py-3 border border-white rounded-full text-base font-medium text-white bg-white bg-opacity-25 hover:bg-opacity-30 focus:outline-none hover:shadow-outline",
        props.className
      )}
    >
      {props.children}
    </button>
  );
};

export default function Home() {
  const [minutes, setMinutes] = useState(11);
  const [seconds, setSeconds] = useState(34);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          setSeconds(59);
          setMinutes(prevMinutes => prevMinutes - 1);
        } else {
          setSeconds(prevSeconds => prevSeconds - 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const startTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <main className={`${poppins.className} h-screen p-28`}>
      <div className="relative flex justify-center items-center w-full h-full">
        <div className="-z-50 pointer-events-none fixed inset-0 bg-gradient-to-tr from-violet-950 to-fuchsia-600"></div>
        <div className="-z-50 pointer-events-none rings fixed inset-0 blur-[1px]" />
        <div className="text-white text-7xl font-normal tracking-wide text-center">
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
          <div className="text-lg font-light">IN FOCUS</div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button onClick={startTimer} className="px-20">
          {isActive ? <Pause fill="white" /> : <Play fill="white" />}
        </Button>
      </div>
    </main>
  );
}
