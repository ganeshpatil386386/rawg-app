import { HStack, Image } from "@chakra-ui/react";
import LogoImage from "../assets/logo.webp";
import ColorModeSwitch from "./ColormodeSwitch";

const NavBar = () => {
  return (
    <HStack justifyContent='space-between' padding='10px'>
      <Image src={LogoImage} boxSize='60px' />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
