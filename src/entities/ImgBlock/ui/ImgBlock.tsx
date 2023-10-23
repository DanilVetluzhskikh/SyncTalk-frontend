import { Typography } from 'antd';
import classNames from 'classnames';

import cls from './style.module.scss';

const { Title, Paragraph } = Typography;

interface ImgBlockProps {
  img: string;
  title: string;
  paragraph: string;
  isReverse: boolean;
}

export const ImgBlock = (props: ImgBlockProps) => {
  const { img, title, paragraph, isReverse } = props;

  return (
    <div className={classNames(cls.block, { [cls.reverse]: isReverse })}>
      <img src={img} className={cls.img} />
      <div className={cls.titleContainer}>
        <Title className={cls.title}>{title}</Title>
        <Paragraph className={cls.paragraph}>{paragraph}</Paragraph>
      </div>
    </div>
  );
};
