"use client";

import { useMemo, useState } from "react";
import { Wheel } from "react-custom-roulette";
import type { WheelData } from "react-custom-roulette/dist/components/Wheel/types";

import { useWords } from "@/contexts/layout";
import { useTheme } from "next-themes";

const RouletteeWheel = () => {
  const { theme } = useTheme();
  const { wordsList, handleWining } = useWords();

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const isDark = theme === "dark";

  const data: WheelData[] = useMemo(
    () =>
      wordsList.map((word) => ({
        option: word.text,
      })),
    [wordsList],
  );

  const handleSpin = () => {
    if (!wordsList.length || mustSpin) return;

    const randomIndex = Math.floor(Math.random() * wordsList.length);

    setPrizeNumber(randomIndex);
    setMustSpin(true);
  };

  if (!wordsList?.length)
    return (
      <span className="flex justify-center items-center p-5 border-2 rounded-lg w-full h-full text-xs sm:text-sm md:text-base text-center">
        Nenhuma palavra cadastrada.
      </span>
    );

  return (
    <div className="flex flex-col items-center gap-6 w-full h-full">
      <div className="flex justify-center items-center w-full max-w-70 xs:max-w-85 sm:max-w-105 md:max-w-130 lg:max-w-155 aspect-square roulette-responsive">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={[
            "#8E2A8C",
            "#EC008C",
            "#F0144D",
            "#F22121",
            "#F7931E",
            "#FFE600",
            "#8DC63F",
            "#00A651",
            "#00A99D",
            "#1BA1D2",
            "#0072BC",
            "#2E3192",
          ]}
          textColors={[
            "#f8fafc",
            "#f8fafc",
            "#f8fafc",
            "#f8fafc",
            "#0a1428",
            "#0a1428",
            "#0a1428",
            "#f8fafc",
            "#f8fafc",
            "#0a1428",
            "#f8fafc",
            "#f8fafc",
          ]}
          outerBorderColor={isDark ? "#f8fafc" : "#0a1428"}
          radiusLineColor={isDark ? "#f8fafc" : "#0a1428"}
          outerBorderWidth={2}
          innerBorderWidth={2}
          radiusLineWidth={2}
          fontSize={18}
          textDistance={62}
          spinDuration={0.8}
          onStopSpinning={() => {
            setMustSpin(false);

            const winner = wordsList[prizeNumber];

            if (!winner) return;

            handleWining(winner);
          }}
        />
      </div>

      <button
        tabIndex={-1}
        type="button"
        onClick={handleSpin}
        disabled={!wordsList.length || mustSpin}
        className="bg-primary hover:bg-primary/70 disabled:hover:bg-primary disabled:opacity-50 px-4 py-2 rounded-md font-semibold text-white transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
      >
        {mustSpin ? "Girando..." : "Girar roleta"}
      </button>
    </div>
  );
};

export default RouletteeWheel;
