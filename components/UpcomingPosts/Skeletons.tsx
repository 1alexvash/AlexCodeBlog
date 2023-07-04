import { List, Skeleton } from "@mui/material";

interface SkeletonsListProps {
  skeletonsToRender: number;
}

const SkeletonsList = ({ skeletonsToRender }: SkeletonsListProps) => (
  <List className="posts-list">
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
  </List>
);

export default SkeletonsList;
