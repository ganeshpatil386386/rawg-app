import {
  Button,
  HStack,
  Image,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import useGeneres from "../hooks/useGenres";

const GenreList = () => {
  const { genres, error, isLoading } = useGeneres();

  if (isLoading) return <Spinner />;
  return (
    <List>
      {genres.map((gener) => (
        <ListItem key={gener.id} paddingY='5px'>
          <HStack>
            <Image
              boxSize='32px'
              borderRadius={8}
              src={gener.image_background}
            />
            <Button
              onClick={() => console.log(`${gener.id}`)}
              fontSize='lg'
              variant='links'
            >
              {gener.name}
            </Button>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default GenreList;
