import { createContext, useContext, useState } from "react";

const DesignThemeContext = createContext();

export const DESIGN_THEMES = {
  luxury: {
    id: "luxury",
    name: "Editorial Luxury",
    bg: "bg-[#F7F3EE]",
    surface: "bg-[#EFE8DF]",
    text: "text-[#1E1B18]",
    mutedText: "text-[#6E655D]",
    accent: "bg-[#8C6239] text-white",
    border: "border-[#D8CEC2]",
    cardStyle: "rounded-none border",
    headingFont: "font-serif tracking-wide",
    arrowStyle: "border-[#8C6239] text-[#8C6239] hover:bg-[#8C6239] hover:text-white",
  },
  studio: {
    id: "studio",
    name: "Minimal Studio",
    bg: "bg-white",
    surface: "bg-neutral-100",
    text: "text-neutral-900",
    mutedText: "text-neutral-500",
    accent: "bg-black text-white",
    border: "border-neutral-200",
    cardStyle: "rounded-lg border",
    headingFont: "font-mono tracking-tight",
    arrowStyle: "border-black text-black hover:bg-black hover:text-white",
  },
};

export function DesignThemeProvider({ children }) {
  const [activeThemeKey, setActiveThemeKey] = useState("luxury");
  const theme = DESIGN_THEMES[activeThemeKey];

  return (
    <DesignThemeContext.Provider
      value={{ theme, activeThemeKey, setActiveThemeKey, allThemes: DESIGN_THEMES }}
    >
      <div className={`min-h-screen transition-colors duration-500 ${theme.bg} ${theme.text}`}>
        {children}
      </div>
    </DesignThemeContext.Provider>
  );
}

export const useDesignTheme = () => useContext(DesignThemeContext);