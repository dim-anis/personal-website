import * as React from "react";

export const useDarkMode = (key, initial) => {
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem(key);
      if (saved !== null) {
        return JSON.parse(saved);
      }
    }

    return initial;
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(isDark));
  }, [isDark]);

  return [isDark, setIsDark];
} 