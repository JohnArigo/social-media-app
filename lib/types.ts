import { RootConfig } from "../components/WeatherComponent/CurrenWeatherConfig";

export type User = {
  id: number;
  email: string;
  fName: string;
  lName: string;
  password?: string;
  friends?: Friend[];
  theme?: string;
  about?: string;
  flex?: string;
  image?: string;
  banner?: string;
  posts?: postType[];
};

export type Message = {
  id?: number;
  toId: number;
  toImage: string | null;
  toFName: string;
  toLName: string;
  toEmail: string;
  message: string;
  from?: User;
  fromId: number;
};
export type FindUser = {
  id?: number;
  email?: string;
  fName?: string;
  lName?: string;
  password?: string;
  friends?: Friend[];
  posts?: postType[];
};

export type ThemeSend = {
  id?: number;
  email?: string;
  theme: string;
};

export type Friend = {
  id?: number;
  friendInfo?: User;
  friendId: number;
  email?: string;
  friendFirstName: String;
  friendLastName: String;
  image?: string;
  posts?: postType[];
  owner?: User;
  ownerId: number;
  relationshipId: string;
};

export type Banner = {
  id: number;
  link: string;
};

export type allFriends = {
  allFriends: Friend[];
};
export type postType = {
  title: string;
  content: string;
  published: boolean;
  author?: User;
  authorId: number;
};

export type postsType = {
  posts: postType[];
};

export type HomeType = {
  user: User;
};

export type SendUser = {
  email: string;
  fName: string;
  lName: string;
  about: string;
  flex: string;
};

export type bannerData = {
  id: number;
  banner: string;
};

export type bannerNotification = {
  message: string;
  status: boolean;
};

export type UserArray = {
  user: User[];
  users?: User[];
};

export type currentUser = {
  friends: Friend[];
  id: number;
  email: string;
  image: string;
};

export interface signUpType {
  fName: string;
  lName: string;
  email?: string;
  password: string;
  about: string;
  flex: string;
  theme: string;
}

export type geoLocationType = {
  city: string;
  country: string;
  hostname: string;
  ip: string;
  loc: string;
  org: string;
  postal: string;
  region: string;
  timezone: string;
};
export type ExploreType = {
  geoLocation: geoLocationType;
  weather: RootConfig;
  news: ArticleRoot;
};

export interface ArticleRoot {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface Article {
  source: Source;
  author?: string;
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  content?: string;
}

export interface Source {
  id?: string;
  name: string;
}

export type portType = {
  height: number | undefined;
  width: number | undefined;
};
