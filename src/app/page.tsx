"use client";

import { useWord } from "@/contexts/layout";

import ThemeSlider from "@/components/themeSlider";
import MainCard from "@/components/mainCard";
import Modal from "@/components/modal";

const Home = () => {
  const { modal, handleModal } = useWord();

  return (
    <>
      <div className="relative flex justify-center items-center mx-auto p-5 h-screen container">
        <ThemeSlider />

        <MainCard />
      </div>

      <Modal
        title="Inserir uma palavra nova:"
        isOpen={modal}
        onClose={() => handleModal(false)}
      >
        <></>
      </Modal>
    </>
  );
};

export default Home;
