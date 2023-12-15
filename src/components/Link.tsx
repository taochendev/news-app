import { useLocation, Link as RouterLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";
import React from "react";

const LinkComponent: React.FC<React.ComponentProps<typeof Link>> = (props) => {
  const location = useLocation();

  return (
    <Link
      as={RouterLink}
      bgColor={location.pathname.startsWith(props.to) ? "gray.800" : "gray.200"}
      color={location.pathname.startsWith(props.to) ? "white" : undefined}
      textAlign="center"
      py="2"
      px="4"
      _hover={{ textDecor: "none", bgColor: "gray.300" }}
      {...props}
    />
  );
};

export default LinkComponent;
