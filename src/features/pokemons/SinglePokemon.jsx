import React, { memo, useCallback, useMemo, useState } from "react";
import { useGetByIdQuery } from "../../api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "./favoriteSlice";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Heading,
  Image,
  Center,
  Text,
  Badge,
  Flex,
  Spacer,
  Icon,
  Box,
  SkeletonCircle,
  SkeletonText,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import { TbHeart, TbHeartFilled } from "react-icons/tb";

const SinglePokemon = memo(({ name }) => {
  const { data: pokemon = [], isLoading, isFetching } = useGetByIdQuery(name);
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorites);
  const isFavorite = favorites.some((item) => item.name === name);
  const handleFavorite = useCallback(
    (singlePokemon) => {
      dispatch(addToFavorites(singlePokemon));
    },
    [dispatch]
  );

  const imageUrl = useMemo(
    () => pokemon.sprites?.other?.dream_world?.front_default,
    [pokemon.sprites?.other?.dream_world?.front_default]
  );

  if (isLoading || isFetching) {
    return (
      <Box padding="12" boxShadow="lg" bg="white">
        <Center>
          <SkeletonCircle size="20" />
        </Center>
        <SkeletonText mt="6" noOfLines={3} spacing="5" skeletonHeight="3" />
      </Box>
    );
  }

  return (
    <Card boxShadow="xl" borderRadius="40px 0" border="3px solid lightblue" >
      <CardHeader>
        <Flex>
          <Text fontSize="sm">#{String(`${pokemon.id}`).padStart(3, "0")}</Text>
          <Spacer />
          <Tooltip
            hasArrow
            placement="top"
            label={isFavorite ? "Remover" : "Adicionar aos Favoritos"}
            bg="red.600"
          >
            <Button
              width={0}
              height={5}
              padding="0px"
              bg="transparent"
              _hover={{ bg: "transparent" }}
              minW={6}
              pointerEvents="unset"
            >
              <Icon
                onClick={() => handleFavorite(pokemon)}
                boxSize={8}
                bg="none"
                color={isFavorite ? "red.400" : "gray.300"}
                as={isFavorite ? TbHeartFilled : TbHeart}
                cursor="default"
                _hover={{ color: "red.500" }}
              />
            </Button>
          </Tooltip>
        </Flex>
        <Center>
          {imageUrl ? (
            <img className="pokemonImage" src={imageUrl} alt="Dan Abramov" />
          ) : (
            <img
              className="pokemonImage"
              src="https://i.ibb.co/RzGBsmR/placeholderr.png"
              alt="Dan Abramov"
            />
          )}
        </Center>
      </CardHeader>
      <CardBody>
        <Center>
          <Heading as="h3" size="md" style={{ textTransform: "capitalize" }}>
            {pokemon?.name}
          </Heading>
        </Center>
        <Center>
          {pokemon.types.map((type) => (
            <Badge
              key={type.type.name}
              mt={1}
              ml="1"
              fontSize="0.8em"
              colorScheme="red"
            >
              {type.type.name}
            </Badge>
          ))}
        </Center>
      </CardBody>
    </Card>
  );
});

export default SinglePokemon;
