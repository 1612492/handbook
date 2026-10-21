"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ThemeChoice = "light" | "dark" | "system";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className="h-9 w-[7.5rem] rounded-md border border-border bg-card"
      />
    );
  }

  const value = (theme as ThemeChoice) ?? "system";

  return (
    <Select value={value} onValueChange={(v) => v && setTheme(v)}>
      <SelectTrigger size="sm" className="w-[7.5rem]" aria-label="Theme">
        <span className="flex items-center gap-2">
          {value === "dark" ||
          (value === "system" && resolvedTheme === "dark") ? (
            <Moon className="size-4" />
          ) : value === "light" ? (
            <Sun className="size-4" />
          ) : (
            <Monitor className="size-4" />
          )}
          <SelectValue />
        </span>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">
          <Sun className="size-4" /> Light
        </SelectItem>
        <SelectItem value="dark">
          <Moon className="size-4" /> Dark
        </SelectItem>
        <SelectItem value="system">
          <Monitor className="size-4" /> System
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
