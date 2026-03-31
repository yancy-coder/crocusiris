import { getAllPosts, getAllCategories } from "../lib/posts";
import { BlogSectionClient } from "./BlogSectionClient";

export async function BlogSectionServer() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();
  
  return <BlogSectionClient posts={posts} categories={categories} />;
}
