import { Button, Button as ButtonRadix } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";

export type Habit = {
  emoji: string;
  name: string;
  durationProggress: number;
  bgLeft: string;
  bgRight: string;
};

const HabitsDropdown = ({
  habits,
  value,
  setValue,
  open,
  setOpen,
  setOpenNewHabit,
}: {
  habits: Habit[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenNewHabit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const habitFull = habits.find(
    habit => habit.name.toLowerCase() == value.toLowerCase()
  );
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ButtonRadix
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between h-full px-6 py-3 border border-white rounded-full text-base font-medium text-white bg-white bg-opacity-25 hover:bg-opacity-30 focus:outline-none hover:shadow-outline"
        >
          {value ? `${habitFull?.emoji} ${habitFull?.name}` : "Select habit..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </ButtonRadix>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0 bg-white bg-opacity-25 text-white rounded-3xl">
        <Command>
          <CommandInput placeholder="Select habit..." />
          <CommandEmpty>No habit found.</CommandEmpty>
          <CommandGroup>
            {habits.map((habit, i) => (
              <CommandItem
                className="hover:bg-white/25"
                key={habit.name}
                onSelect={currentValue => {
                  setValue(
                    currentValue.toLowerCase() == value.toLowerCase()
                      ? ""
                      : currentValue.toLowerCase()
                  );
                  setOpen(false);
                }}
                value={habit.name}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 text-white",
                    value === habit.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {`${habit.emoji} ${habit.name}`}
              </CommandItem>
            ))}
          </CommandGroup>
          <Button onClick={() => setOpenNewHabit(true)}>
            <PlusCircle /> Add habit
          </Button>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default HabitsDropdown;
