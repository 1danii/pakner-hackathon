import { Button as ButtonRadix } from "@/components/ui/button";
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
import { Check, ChevronsUpDown } from "lucide-react";

export type Habit = {
  emoji: string;
  name: string;
  durationProggress: number;
  duration: number;
  bgLeft: string;
  bgRight: string;
};

const HabitsDropdown = ({
  habits,
  value,
  setValue,
  open,
  setOpen,
}: {
  habits: Habit[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const habitFull = habits.find(habit => habit.name === value);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ButtonRadix
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between h-full px-6 py-3 border border-white rounded-full text-base font-medium text-white bg-white bg-opacity-25 hover:bg-opacity-30 focus:outline-none hover:shadow-outline"
        >
          {value ? `${habitFull?.emoji} ${habitFull?.name}` : "Select habit..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </ButtonRadix>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-white bg-opacity-25 text-white">
        <Command>
          <CommandInput placeholder="Select habit..." />
          <CommandEmpty>No habit found.</CommandEmpty>
          <CommandGroup>
            {habits.map(habit => (
              <CommandItem
                key={habit.name}
                onSelect={currentValue => {
                  setValue(
                    currentValue.toLowerCase() === value.toLowerCase()
                      ? ""
                      : currentValue.charAt(0).toUpperCase() +
                          currentValue.slice(1)
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 text-white",
                    value === habit.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {habit.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default HabitsDropdown;
