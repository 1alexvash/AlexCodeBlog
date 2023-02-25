import { useCallback, useEffect, useRef, useState } from "react";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeVolume, setActiveVolume] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [volume, setVolume] = useState(100);

  const audioPlayer = useRef<HTMLAudioElement>(null);
  const progressBar = useRef<HTMLInputElement>(null);
  const volumeBar = useRef<HTMLInputElement>(null);

  const pageInitialized = useRef(false);

  const animationRef = useRef(0);

  const onLoadedMetadata = () => {
    if (audioPlayer.current) {
      setDuration(audioPlayer.current.duration);
    }
  };

  useEffect(() => {
    const volumeBarElem = document.querySelector("span.volume-bar");

    if (activeVolume) {
      volumeBarElem?.setAttribute("open", "");
      setIsFirstRender(false);
    }
    if (!activeVolume && isFirstRender === false) {
      volumeBarElem?.setAttribute("closing", "");
      volumeBarElem?.addEventListener(
        "animationend",
        () => {
          volumeBarElem?.removeAttribute("closing");
        },
        { once: true }
      );
      volumeBarElem?.removeAttribute("open");
    }
  }, [activeVolume, isFirstRender]);

  const calculateTime = (time: number) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

      return `${returnedMinutes}:${returnedSeconds}`;
    }

    return "00:00";
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
    if (audioPlayer.current) {
      progressBar.current!.value = String(audioPlayer.current.currentTime);
      changePlayerCurrentTime();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };

  const changeRangeOfProgressBar = () => {
    audioPlayer.current!.currentTime = Number(progressBar.current?.value);
    changePlayerCurrentTime();
  };

  const changeRangeOfVolumeBar = useCallback(() => {
    audioPlayer.current!.volume = Number(volumeBar.current?.value) / 100;
    changePlayerVolume();
  }, []);

  const changePlayerVolume = () => {
    volumeBar.current?.style.setProperty(
      "--seek-before-width",
      `${Number(volumeBar.current.value)}%`
    );
    setVolume(Number(volumeBar.current?.value));
  };

  const changePlayerCurrentTime = () => {
    progressBar.current?.style.setProperty(
      "--seek-before-width",
      `${(Number(progressBar.current.value) / duration) * 100}%`
    );
    setCurrentTime(Number(progressBar.current!.value));
  };

  useEffect(() => {
    if (pageInitialized.current === false) {
      volumeBar.current!.value = "100";
      changeRangeOfVolumeBar();
    }

    if (audioPlayer.current?.duration) {
      const seconds = Math.floor(audioPlayer.current.duration);

      setDuration(seconds);
      progressBar.current!.max = String(seconds);
    }

    if (
      Math.ceil(audioPlayer.current!.currentTime) ===
      Number(progressBar.current!.max)
    ) {
      setIsPlaying(false);
    }
    pageInitialized.current = true;
  }, [
    audioPlayer?.current?.onloadedmetadata,
    audioPlayer.current?.readyState,
    audioPlayer.current?.currentTime,
    changeRangeOfVolumeBar,
  ]);

  return (
    <div className="audio">
      <audio
        ref={audioPlayer}
        src="https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/af52a99b-88c0-4638-b120-d46e142d06d3/audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3"
        preload="metadata"
        onLoadedMetadata={onLoadedMetadata}
      ></audio>
      <button onClick={togglePlayPause} className="play">
        {isPlaying ? (
          <img
            className="pause-icon"
            src="/images/pause-icon.svg"
            alt="play"
            width={15}
            height={14}
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
            defaultValue="0"
            ref={progressBar}
            onChange={changeRangeOfProgressBar}
          />
        </div>

        <div className="current-time">
          <div>{calculateTime(currentTime)}</div>
          <div>{calculateTime(duration)}</div>
        </div>
      </div>
      <button className="volume">
        {Boolean(volume) ? (
          <img
            className="volume-icon"
            src="/images/volume-icon.svg"
            alt="play"
            width={22}
            height={16}
            onClick={() => setActiveVolume(!activeVolume)}
            style={
              activeVolume
                ? {
                    filter:
                      "invert(47%) sepia(66%) saturate(2546%) hue-rotate(356deg) brightness(101%) contrast(99%)",
                  }
                : {}
            }
          />
        ) : (
          <img
            className="volume-icon"
            src="/images/mute-volume-icon.svg"
            alt="play"
            width={22}
            height={16}
            onClick={() => setActiveVolume(!activeVolume)}
            style={
              activeVolume
                ? {
                    filter:
                      "invert(47%) sepia(66%) saturate(2546%) hue-rotate(356deg) brightness(101%) contrast(99%)",
                  }
                : {}
            }
          />
        )}
      </button>
      <span className="volume-bar">
        <input
          type="range"
          defaultValue="100"
          ref={volumeBar}
          onChange={changeRangeOfVolumeBar}
        />
      </span>
    </div>
  );
};

export default AudioPlayer;
