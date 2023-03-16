import { Box, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const testAudioSample =
  "https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/af52a99b-88c0-4638-b120-d46e142d06d3/audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeVolume, setActiveVolume] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [volume, setVolume] = useState(100);
  const [isMobile, setIsMobile] = useState(false);

  const audioPlayer = useRef<HTMLAudioElement>(null);
  const progressBar = useRef<HTMLInputElement>(null);
  const volumeBar = useRef<HTMLInputElement>(null);

  const animationRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const onLoadedMetadata = () => {
    if (audioPlayer.current) {
      setDuration(audioPlayer.current.duration);
    }
  };

  useEffect(() => {
    const volumeBarElement = volumeBar.current?.parentElement;

    if (activeVolume) {
      volumeBarElement?.setAttribute("open", "");
      setIsFirstRender(false);
    }

    if (!activeVolume && !isFirstRender) {
      volumeBarElement?.setAttribute("closing", "");
      volumeBarElement?.addEventListener(
        "animationend",
        () => {
          volumeBarElement?.removeAttribute("closing");
        },
        { once: true }
      );
      volumeBarElement?.removeAttribute("open");
    }
  }, [activeVolume, isFirstRender]);

  const calculateTime = (time: number) => {
    if (isNaN(time)) return "00:00";

    const minutes = Math.floor(time / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(time % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
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

  const changeRangeOfVolumeBar = () => {
    audioPlayer.current!.volume = Number(volumeBar.current?.value) / 100;
    changePlayerVolume();
  };

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
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));

    if (audioPlayer.current?.duration) {
      const seconds = Math.ceil(audioPlayer.current.duration);

      setDuration(seconds);
      progressBar.current!.max = String(seconds);
    }

    audioPlayer.current?.addEventListener("ended", () => {
      setIsPlaying(false);
      cancelAnimationFrame(animationRef.current);
    });
  }, [audioPlayer, duration]);

  return (
    <Box
      sx={(theme) => ({
        position: "relative",
        width: "100%",
        height: "53px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 10px",
        backgroundColor: theme.palette.mode === "light" ? "#f2f5f7" : "#33393f",
        borderRadius: "4px",
        marginBottom: "18px",
        "& button": {
          border: "none",
          cursor: "pointer",
          p: 0,
        },
      })}
    >
      <audio
        ref={audioPlayer}
        src={testAudioSample}
        preload="metadata"
        onLoadedMetadata={onLoadedMetadata}
        muted={!volume}
      />
      <IconButton
        sx={{
          position: "relative",
          width: "33px",
          height: "33px",
          backgroundColor: "white",
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.12)",
          borderRadius: "50%",
          "& img": {
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          },
          "&:hover": {
            backgroundColor: "white",
          },
        }}
        onClick={togglePlayPause}
      >
        {isPlaying ? (
          <img
            style={{
              filter:
                "invert(20%) sepia(0%) saturate(87%) hue-rotate(231deg) brightness(95%) contrast(89%)",
              objectFit: "cover",
            }}
            src="/images/pause-icon.svg"
            alt="play"
            width={15}
            height={14}
          />
        ) : (
          <img src="/images/play-icon.svg" alt="play" width={16} height={16} />
        )}
      </IconButton>
      <Box
        sx={{
          margin: "5px 17px 0px 7px",
          width: "100%",
        }}
      >
        <Box
          sx={(theme) => ({
            "& input": {
              "--seek-before-width": 0,
              appearance: "none",
              backgroundColor:
                theme.palette.mode === "light" ? "white" : "#18191d",
              borderRadius: "4px",
              position: "relative",
              width: "100%",
              height: "4px",
              outline: "none",
              cursor: "pointer",
              "&::before": {
                content: '""',
                height: "4px",
                width: "var(--seek-before-width)",
                backgroundColor: "#fe6c0a",
                borderRadius: "4px",
                position: "absolute",
                zIndex: 2,
              },
              "&::-webkit-slider-thumb": {
                opacity: 0,
              },
            },
          })}
        >
          <input
            type="range"
            defaultValue="0"
            ref={progressBar}
            onChange={changeRangeOfProgressBar}
          />
        </Box>

        <Box
          sx={(theme) => ({
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2px",
            marginLeft: "2px",
            color: theme.palette.mode === "light" ? "#797979" : "#9f9f9f",
            fontSize: "14px",
          })}
        >
          <Box>{calculateTime(currentTime)}</Box>
          <Box>{calculateTime(duration)}</Box>
        </Box>
      </Box>
      <IconButton
        sx={{
          width: "20px",
          borderColor: "transparent",
          mr: 0.5,
          "&:hover": {
            background: "none",
          },
          ...(activeVolume && {
            filter:
              "invert(47%) sepia(66%) saturate(2546%) hue-rotate(356deg) brightness(101%) contrast(99%)",
          }),
        }}
        disableRipple
        onMouseEnter={() => {
          if (!isMobile) {
            setActiveVolume(true);
          }
        }}
        onMouseLeave={() => {
          if (!isMobile) {
            timeoutRef.current = setTimeout(() => {
              setActiveVolume(false);
            }, 500);
          }
        }}
        onClick={() => {
          if (isMobile) {
            setActiveVolume(!activeVolume);
          }
        }}
      >
        {Boolean(volume) ? (
          <img
            src="/images/volume-icon.svg"
            alt="play"
            width={22}
            height={16}
          />
        ) : (
          <img
            src="/images/mute-volume-icon.svg"
            alt="play"
            width={22}
            height={16}
          />
        )}
      </IconButton>
      <Box
        component="span"
        sx={(theme) => ({
          opacity: 0,
          pointerEvents: "none",
          position: "absolute",
          display: "flex",
          width: "157px",
          height: "38px",
          padding: "13px",
          transform: "rotate(-90deg)",
          bottom: "120px",
          right: "-60px",
          backgroundColor:
            theme.palette.mode === "light" ? "#f2f5f7" : "#33393f",
          borderRadius: "4px",
          justifyContent: "center",
          alignItems: "center",
          transition: "opacity 500ms ease-in-out",
          "&[closing]": {
            opacity: 0,
          },
          "&[open]": {
            opacity: 1,
            pointerEvents: "auto",
          },
          "& input": {
            height: "4px",
            width: "100%",
            "--seek-before-width": "100%",
            backgroundColor:
              theme.palette.mode === "light" ? "white" : "#18191d",
            appearance: "none",
            borderRadius: "4px",
            position: "relative",
            outline: "none",
            cursor: "pointer",
            "&::before": {
              content: '""',
              height: "4px",
              width: "var(--seek-before-width)",
              backgroundColor:
                theme.palette.mode === "light" ? "black" : "#f2f5f7",
              borderRadius: "4px",
              position: "absolute",
              zIndex: 2,
            },
            "&::-webkit-slider-thumb": {
              opacity: 0,
            },
          },
        })}
        onMouseEnter={() => {
          if (!isMobile) clearTimeout(timeoutRef.current);
        }}
        onMouseLeave={() => {
          if (!isMobile) setActiveVolume(false);
        }}
      >
        <input type="range" ref={volumeBar} onChange={changeRangeOfVolumeBar} />
      </Box>
    </Box>
  );
};

export default AudioPlayer;
