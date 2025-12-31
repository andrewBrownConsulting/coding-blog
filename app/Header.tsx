import { Grid, Heading, Link, Box, Card, GridItem } from "@chakra-ui/react";
export default function Header() {
  return (
    <Grid templateColumns={{ base: '1fr', sm: '1fr 2fr 1fr', lg: '1fr 1fr 1fr' }} alignItems="center" gap={6} mb={6}>
      <GridItem display={{ base: 'none', sm: 'block' }} />
      <Link href="/" style={{ display: 'inline-block' }} maxWidth={800}>
        <Heading textAlign={'center'} fontSize={'4xl'} _hover={{ color: 'gray.500' }} background={'white'} p={4} borderRadius={'sm'} color={'black'}>Andrew Brown Blog</Heading>
      </Link>
      <GridItem display={{ base: 'none', lg: 'block' }} />
    </Grid>

  );
}
