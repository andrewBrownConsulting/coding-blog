import { Box, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import BlogCard from './BlogCard';
import { Grid } from '@chakra-ui/react';
import { getAllData, getLimitedData } from './utils.js';
export default async function Home() {

  const posts = await getLimitedData();
  return (
    <Box>
      <Box mt={4} mb={8}>
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
          {posts.map((post) => (
            <BlogCard key={post.id} image={post.image} title={post.title} date={post.date} id={post.id} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}