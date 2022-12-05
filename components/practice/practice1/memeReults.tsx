import { useState } from "react";
import { memeType } from "./meme";
import SelectedMeme from "./selected";
export type MemeResultProps = { currentMeme: memeType[] };
export const MemeResult = ({ currentMeme }: MemeResultProps) => {
  const initialMeme = {
    id: 0,
    name: "",
    url: "",
    width: 0,
    height: 0,
    box_count: 0,
  };
  const [selectedMeme, setSelectedMeme] = useState<memeType>(initialMeme);
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = (index: number) => {
    setSelectedMeme(currentMeme[index]);
    setOpen(true);
  };
  return (
    <div className="w-full h-full overflow-y-auto overflow-x-clip">
      {currentMeme?.map((meme, index) => {
        return (
          <div
            key={meme.id}
            className="mt-5"
            onClick={() => handleClick(index)}
          >
            <img className="w-96 h-72" src={meme.url} />
          </div>
        );
      })}
      <SelectedMeme selectedMeme={selectedMeme} open={open} setOpen={setOpen} />
    </div>
  );
};

export default MemeResult;
