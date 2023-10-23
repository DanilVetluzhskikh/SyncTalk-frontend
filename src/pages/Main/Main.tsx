import { Typography } from 'antd';

import cls from './style.module.scss';

import bg from '@/app/assets/background-main.jpg';
import { Navbar } from '@/widgets/Navbar';
import { ImgBlock } from '@/entities/ImgBlock';
import { mainPageBlocks } from '@/shared/mocks/arrays';

const { Title, Paragraph } = Typography;

const Main = () => {
  return (
    <div className={cls.main}>
      <div className={cls.wrapper}>
        <Navbar />
        <div className={cls.blockTitle}>
          <div className={cls.absolute}>
            <Title className={cls.title}>ПРЕДСТАВЬТЕ СЕБЕ…</Title>
            <Paragraph className={cls.paragraph}>
              …место, где будет комфортно себя чувствовать любая компания:
              школьный кружок, игровая группа или международное сообщество
              художников. Место, где можно вдоволь поболтать с друзьями.
              Ежедневное общение ещё никогда не было настолько простым.
            </Paragraph>
          </div>
        </div>
        <img src={bg} className={cls.bg} />
        <div className={cls.blocks}>
          {mainPageBlocks.map((el, index) => (
            <ImgBlock
              {...el}
              isReverse={index % 2 === 0}
              key={`${el.title}__${el.paragraph}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
