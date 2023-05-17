import Button from "@/components/button";
import HabitsDropdown, { Habit } from "@/components/habit-dropdown";
import { cn, useLocalStorage } from "@/lib/utils";
import { Pause, Play } from "lucide-react";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const initialHabits: Habit[] = [
  {
    emoji: "🎹",
    name: "Piano",
    durationProggress: 0,
    duration: 30,
    bgLeft: "#2e2c26",
    bgRight: "#dedbd5",
  },
];

export default function Home() {
  const [habits, setHabits] = useLocalStorage("habits", initialHabits);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [currentHabitName, setCurrentHabitName] = useState<string>("");
  const [habitsOpen, setHabitsOpen] = useState(false);

  const [currentHabit, setCurrentHabit] = useState<Habit | null>(null);

  useEffect(() => {
    const habit = habits.find(habit => habit.name === currentHabitName) || null;
    setCurrentHabit(habit);
  }, [currentHabitName]);

  useEffect(() => {
    let interval: any = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 60) {
          setSeconds(0);
          setMinutes(prevMinutes => prevMinutes + 1);
        } else {
          setSeconds(prevSeconds => prevSeconds + 1);
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
    <main
      style={
        {
          "--bg-right": currentHabit?.bgRight || "#9024DE",
          "--bg-left": currentHabit?.bgLeft || "#330A69",
        } as React.CSSProperties
      }
      className={`${poppins.className} h-screen p-28`}
    >
      <nav className="fixed w-screen top-0 inset-x-0 px-28 pt-8 flex justify-between">
        <HabitsDropdown
          habits={habits}
          value={currentHabitName}
          setValue={setCurrentHabitName}
          open={habitsOpen}
          setOpen={setHabitsOpen}
        />
        <Button>{}</Button>
      </nav>
      <div className="relative flex justify-center items-center w-full h-full">
        <div className="-z-50 pointer-events-none fixed inset-0 bg-gradient-to-tr from-[color:var(--bg-left)] to-[color:var(--bg-right)] duration-500"></div>
        <div className="-z-50 pointer-events-none rings fixed inset-0 blur-[1px]" />
        <div className="text-white text-7xl font-normal tracking-wide text-center">
          {`${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`}
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
