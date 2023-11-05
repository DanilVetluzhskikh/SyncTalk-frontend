import { OtherUserType } from '@/shared/types/shared';

export type UsersSchema = {
  users: OtherUserType[];
  isLoading: boolean;
  error: string;
};
