export type User = {
  id: number;
  email: string;
  fName: string;
  lName: string;
  password?: string;
  friends: Friend[];
  about?: string;
  flex?: string;
  image?: string;
  posts?: postType[];
};

export type Message = {
  id?: number;
  toId: number;
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

export type Friend = {
  id?: number;
  friendId: number;
  friendFirstName: String;
  friendLastName: String;
  owner?: User;
  ownerId: number;
};

export type allFriends = {
  allFriends: Friend[];
};
export type postType = {
  title: string;
  content: string;
  published: boolean;
  author: User;
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
