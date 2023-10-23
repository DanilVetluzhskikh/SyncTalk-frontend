import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';

import cls from './style.module.scss';

const { Title } = Typography;

export const NotFound = () => {
  const handleReloadPage = () => {
    window.location.reload();
  };

  return (
    <div className={cls.notFound}>
      <Title className={cls.title} level={2}>
        Страница не найдена
      </Title>
      <div className={cls.btns}>
        <Button size="large" ghost>
          <Link to="/">На главную</Link>
        </Button>
        <Button ghost size="large" onClick={handleReloadPage}>
          Обновить страницу
        </Button>
      </div>
    </div>
  );
};
