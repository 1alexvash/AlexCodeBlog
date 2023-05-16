import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/system";
import config from "config";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setAdmin } from "redux/slices/admin";
import { useAppSelector } from "redux/typesHooks";

const fadeIn = keyframes({
  "0%": {
    opacity: 0,
  },
  "100%": {
    opacity: 1,
  },
});

const fadeOut = keyframes({
  "0%": {
    opacity: 1,
  },
  "100%": {
    opacity: 0,
  },
});

const animate = (animationName: string) => ({
  animationName: `${animationName}`,
  animationDuration: "500ms",
  animationFillMode: "forwards",
});

const Intro = () => {
  const dispatch = useDispatch();
  const admin = useAppSelector((state) => state.admin);

  const [isFirstRender, setIsFirstRender] = useState(true);

  const imageAvatarRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (admin) {
      dispatch(setAdmin(false));
    } else {
      dispatch(setAdmin(true));
    }
  };

  useEffect(() => {
    const imageWrapper = imageAvatarRef.current;

    if (admin) {
      imageWrapper?.setAttribute("admin", "");
      setIsFirstRender(false);
    }

    if (!admin && !isFirstRender) {
      imageWrapper?.setAttribute("closing", "");
      imageWrapper?.addEventListener(
        "animationend",
        () => {
          imageWrapper?.removeAttribute("closing");
        },
        { once: true }
      );
      imageWrapper?.removeAttribute("admin");
    }
  }, [admin, isFirstRender]);

  return (
    <Box
      sx={(theme) => ({
        py: 8.75,
        background: theme.palette.mode === "light" ? "#f8fafc" : "#070809",
        color: theme.palette.mode === "light" ? "#707070" : "#f2f5f7",
      })}
    >
      <Box className="container">
        {/* check, do we need to rewrite this className? */}
        <Box
          sx={(theme) => ({
            display: ["-ms-flexbox", "flex"],
            msFlexAlign: "center",
            alignItems: "center",
            [theme.breakpoints.down(768)]: {
              textAlign: "center",
              display: "block",
            },
          })}
        >
          <Box
            sx={(theme) => ({
              position: "relative",
              msFlexNegative: 0,
              flexShrink: 0,
              marginLeft: "auto",
              textAlign: "center",
              maxWidth: "136px",
              msFlexOrder: 2,
              order: 2,
              [theme.breakpoints.down(768)]: {
                width: "100%",
                maxWidth: "100%",
                marginBottom: "20px",
              },
            })}
          >
            <Box
              ref={imageAvatarRef}
              sx={{
                position: "relative",
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                overflow: "hidden",
                margin: "0 auto 16px",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  borderRadius: "50%",
                  width: "90px",
                  height: "90px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  border: "3px solid #fe6c0a",
                  zIndex: 1,
                  pointerEvents: "none",
                  opacity: 0,
                },
                "&[admin]:after": animate(fadeIn),
                "&[closing]:after": animate(fadeOut),
                "& img": {
                  display: "block",
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                },
              }}
            >
              <img
                onDoubleClick={handleClick}
                src="/images/author-avatar.jpg"
                alt="author-avatar"
                width="90"
                height="90"
              />
            </Box>
            <Box
              sx={(theme) => ({
                color: theme.palette.mode === "light" ? "#3a3a3a" : "white",
                fontSize: "16px",
                fontWeight: 700,
                textTransform: "uppercase",
                marginBottom: "4px",
              })}
            >
              {config.author_name}
            </Box>
            <Box
              sx={{
                lineHeight: 1.5,
                fontSize: 14,
              }}
            >
              {config.author_position}
            </Box>
          </Box>
          <Box
            sx={(theme) => ({
              pr: 17.5,
              [theme.breakpoints.down(1260)]: {
                pr: 10,
              },
              [theme.breakpoints.down(1020)]: {
                pr: 8.75,
              },
              [theme.breakpoints.down(768)]: {
                pr: 0,
              },
            })}
          >
            <Typography
              sx={(theme) => ({
                color: theme.palette.mode === "light" ? "#3a3a3a" : "white",
                lineHeight: 1.28,
                fontWeight: "bold",
                fontSize: "50px",
                marginBottom: "17px",
                letterSpacing: 0,
                [theme.breakpoints.down(1020)]: {
                  fontSize: "40px",
                },
                [theme.breakpoints.down(481)]: {
                  fontSize: "30px",
                  mb: 3.25,
                },
              })}
            >
              Hello, I am {config.author_name}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                whiteSpace: "break-spaces",
                lineHeight: "1.69",
                letterSpacing: 0,
              }}
            >
              {config.site_description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Intro;
