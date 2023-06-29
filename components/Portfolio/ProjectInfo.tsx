import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useRef } from "react";
import { useIsScrolling } from "react-use-is-scrolling";

import styles from "./pageStyles";

interface Props {
  readonly id: string;
  readonly nameOfProject: string;
  readonly pathToImageLogo: string;
  readonly isActive: boolean;
  readonly enableScrollObservation: boolean;
  readonly onActivated: (projectId: string) => void;
}

const LoremDescription =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placerat odio consequat enim sed gravida elit sed gravida. Eget vel orci id sit a. Quam molestie feugiat faucibus aliquam. Nisi aliquam nunc id cursus. Nibh neque, rutrum lacinia integer. Vitae posuere metus dictum ut ultrices venenatis adipiscing. Tempus, varius in quis sit nisl orci ipsum. Dui vel eget amet nisl. Tincidunt morbi purus, ut vestibulum mauris dis vitae ut nullam. Tempor ridiculus est diam massa tortor at vitae sit. Libero potenti non, tristique pellentesque tincidunt risus in nunc. Rutrum est, dictumst elementum id nulla. Luctus aenean commodo leo et eget morbi adipiscing elit. Nunc viverra senectus ultrices fermentum. Phasellus vitae lorem platea lacus, ultricies. Mi arcu integer a mauris ut adipiscing egestas. Ornare morbi elementum eget at pellentesque tortor. Lectus augue lacinia malesuada aliquet risus nunc, eu gravida aliquam. Scelerisque vitae semper nunc et ut lorem at purus nunc. Maecenas est sit nibh proin malesuada auctor consectetur felis. Ultrices orci sit aliquam sed sit mus vel. Elit quam massa at urna congue suscipit eget faucibus quam. Viverra aliquet purus amet risus. Lectus tempor est eu ut odio gravida lorem cras nisi.";

const ProjectInfo = ({
  nameOfProject,
  pathToImageLogo,
  isActive,
  enableScrollObservation,
  onActivated,
  id,
}: Props) => {
  const theme = useTheme();

  const ref = useRef<HTMLDivElement>();

  const { isScrollingY } = useIsScrolling();

  useEffect(() => {
    if (
      !isActive ||
      ref.current === undefined ||
      enableScrollObservation ||
      isScrollingY
    ) {
      return;
    }

    ref.current.scrollIntoView({
      behavior: "instant",
      block: "start",
      inline: "center",
    });
  }, [isActive, id, enableScrollObservation, isScrollingY]);

  useEffect(() => {
    const element = ref.current;
    if (!element || isActive || !enableScrollObservation) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleElement = entries.find(
          (entry) => entry.isIntersecting
        )?.target;

        if (visibleElement) {
          onActivated(id);
        }
      },
      {
        rootMargin: "0px 0px -80% 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [isActive, enableScrollObservation, onActivated, id]);

  const {
    projectInfo,
    leftSideLine,
    flexDiresction,
    projectNameStyle,
    projectNameColor,
    projectDescriptionStyle,
  } = styles(theme);

  const projectDescription = (
    <Box sx={flexDiresction}>
      <Box sx={projectNameStyle} ref={ref}>
        <img src={pathToImageLogo} alt={nameOfProject} height={33} width={36} />
        <Typography>{nameOfProject}</Typography>
      </Box>
      <Box sx={projectDescriptionStyle}>
        <Box>
          <Typography sx={projectNameColor}>Client</Typography>
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
  );

  return (
    <Box>
      <Box sx={projectInfo}>
        <Box sx={leftSideLine} />
        {projectDescription}
      </Box>
      {LoremDescription}
    </Box>
  );
};

export default ProjectInfo;
