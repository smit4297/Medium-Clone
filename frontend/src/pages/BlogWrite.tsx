import { BlogPublish } from "../components/BlogPublish";
import { Unauthorized } from "../components/Unauthorized";

export const BlogWrite = ({ isLoggedin }: { isLoggedin: boolean }) => {
    return isLoggedin ? <BlogPublish /> : <Unauthorized />;
  };