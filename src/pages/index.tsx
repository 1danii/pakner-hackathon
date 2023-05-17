import Button from "@/components/button";
import HabitsDropdown, { Habit } from "@/components/habit-dropdown";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    name: "piano",
    durationProggress: 0,
    bgLeft: "#2e2c26",
    bgRight: "#dedbd5",
  },
  {
    emoji: "📑",
    name: "homework",
    durationProggress: 0,
    bgLeft: "#22f055",
    bgRight: "#35dce8",
  },
];

const NewHabitDialog = ({
  open,
  setOpen,
  setHabits,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setHabits: any;
}) => {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("🎸");
  const [bgL, setBgL] = useState("#2e2c26");
  const [bgR, setBgR] = useState("#dedbd5");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="bg-white/20 text-white backdrop-blur-lg sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set your habit</DialogTitle>
          <DialogDescription>
            Make a new habit. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Icon
            </Label>
            <div className="flex w-full col-span-3 gap-4">
              <Input
                value={emoji}
                onChange={e => setEmoji(e.target.value)}
                id="emoji"
                maxLength={2}
                className="w-12"
              />
            </div>
            <Label htmlFor="name" className="text-right">
              Habit Name
            </Label>
            <div className="flex w-full col-span-3 gap-4">
              <Input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Piano practice"
                className="col-span-3 w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Background Colors:</Label>
            <div className="flex gap-4 col-span-3">
              <Input
                value={bgL}
                onChange={e => setBgL(e.target.value)}
                type="color"
                id="bg-l"
                className="w-12 rounded p-0"
              />
              <Input
                value={bgR}
                onChange={e => setBgR(e.target.value)}
                type="color"
                id="bg-r"
                className="col-span-1 w-12 rounded p-0"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              setHabits(prev => [
                ...prev,
                {
                  emoji: emoji,
                  name: name.toLowerCase(),
                  durationProggress: 0,
                  bgLeft: bgL,
                  bgRight: bgR,
                },
              ]);
              setOpen(false);
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default function Home() {
  const [habits, setHabits] = useLocalStorage("habits", initialHabits);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [currentHabitName, setCurrentHabitName] = useState<string>("");
  const [habitsOpen, setHabitsOpen] = useState(false);
  const [currentHabit, setCurrentHabit] = useState<Habit | null>(null);

  const [newHabitOpen, setNewHabitOpen] = useState(false);

  useEffect(() => {
    const habit = habits.find(habit => habit.name === currentHabitName) || null;
    setCurrentHabit(habit);
  }, [currentHabitName, habits]);

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
      <NewHabitDialog
        open={newHabitOpen}
        setOpen={setNewHabitOpen}
        setHabits={setHabits}
      />
      <nav className="fixed w-screen top-0 inset-x-0 px-28 pt-8 flex justify-between">
        <HabitsDropdown
          setOpenNewHabit={setNewHabitOpen}
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
