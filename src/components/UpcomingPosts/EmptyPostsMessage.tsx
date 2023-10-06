import { List, Typography } from "@mui/material";

const EmptyPostsMessage = () => (
  <List className="posts-list">
    <Typography
      variant="h6"
      sx={{ display: "block", margin: "0 auto", my: "30px" }}
    >
      There are no Upcoming posts yet...
    </Typography>
  </List>
);

export default EmptyPostsMessage;
