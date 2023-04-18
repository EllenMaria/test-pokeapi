import Pokemon from "../features/pokemons/Pokemon";
import { Link } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

export const List = () => {
  return (
    <>
      <Link as={RouterLink} to="/">
        <ChevronLeftIcon w={16} h={16} color="red.500" />
      </Link>
      <Pokemon />
    </>
  );
};
