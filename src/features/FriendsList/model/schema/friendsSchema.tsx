import { Friend } from '@/shared/types/shared';

export type FriendsSchema = {
  friends: Friend[];
  isLoading: boolean;
  error: string;
};
