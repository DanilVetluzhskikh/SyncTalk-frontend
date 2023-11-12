import { AsyncThunk, EmptyObject } from '@reduxjs/toolkit';

import {
  acceptFriendService,
  declineFriendService,
  declineMyRequestService,
  deleteFriendService,
  requestFriendService,
} from '../model/services';
import { GetDataAction } from '../model/schema/userCardSchema';

import { UserSubscribeAction } from '@/shared/types/shared';
import { ThunkConfig } from '@/shared/types/redux';

export const actionsFriend: Record<
  UserSubscribeAction,
  AsyncThunk<EmptyObject, GetDataAction, ThunkConfig<string>>
> = {
  [UserSubscribeAction.ACCEPT_FRIEND]: acceptFriendService,
  [UserSubscribeAction.DECLINE_FRIEND]: declineFriendService,
  [UserSubscribeAction.DECLINE_MY_FRIEND_REQUEST]: declineMyRequestService,
  [UserSubscribeAction.DELETE_FRIEND]: deleteFriendService,
  [UserSubscribeAction.REQUEST_FRIEND]: requestFriendService,
};

export const getButtonConfig = (
  handleAction: (type: UserSubscribeAction) => void,
) => ({
  isFriend: {
    action: () => handleAction(UserSubscribeAction.DELETE_FRIEND),
    text: 'Удалить из друзей',
  },
  requestFriend: {
    action: () => handleAction(UserSubscribeAction.DECLINE_MY_FRIEND_REQUEST),
    text: 'Отозвать заявку',
  },
  isSentRequest: {
    primary: {
      action: () => handleAction(UserSubscribeAction.ACCEPT_FRIEND),
      text: 'Принять заявку',
    },
    secondary: {
      action: () => handleAction(UserSubscribeAction.DECLINE_FRIEND),
      text: 'Отклонить заявку',
    },
  },
  default: {
    action: () => handleAction(UserSubscribeAction.REQUEST_FRIEND),
    text: 'Отправить заявку в друзья',
  },
});

export const selectButtonProps = (
  config: ReturnType<typeof getButtonConfig>,
  {
    isFriend,
    requestFriend,
    isSentRequest,
  }: { isFriend: boolean; requestFriend: boolean; isSentRequest: boolean },
) => {
  if (isFriend) {
    return { primary: config.isFriend, secondary: null };
  } else if (requestFriend) {
    return { primary: config.requestFriend, secondary: null };
  } else if (isSentRequest) {
    return {
      primary: config.isSentRequest.primary,
      secondary: config.isSentRequest.secondary,
    };
  } else {
    return { primary: config.default, secondary: null };
  }
};
