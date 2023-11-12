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
  isSentRequest: boolean;
};

export enum UserSubscribeAction {
  REQUEST_FRIEND = 'REQUEST_FRIEND',
  ACCEPT_FRIEND = 'ACCEPT_FRIEND',
  DECLINE_FRIEND = 'DECLINE_FRIEND',
  DECLINE_MY_FRIEND_REQUEST = 'DECLINE_MY_FRIEND_REQUEST',
  DELETE_FRIEND = 'DELETE_FRIEND',
}
