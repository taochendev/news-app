import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Text,
  Flex,
  SimpleGrid,
  Spinner,
  AlertIcon,
  Alert
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { AxiosError } from "axios";
import { useParams, Link as RouterLink, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import NewsTile from "../components/NewsTile";
import DetailView from "../components/DetailView";
import api from "../api";
import { ApiError, ApiResponse, Article, UrlParams } from "../types";
import { countryName } from "../helpers";

const title = (
  pathname: string,
  countryName: string,
  category: string | undefined,
  query: string | undefined
) => {
  if (pathname.endsWith("/top-news")) {
    return `Top news from ${countryName}`;
  } else if (pathname.endsWith("/search")) {
    if (query) {
      return `Top news searched by "${query}" from ${countryName}`;
    } else {
      return `No search keyword is given`;
    }
  } else {
    return `Top ${category} news from ${countryName}`;
  }
};

const shouldQuery = (pathname: string, query: string | undefined) => {
  if (pathname.endsWith("/search") && !query) {
    return false;
  }
  return true;
};

const errorMessage = (e: AxiosError<ApiError>) =>
  e.code === "ERR_NETWORK" ? e.message : e.response?.data.message;

const TopNews: React.FC = () => {
  const [detailView, setDetailView] = useState<Article | null>(null);
  const { country, category } = useParams<UrlParams>();
  const location = useLocation();
  const query: string | undefined = location.state?.query;

  const { data, refetch, error } = useQuery<ApiResponse, AxiosError<ApiError>>({
    queryKey: ["top-news", country, category, query],
    enabled: false,
    queryFn: () =>
      api
        .get("/top-headlines", {
          params: {
            country,
            category,
            q: !query ? undefined : query
          }
        })
        .then((res) => res.data)
  });

  useEffect(() => {
    if (shouldQuery(location.pathname, query)) {
      refetch();
    }
  }, [location.pathname, query, refetch, country]);

  if (detailView) {
    return (
      <DetailView data={detailView} onBackClick={() => setDetailView(null)} />
    );
  }

  return (
    <Box>
      <Flex justify="space-between" flexWrap="wrap" mb="5">
        <Text fontSize="xl" margin="1">
          {title(location.pathname, countryName[country!], category, query)}
        </Text>
        {category && (
          <Button
            as={RouterLink}
            to={`/${country}/categories`}
            size="sm"
            margin="1"
          >
            <ArrowBackIcon mr="1" />
            Back to categories
          </Button>
        )}
      </Flex>
      {error ? (
        <Alert status="error">
          <AlertIcon />
          {errorMessage(error)}
        </Alert>
      ) : (
        !data &&
        shouldQuery(location.pathname, query) && (
          <Box textAlign="center" mt="5">
            <Spinner size="xl" />
          </Box>
        )
      )}
      <SimpleGrid columns={[1, 2, 3, 4]} spacing="4">
        {data &&
          data.articles.map((article) => (
            <NewsTile
              data={article}
              key={article.url}
              w={["xs, md, lg"]}
              onMoreClick={setDetailView}
            />
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default TopNews;
