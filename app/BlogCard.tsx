import { Card, CardHeader, Image, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';

export default function BlogCard({ image, title, date, id }: { image: string; title: string; date: string; id: string }) {
  return (
    <Link href={`/blog-page/${id}`}>
      <Card.Root maxW="sm" overflow="hidden" p={4}>
        <Image src={image} alt='Blog Image' width='100%' height='auto' borderTopRadius='md' />
        <CardHeader bg='gray.800' borderBottomRadius='md'>
          <Heading size='lg'>{title}</Heading>
          <Text fontSize='sm' color='gray.400' pb={4}>{date}</Text>
        </CardHeader>
      </Card.Root>
    </Link>
  )
}
