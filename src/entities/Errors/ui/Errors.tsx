import { Typography } from 'antd';

import cls from './style.module.scss';

const { Text } = Typography;

interface ErrorsProps {
  errors: string[];
}

export const Errors = (props: ErrorsProps) => {
  if (!props.errors.length) {
    return null;
  }

  return (
    <div className={cls.content} data-testid="errors-container">
      {props.errors
        .filter(err => Boolean(err?.trim()))
        .map((item, index) => (
          <Text type="danger" key={`${item}__${index}`}>
            {item}
          </Text>
        ))}
    </div>
  );
};
