import { useEffect, useState } from "react";
import MemeResult from "./memeReults";
import SearchMeme from "./searchMeme";
export type memeType = {
  id: number;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
};
export const Meme = () => {
  //fetch data from meme api
  //create search form
  //create meme display
  //meme display contains image, title, and description
  //when mapping use id for key
  const initialMeme: memeType[] = [
    { id: 0, name: "", url: "", width: 0, height: 0, box_count: 0 },
  ];
  const [memeData, setMemeData] = useState<memeType[]>(initialMeme);
  const [currentMeme, setCurrentMeme] = useState<memeType[]>();

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setMemeData(data.data.memes));
  }, []);

  const [form, setForm] = useState<string>("drake");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setCurrentMeme(SearchMeme(memeData, form));
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center mt-5 mb-5 sm:mt-24"
      >
        <input
          className="w-96 h-10"
          type="text"
          value={form}
          onChange={(event) => setForm(event?.target.value)}
        />
        <button className="bg-green-300 w-32 rounded-lg mt-5">Search</button>
      </form>
      <h1>Meme Results:</h1>
      <MemeResult currentMeme={currentMeme!} />
    </section>
  );
};
