import { Box, Typography } from "@mui/material";
import React from "react";

interface ProjectInfoProps {
  nameOfProject: string;
  pathToImageLogo: string;
}

const ProjectInfo = ({ nameOfProject, pathToImageLogo }: ProjectInfoProps) => (
  <Box>
    <Box
      sx={{
        position: "relative",
        pl: 6,
        display: "flex",
        alignItems: "center",
        mb: 3.75,
        ["@media (max-width: 767px)"]: {
          pl: 4,
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          backgroundColor: "#fe6C0a",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <img src={pathToImageLogo} alt="AIScout" height={33} width={36} />
          <Typography
            sx={(theme) => ({
              ml: 1,
              fontWeight: "700",
              fontSize: "18px",
              lineHeight: "129.4%",
              color: theme.palette.mode === "light" ? "black" : "white",
            })}
          >
            {nameOfProject}
          </Typography>
        </Box>
        <Box
          sx={(theme) => ({
            px: 8,
            py: 7,
            backgroundColor:
              theme.palette.mode === "light" ? "#f7f9fb" : "#33393f",
            display: "flex",
            justifyContent: "space-between",
            columnGap: "30px",
            "& > *": {
              width: "33.33%",
            },
            "& .MuiTypography-root": {
              mb: 2.5,
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "31px",
            },
            "& .MuiBox-root": {
              fontWeight: "400",
              fontSize: "14px",
              lineHeight: "22px",
              color: theme.palette.mode === "light" ? "#1e1e1e" : "white",
            },
            ["@media (max-width: 767px)"]: {
              px: 4,
              "& > *": {
                width: "100%",
                "&:not(:last-child)": {
                  mb: 4,
                },
              },
              display: "block",
            },
          })}
        >
          <Box>
            <Typography
              sx={(theme) => ({
                color: theme.palette.mode === "light" ? "#3a3a3a" : "white",
              })}
            >
              Client
            </Typography>
            <Box>
              Quam platea orci tristique suscipit odio at id. Nisl convallis
              molestie sit quis bibendum blandit.
            </Box>
          </Box>

          <Box>
            <Typography>Project</Typography>
            <Box>
              Quam platea orci tristique suscipit odio at id. Nisl convallis
              molestie sit quis bibendum blandit in senectus. Sed viverra
              curabitur mattis id eget tellus egestas vel placerat.
            </Box>
          </Box>

          <Box>
            <Typography>Result</Typography>
            <Box>
              Quam platea orci tristique suscipit odio at id. Nisl convallis
              molestie sit quis bibendum blandit in senectus. Sed viverra
              curabitur mattis id eget tellus egestas vel placerat. Sed viverra
              curabitur mattis.
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placerat odio
    consequat enim sed gravida elit sed gravida. Eget vel orci id sit a. Quam
    molestie feugiat faucibus aliquam. Nisi aliquam nunc id cursus. Nibh neque,
    rutrum lacinia integer. Vitae posuere metus dictum ut ultrices venenatis
    adipiscing. Tempus, varius in quis sit nisl orci ipsum. Dui vel eget amet
    nisl. Tincidunt morbi purus, ut vestibulum mauris dis vitae ut nullam.
    Tempor ridiculus est diam massa tortor at vitae sit. Libero potenti non,
    tristique pellentesque tincidunt risus in nunc. Rutrum est, dictumst
    elementum id nulla. Luctus aenean commodo leo et eget morbi adipiscing elit.
    Nunc viverra senectus ultrices fermentum. Phasellus vitae lorem platea
    lacus, ultricies. Mi arcu integer a mauris ut adipiscing egestas. Ornare
    morbi elementum eget at pellentesque tortor. Lectus augue lacinia malesuada
    aliquet risus nunc, eu gravida aliquam. Scelerisque vitae semper nunc et ut
    lorem at purus nunc. Maecenas est sit nibh proin malesuada auctor
    consectetur felis. Ultrices orci sit aliquam sed sit mus vel. Elit quam
    massa at urna congue suscipit eget faucibus quam. Viverra aliquet purus amet
    risus. Lectus tempor est eu ut odio gravida lorem cras nisi.
  </Box>
);

export default ProjectInfo;
