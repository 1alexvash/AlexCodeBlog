import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "redux/typesHooks";

const AudioPlayer = () => {
  const theme = useAppSelector((state) => state.theme);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioPlayer = useRef<HTMLAudioElement>(null);
  const progressBar = useRef<HTMLInputElement>(null);
  const animationRef = useRef(0);

  useEffect(() => {
    // bug - returns NaN when data is available https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/duration
    const seconds = Math.floor(audioPlayer.current!.duration);

    setDuration(seconds);
    progressBar.current!.max = String(seconds);
  }, [audioPlayer.current?.readyState]);

  const calculateTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;

    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current?.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current?.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    progressBar.current!.value = String(audioPlayer.current?.currentTime);
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current!.currentTime = Number(progressBar.current?.value);
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current?.style.setProperty(
      "--seek-before-width",
      `${(Number(progressBar.current.value) / duration) * 100}%`
    );
    setCurrentTime(Number(progressBar.current!.value));
  };

  return (
    <div className="audio">
      <audio
        ref={audioPlayer}
        src="https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/af52a99b-88c0-4638-b120-d46e142d06d3/audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3"
        preload="metadata"
      ></audio>
      <button onClick={togglePlayPause} className="play">
        {isPlaying ? (
          <img
            className="play-icon"
            src="/images/play-icon.svg"
            alt="play"
            width={16}
            height={15}
          />
        ) : (
          <img
            className="play-icon"
            src="/images/play-icon.svg"
            alt="play"
            width={16}
            height={15}
          />
        )}
      </button>
      <div className="progress-bar">
        <div>
          <input
            type="range"
            className=""
            defaultValue="0"
            ref={progressBar}
            onChange={changeRange}
          />
        </div>

        <div className="current-time">
          <div className="">{calculateTime(currentTime)}</div>

          <div className="">
            {duration && !isNaN(duration) && calculateTime(duration)}
          </div>
        </div>
      </div>
      <button className="volume">
        {theme === "light" ? (
          <img
            className="play-icon"
            src="/images/volume-icon-light.svg"
            alt="play"
            width={22}
            height={16}
          />
        ) : (
          <img
            className="play-icon"
            src="/images/volume-icon-dark.svg"
            alt="play"
            width={22}
            height={16}
          />
        )}
      </button>
    </div>
  );
};

export { AudioPlayer };
