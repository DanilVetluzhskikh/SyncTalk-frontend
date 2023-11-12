import { Button } from 'antd';

import cls from '../style.module.scss';
import {
  actionsFriend,
  getButtonConfig,
  selectButtonProps,
} from '../../utils/actions';

import { useAppDispatch } from '@/app/hooks/redux';
import { UserSubscribeAction } from '@/shared/types/shared';

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

  const handleAction = (type: UserSubscribeAction) => {
    const action = actionsFriend[type];

    if (action) {
      dispatch(action({ friendId: id }));
    }
  };

  const config = getButtonConfig(handleAction);
  const { primary, secondary } = selectButtonProps(config, {
    isFriend,
    requestFriend,
    isSentRequest,
  });

  return (
    <div className={cls.actions}>
      <Button
        onClick={primary.action}
        loading={isLoading}
        className={cls.actionBtn}
        type="primary"
      >
        {primary.text}
      </Button>
      {secondary && (
        <Button
          onClick={secondary.action}
          loading={isLoading}
          className={cls.actionBtn}
          type="primary"
        >
          {secondary.text}
        </Button>
      )}
    </div>
  );
};
