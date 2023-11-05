export type ImgBlockType = {
  title: string;
  paragraph: string;
  img: string;
};

export type StatusType =
  | 'error'
  | 'default'
  | 'success'
  | 'processing'
  | 'warning';

export type StatusItem = {
  title: string;
  enum: StatusType;
  color: string;
};

export type OtherUserType = {
  username: string;
  isFriend: boolean;
  avatarURL: string;
  id: number;
  requestFriend: boolean;
};
