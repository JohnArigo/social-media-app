export type User = {
  id: number;
  email: string;
  fName: string;
  lName: string;
  password?: string;
  friends: friends[];
  posts: postType[];
};

export type friends = {
  id?: number;
  userFriend: User[];
  friendId: number;
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
  posts: postType[];
  user: User[];
};
