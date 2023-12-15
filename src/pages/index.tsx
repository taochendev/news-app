import React from "react";
import { Box, Container, Progress } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useIsFetching } from "@tanstack/react-query";
import Navigation from "../components/Navigation";

const Layout: React.FC = () => {
  const isFetching = Boolean(useIsFetching());

  return (
    <Box>
      <Navigation />
      <Progress
        size="xs"
        isIndeterminate
        colorScheme="gray.800"
        opacity={isFetching ? 1 : 0}
      />
      <Container my={[3, 3, 3, 8]} maxW="container.lg">
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
