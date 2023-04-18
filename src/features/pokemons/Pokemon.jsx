import { useRef, useState, useEffect } from "react";
import { useGetAllQuery } from "../../api/apiSlice";
import { useSelector } from "react-redux";
import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Container,
  Text,
  Heading,
  Icon,
  Center,
  Button,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
import { TbPokeball, TbHeart } from "react-icons/tb";
import "./style.css";
import App from "./Test";

const Pokemon = () => {
  const [limit, setLimit] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(true);

  const {
    data = {},
    error,
    isLoading,
    isFetching,
  } = useGetAllQuery(limit);

  const results = data?.results ?? [];

  const { favorites } = useSelector((state) => state.favorites);

  const gridRef = useRef();

  useEffect(() => {
    if (results.length) {
      setIsLoadingMore(false);
    }
  }, [results]);

  useEffect(() => {
    if (results.length && !isLoadingMore && gridRef.current) {
      gridRef.current.scrollToItem({
        rowIndex: Math.floor((results.length - 8) / 4),
      });
    }
  }, [results, isLoadingMore, gridRef.current]);

  useEffect(() => {
    if (gridRef.current) {
      // The component has mounted, so it's safe to set the ref
      gridRef.current = createGridRef();
    }
  }, []);

  if (error) return <div>Error: {error.message}</div>;

  const loadMore = () => {
    setIsLoadingMore(true);
    setLimit((prev) => prev + 8);
  };

  return (
    <Container maxW="1180px" data-testid="pokemon-component">
      <Tabs variant="soft-rounded">
        <Heading size="3xl" pb="3">
          Lista
        </Heading>
        <TabList pb="3">
          <Tab>
            <Icon mr={1} boxSize={5} as={TbPokeball} />
            Todos
          </Tab>
          <Tab
            _selected={{ bg: "red.200" }}
            isDisabled={favorites.length === 0 ? true : false}
          >
            <Icon mr={1} boxSize={5} as={TbHeart} />
            Favoritos
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Text
              data-testid="total"
              fontSize="xs"
              letterSpacing="2px"
              fontWeight="bold"
              color="#3c3c3c"
              textTransform="uppercase"
              pb={5}
            >
              Total: {results.length}
            </Text>
            <App results={results} gridRef={gridRef} />
            <Center>
              <Button
                data-testid="button-loadmore"
                mt={4}
                isLoading={isLoadingMore || isFetching ? true : false}
                loadingText="Carregando"
                colorScheme="red"
                size="md"
                width="150px"
                onClick={loadMore}
                spinnerPlacement="start"
              >
                Ver Mais
              </Button>
            </Center>
          </TabPanel>
          <TabPanel>
            <Text
              fontSize="xs"
              letterSpacing="2px"
              fontWeight="bold"
              color="#3c3c3c"
              textTransform="uppercase"
            >
              Total: {favorites.length}
            </Text>
            <App results={favorites} gridRef={gridRef} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Pokemon;
