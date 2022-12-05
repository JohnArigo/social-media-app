import React, { SetStateAction, useState } from "react";
import { Meme, memeType } from "./meme";

export type SelectedMemeType = {
  selectedMeme: memeType;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

export const SelectedMeme = ({
  selectedMeme,
  open,
  setOpen,
}: SelectedMemeType) => {
  if (open) {
    return (
      <section
        onClick={() => setOpen(false)}
        className="w-screen h-screen bg-gray-100 fixed top-0 z-50 bg-opacity-90 flex justify-center items-center"
      >
        <div>
          <h2 className="text-center">Meme Title: {selectedMeme.name}</h2>
          <img className="w-96 h-72" src={selectedMeme.url} />
        </div>
      </section>
    );
  } else {
    return null;
  }
};

export default SelectedMeme;
