import {
  Button,
  HStack,
  Image,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import useGeneres, { Genre } from "../hooks/useGenres";

interface Props {
  onSelectGenre: (genre: Genre) => void;
}
const GenreList = ({ onSelectGenre }: Props) => {
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
              onClick={() => onSelectGenre(gener)}
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
