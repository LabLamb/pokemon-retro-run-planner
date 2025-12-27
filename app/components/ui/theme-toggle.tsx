import { Moon, Sun, Smartphone, Gamepad2, Tv } from "lucide-react";
import { Button } from "./button";
import { useTheme } from "../../lib/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

const themes = [
  { value: "fire-red", label: "Fire Red", icon: Sun },
  { value: "leaf-green", label: "Leaf Green", icon: Moon },
  { value: "gb", label: "Game Boy", icon: Smartphone },
  { value: "gbc", label: "Game Boy Color", icon: Gamepad2 },
  { value: "gba", label: "Game Boy Advance", icon: Tv },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  const currentTheme = themes.find(t => t.value === theme) || themes[0];
  const Icon = currentTheme.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          aria-label="Toggle theme"
        >
          <Icon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map(({ value, label, icon: ThemeIcon }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => setTheme(value)}
            className={theme === value ? "bg-accent" : ""}
          >
            <ThemeIcon className="mr-2 h-4 w-4" />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
