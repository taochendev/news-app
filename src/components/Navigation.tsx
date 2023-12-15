import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Flex, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import {
  useParams,
  useLocation,
  useNavigate,
  To,
  NavigateOptions
} from "react-router-dom";
import debounce from "lodash/debounce";
import Link from "./Link";
import { UrlParams } from "../types";
import { countryName } from "../helpers";

type NavigateFunction = (to: To, options?: NavigateOptions) => void;

const Navigation: React.FC = () => {
  const { country } = useParams<UrlParams>();
  const location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const [query, setQuery] = useState("");
  const debouncedNavigate = useMemo(() => debounce(navigate, 500), [navigate]);

  const handleQueryChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setQuery(e.target.value);
      debouncedNavigate(`/${country}/search`, {
        state: { query: e.target.value }
      });
    },
    [debouncedNavigate, country]
  );

  useEffect(() => {
    if (!location.pathname.endsWith("/search")) {
      setQuery("");
    }
  }, [location.pathname]);

  const pathExcludingCountry = location.pathname.split("/").slice(2).join("/");

  return (
    <Flex
      flexWrap="wrap"
      position="sticky"
      top="0"
      bgColor="white"
      zIndex="sticky"
      shadow="md"
    >
      <Flex width={["100%", "100%", "xs"]}>
        <Link to={`/${country}/top-news`} width="50%">
          Top News
        </Link>
        <Link to={`/${country}/categories`} width="50%">
          Categories
        </Link>
      </Flex>
      <InputGroup width="auto" flexGrow="1">
        <Input
          placeholder={`Search Top News From ${countryName[country!]}`}
          borderRadius="0"
          onChange={handleQueryChange}
          value={query}
        />
        <InputRightElement>
          <Search2Icon color="gray.300" />
        </InputRightElement>
      </InputGroup>
      <Flex>
        <Link to={`/gb/${pathExcludingCountry}`} state={location.state}>
          GB
        </Link>
        <Link to={`/us/${pathExcludingCountry}`} state={location.state}>
          US
        </Link>
      </Flex>
    </Flex>
  );
};

export default Navigation;
