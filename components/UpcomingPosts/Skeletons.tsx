import { Skeleton } from "@mui/material";

interface SkeletonsListProps {
  skeletonsToRender: number;
}

const SkeletonsList = ({ skeletonsToRender }: SkeletonsListProps) => (
  <>
    {Array.from({ length: skeletonsToRender }).map((_, index) => (
      <Skeleton
        variant="rectangular"
        component="li"
        sx={{
          height: "auto",
        }}
        key={index}
      />
    ))}
  </>
);

export default SkeletonsList;
