import { Button, Input } from 'antd';
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { AudioOutlined } from '@ant-design/icons';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import classNames from 'classnames';

import cls from './style.module.scss';

import onMp3 from '@/app/assets/on.mp3';

interface SpeechSearchListProps {
  children: ReactNode;
  onSearch: (value: string) => void;
  defaultValue: string;
}

const defaultNumberActiveMicro = 2500;

export const SpeechSearchList = ({
  children,
  onSearch,
  defaultValue,
}: SpeechSearchListProps) => {
  const [search, setSearch] = useState(defaultValue);
  const soundRef = useRef(new Audio(onMp3));
  const timerRef = useRef(null);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const startListening = () => {
    resetTranscript();
    setSearch('');
    SpeechRecognition.startListening({ continuous: true });
    soundRef.current.play();
    soundRef.current.volume = 0.1;
    timerRef.current = setTimeout(stopListening, defaultNumberActiveMicro);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    soundRef.current.pause();
    soundRef.current.currentTime = 0;
  };

  const handleMicClick = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!listening) {
      setSearch(e.target.value);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    onSearch(value);
    stopListening();
  };

  useEffect(() => {
    if (transcript && timerRef.current) {
      setSearch(transcript);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(stopListening, defaultNumberActiveMicro);
    }
  }, [transcript]);

  useEffect(() => {
    setSearch(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    return () => {
      stopListening();
      if (soundRef.current) {
        soundRef.current = null;
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <>
      <Input.Search
        placeholder="Поиск..."
        size="large"
        value={search}
        onChange={handleInputChange}
        enterButton="Поиск"
        onSearch={handleSearch}
        suffix={
          <Button type="text" className={cls.btnAudio} onClick={handleMicClick}>
            <AudioOutlined
              className={classNames(cls.audio, { [cls.activeMic]: listening })}
            />
          </Button>
        }
      />
      {children}
    </>
  );
};
