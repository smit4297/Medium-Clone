import { BlogPublish } from "../components/BlogPublish";
import { Unauthorized } from "../components/Unauthorized";

export const BlogWrite = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
    return isLoggedIn ? <BlogPublish /> : <Unauthorized />;
  };