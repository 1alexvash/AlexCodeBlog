import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import ProjectInfo from "./ProjectInfo";

const PortfolioPage = () => {
  const [activeProject, setActiveProject] = useState("AiScout");
  const AiScoutRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const GafferRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const WoodlandRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const GoVirtualRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const theme = useTheme();

  const observer = useRef<IntersectionObserver | null>(null);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveProject(entry.target.id);
      }
    });
  };

  const scrollToRef = (ref: React.MutableRefObject<HTMLDivElement>) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.8,
    });

    observer.current.observe(AiScoutRef.current);
    observer.current.observe(GafferRef.current);
    observer.current.observe(WoodlandRef.current);
    observer.current.observe(GoVirtualRef.current);

    return () => {
      observer.current?.disconnect();
    };
  }, [activeProject]);

  return (
    <Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-between" }}
        maxHeight={110}
      >
        <Typography
          sx={(theme) => ({
            color: theme.palette.mode === "light" ? "#3a3a3a" : "white",
            lineHeight: 1.28,
            fontWeight: 700,
            fontSize: "43px",
            ["@media (max-width: 480px)"]: {
              fontSize: "28px",
            },
            mt: 2.5,
            mb: 9.5,
          })}
        >
          My projects
        </Typography>
      </Box>
      <Box sx={{ display: "flex", columnGap: "30px" }}>
        <Box
          sx={{
            flex: "1 0 auto",
            maxWidth: "863px",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "27px",
            ["@media (max-width: 1259px)"]: {
              maxWidth: "700px",
            },
            ["@media (max-width: 767px)"]: {
              maxWidth: "100%",
            },
            "& > div": {
              "&:not(:first-child)": {
                mt: 9,
              },
            },
          }}
        >
          <Box ref={AiScoutRef} id="AiScout">
            <ProjectInfo
              nameOfProject="AiScout"
              pathToImageLogo={
                theme.palette.mode === "light"
                  ? "/images/aiscout-dark-logo.svg"
                  : "/images/aiscout-logo.svg"
              }
            />
          </Box>
          <Box ref={GafferRef} id="Gaffer">
            <ProjectInfo
              nameOfProject="Gaffer"
              pathToImageLogo="/images/gaffer-logo.svg"
            />
          </Box>
          <Box ref={WoodlandRef} id="Woodland">
            <ProjectInfo
              nameOfProject="Woodland (NDA)"
              pathToImageLogo={
                theme.palette.mode === "light"
                  ? "/images/woodland-dark-logo.svg"
                  : "/images/woodland-logo.svg"
              }
            />
          </Box>
          <Box ref={GoVirtualRef} id="GoVirtual">
            <ProjectInfo
              nameOfProject="GoVirtual (NDA)"
              pathToImageLogo="/images/goVirtual-logo.svg"
            />
          </Box>
        </Box>

        <Box
          sx={(theme) => ({
            position: "sticky",
            top: "50px",
            height: "100%",
            mt: -12,
            "& > div": {
              width: "277px",
              height: "73px",
              background: theme.palette.mode === "light" ? "white" : "#33393F",
              display: "flex",
              alignItems: "center",
              pl: 6.25,
              borderBottom: "1px solid",
              borderColor:
                theme.palette.mode === "light" ? "#ececec" : "#4B4B4B",
              cursor: "pointer",
              "& .MuiTypography-root": {
                ml: 2.5,
                fontWeight: "700",
                fontSize: "18px",
                lineHeight: "129.4%",
                transition: "background-color 0.5s ease",
              },
            },
            "& .active-project": {
              backgroundColor:
                theme.palette.mode === "light" ? "#3a3a3a" : "#fe6C0a",
              "& .MuiTypography-root": {
                color: "white",
              },
            },
            ["@media (max-width: 1019px)"]: {
              display: "none",
            },
          })}
        >
          <div
            onClick={() => scrollToRef(AiScoutRef)}
            className={activeProject === "AiScout" ? "active-project" : ""}
          >
            <img
              src={
                theme.palette.mode === "dark" || activeProject === "AiScout"
                  ? "/images/aiscout-logo.svg"
                  : "/images/aiscout-dark-logo.svg"
              }
              alt="AiScout"
              height={33}
              width={36}
            />
            <Typography>AiSCOUT</Typography>
          </div>

          <div
            onClick={() => scrollToRef(GafferRef)}
            className={activeProject === "Gaffer" ? "active-project" : ""}
          >
            <img
              src="/images/gaffer-logo.svg"
              alt="Gaffer"
              height={33}
              width={36}
            />
            <Typography>Gaffer</Typography>
          </div>

          <div
            onClick={() => scrollToRef(WoodlandRef)}
            className={activeProject === "Woodland" ? "active-project" : ""}
          >
            <img
              src={
                theme.palette.mode === "dark" || activeProject === "Woodland"
                  ? "/images/woodland-logo.svg"
                  : "/images/woodland-dark-logo.svg"
              }
              alt="Woodland"
              height={33}
              width={36}
            />
            <Typography>Woodland (NDA)</Typography>
          </div>
          <div
            onClick={() => scrollToRef(GoVirtualRef)}
            className={activeProject === "GoVirtual" ? "active-project" : ""}
          >
            <img
              src="/images/goVirtual-logo.svg"
              alt="GoVirtual"
              height={33}
              width={36}
            />
            <Typography>GoVirtual (NDA)</Typography>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default PortfolioPage;
