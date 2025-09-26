"use client";
import { useTheme } from "next-themes";
import Threads from "./threads";
import { ComponentProps } from "react";

export function ThemedThreads(props: ComponentProps<typeof Threads>) {
  const { theme } = useTheme();

  // RGB values for light and dark mode
  const lightColor: [number, number, number] = [0, 0,0 ]; // teal
  const darkColor: [number, number, number] = [200, 200, 200    ]; // light gray

  const color = theme === "dark" ? darkColor : lightColor;

  return <Threads {...props} color={color} />;
}
