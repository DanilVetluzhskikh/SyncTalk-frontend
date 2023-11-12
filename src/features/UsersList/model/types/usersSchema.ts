import { OtherUserType, UserSubscribeAction } from '@/shared/types/shared';

export type UsersSchema = {
  users: OtherUserType[];
  isLoading: boolean;
  error: string;
  totalPages: number;
};

export interface ReturnDataUsers {
  users: UsersSchema['users'];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export type UserAction = {
  userId: number;
  type: UserSubscribeAction;
};
