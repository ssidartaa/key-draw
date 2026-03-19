"use client";

import dynamic from "next/dynamic";

const RouletteWheel = dynamic(() => import("./rouletteeWheel"), {
  ssr: false,
});

const Roulette = () => {
  return <RouletteWheel />;
};

export default Roulette;
