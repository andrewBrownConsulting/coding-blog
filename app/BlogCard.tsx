import { Card, CardHeader, Image, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
// import the vercel blob storage util

export default async function BlogCard({ title, date, id, image }: { title: string; date: string; id: string, image: string }) {
  //get date in 1 Jan 2020 format
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return (
    <Link href={`/blog-page/${id}`}>
      <Card.Root maxW="sm" overflow="hidden" p={4}>
        <Image src={image} alt='Blog Image' width='100%' height='auto' borderTopRadius='md' aspectRatio={1.5} />
        <CardHeader bg='gray.800' borderBottomRadius='md'>
          <Heading size='lg' lineHeight="1.2em"
            minH="2.4em" maxH="2.4em" overflow={"hidden"} textOverflow={'ellipsis'}>{title}</Heading>
          <Text fontSize='sm' color='gray.400' pb={4}>{formattedDate}</Text>
        </CardHeader>
      </Card.Root>
    </Link>
  )
}
