import BlogCard from './BlogCard';
import { Grid } from '@chakra-ui/react';
import { getAllData } from './utils.js';
export default async function Home() {
  const posts = await getAllData();
  return (
    <Grid templateColumns={{ base: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' }} alignItems="center" gap={6}>
      {posts.map((post) => (
        <BlogCard key={post.id} title={post.title} date={post.date} id={post.id} image={post.image} />
      ))}
    </Grid>
  );
}
