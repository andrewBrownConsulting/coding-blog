import { Box, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import BlogCard from './BlogCard';
import { Grid } from '@chakra-ui/react';
export default function Home() {
  return (
    <Box>
      <Link href="/">
        <Heading>Andrew Brown Blog</Heading>
      </Link>
      <Box mt={4} mb={8}>
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
          <BlogCard image='/images/blog.png' title='First Post' date='January 1, 2024' id='test' />
          <BlogCard image='/images/blog.png' title='First Post' date='January 1, 2024' id='test' />
          <BlogCard image='/images/blog.png' title='First Post' date='January 1, 2024' id='test' />
          <BlogCard image='/images/blog.png' title='First Post' date='January 1, 2024' id='test' />
          <BlogCard image='/images/blog.png' title='First Post' date='January 1, 2024' id='test' />
          <BlogCard image='/images/blog.png' title='First Post' date='January 1, 2024' id='test' />
          <BlogCard image='/images/blog.png' title='First Post' date='January 1, 2024' id='test' />
          <BlogCard image='/images/blog.png' title='First Post' date='January 1, 2024' id='test' />
          <BlogCard image='/images/blog.png' title='First Post' date='January 1, 2024' id='test' />
          <BlogCard image='/images/blog.png' title='First Post' date='January 1, 2024' id='test' />
          <BlogCard image='/images/blog.png' title='First Post' date='January 1, 2024' id='test' />
        </Grid>
      </Box>
    </Box>
  );
}