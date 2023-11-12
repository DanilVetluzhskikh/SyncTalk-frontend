import {
  createAsyncThunk,
  ActionCreatorWithOptionalPayload,
} from '@reduxjs/toolkit';

import { UserAction } from '../types/usersSchema';
import {
  acceptFriend,
  declineFriend,
  requestFriendToMe,
} from '../slice/usersSlice';

import { ThunkConfig } from '@/shared/types/redux';
import { UserSubscribeAction } from '@/shared/types/shared';

const actionMap: Record<
  UserSubscribeAction,
  ActionCreatorWithOptionalPayload<number>
> = {
  [UserSubscribeAction.REQUEST_FRIEND]: requestFriendToMe,
  [UserSubscribeAction.ACCEPT_FRIEND]: acceptFriend,
  [UserSubscribeAction.DECLINE_FRIEND]: declineFriend,
  [UserSubscribeAction.DECLINE_MY_FRIEND_REQUEST]: declineFriend,
  [UserSubscribeAction.DELETE_FRIEND]: declineFriend,
};

export const friendActionsService = createAsyncThunk<
  undefined,
  undefined,
  ThunkConfig<string>
>('user/subscribe', async (_, thunkApi) => {
  const { rejectWithValue, extra, dispatch } = thunkApi;

  try {
    const response = await extra.api.get<UserAction>('user/subscribe');
    const action = actionMap[response.data.type];

    if (action) {
      dispatch(action(response.data.userId));
    }
  } catch (e) {
    return rejectWithValue(
      e?.message ?? 'Ошибка при подписке на действия пользователя',
    );
  } finally {
    dispatch(friendActionsService());
  }
});
