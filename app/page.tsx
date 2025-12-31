import BlogCard from './BlogCard';
import { Grid } from '@chakra-ui/react';
import { getAllData, getLimitedData } from './utils.js';
export default async function Home() {
  const posts = await getAllData();
  return (
    <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6} width="100%" padding={2}>
      {posts.map((post) => (
        <BlogCard key={post.id} title={post.title} date={post.date} id={post.id} image={post.image} />
      ))}
    </Grid>
  );
}