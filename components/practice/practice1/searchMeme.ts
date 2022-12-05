import { useState } from "react";
import { memeType } from "./meme";

export type SearchMemeType = {
  memeData: memeType[];
};

export const SearchMeme = (memeData: memeType[], searchWord: string) => {
  return memeData?.filter((meme: memeType) => {
    if (meme?.name.includes(searchWord)) {
      return meme;
    } else return false;
  });
};

export default SearchMeme;
