import { BlogSidebar } from "./BlogSidebar";
import { getAllTags } from "../lib/posts";

export async function BlogSidebarServer() {
  const tags = await getAllTags();
  return <BlogSidebar tags={tags} />;
}
