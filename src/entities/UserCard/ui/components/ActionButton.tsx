import { Button } from 'antd';

import {
  requestFriendService,
  acceptFriendService,
  declineFriendService,
  declineMyRequestService,
  deleteFriendService,
} from '../../model/services';
import cls from '../style.module.scss';

import { useAppDispatch } from '@/app/hooks/redux';

interface ActionButtonProps {
  id: number;
  isFriend: boolean;
  requestFriend: boolean;
  isSentRequest: boolean;
  isLoading: boolean;
}

export const ActionButton = (props: ActionButtonProps) => {
  const { id, isFriend, requestFriend, isSentRequest, isLoading } = props;

  const dispatch = useAppDispatch();

  const handleRequestFriend = () =>
    dispatch(requestFriendService({ friendId: id }));
  const handleAcceptFriend = () =>
    dispatch(acceptFriendService({ friendId: id }));
  const handleDeclineFriend = () =>
    dispatch(declineFriendService({ friendId: id }));
  const handleDeclineMyRequest = () =>
    dispatch(declineMyRequestService({ friendId: id }));
  const handleDeleteFriend = () =>
    dispatch(deleteFriendService({ friendId: id }));

  const renderActionButton = () => {
    if (isFriend) {
      return (
        <Button
          onClick={handleDeleteFriend}
          loading={isLoading}
          className={cls.actionBtn}
          type="primary"
        >
          Удалить из друзей
        </Button>
      );
    } else if (requestFriend) {
      return (
        <Button
          onClick={handleDeclineMyRequest}
          loading={isLoading}
          className={cls.actionBtn}
          type="primary"
        >
          Отозвать заявку
        </Button>
      );
    } else if (isSentRequest) {
      return (
        <div className={cls.actions}>
          <Button
            onClick={handleAcceptFriend}
            loading={isLoading}
            className={cls.actionBtn}
            type="primary"
          >
            Принять заявку
          </Button>
          <Button
            onClick={handleDeclineFriend}
            loading={isLoading}
            className={cls.actionBtn}
            type="primary"
          >
            Отклонить заявку
          </Button>
        </div>
      );
    } else {
      return (
        <Button
          onClick={handleRequestFriend}
          loading={isLoading}
          className={cls.actionBtn}
          type="primary"
        >
          Отправить заявку в друзья
        </Button>
      );
    }
  };

  return renderActionButton();
};
