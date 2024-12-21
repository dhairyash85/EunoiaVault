import { useState, useEffect, useRef } from 'react';


const useMeditationTimer = (initialDuration: number, initialSound: string) => {
  const [duration, setDuration] = useState(initialDuration);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [selectedSound, setSelectedSound] = useState(initialSound);
  const [hasStarted, setHasStarted] = useState(false); 
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isActive && !hasStarted) {
      setHasStarted(true);  
      setTimeLeft(duration * 60);
    }
  }, [isActive, hasStarted, duration]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive((prev) => !prev);
    if (!isActive && audioRef.current) {
      audioRef.current.play();
    } else if (isActive && audioRef.current) {
      audioRef.current.pause();
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(duration * 60);
    setHasStarted(false); 
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    duration,
    setDuration,
    isActive,
    timeLeft,
    selectedSound,
    setSelectedSound,
    audioRef,
    toggleTimer,
    resetTimer,
    formatTime,
  };
};

export default useMeditationTimer;
