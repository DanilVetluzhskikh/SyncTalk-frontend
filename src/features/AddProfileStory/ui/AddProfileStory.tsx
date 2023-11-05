import { Button, Input } from 'antd';

import cls from './style.module.scss';

const { TextArea } = Input;

export const AddProfileStory = () => {
  return (
    <div className={cls.profileStoryBlock}>
      <div className={cls.form}>
        <TextArea
          placeholder="Что нового?"
          className={cls.textArea}
          autoSize={{ minRows: 2, maxRows: 4 }}
        />
        <Button className={cls.create} type="primary" size="large">
          Создать
        </Button>
      </div>
    </div>
  );
};
