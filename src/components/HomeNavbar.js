import React from "react";
import { Box, Button, Flex, Input, Spacer } from "@chakra-ui/react";

const HomeNavbar = () => {
  return (
    <Flex
      bg="#737373;
    "
      w="auto"
      h="150px"
      p="3"
      m="1"
      borderRadius="10"
      borderColor="black"
    >
      <Box mt="8">
        <Button
          // borderRadius="100"
          ml="120px"
          mr="10"
          colorScheme="red"
          rounded="3xl"
          boxShadow="dark-lg"
          _hover={{ color: "gray.800" }}
        >
          Log in
        </Button>
        <Button
          rounded="3xl"
          mr="1"
          colorScheme="red"
          boxShadow="dark-lg"
          _hover={{ color: "gray.800" }}
        >
          Sign up
        </Button>
      </Box>
      <Spacer />
      <Input
        _hover={{ boxShadow: "dark-lg" }}
        _focus={{ boxShadow: "dark-lg" }}
        bg="rgb(237,242,247)"
        border="none"
        boxShadow="dark-lg"
        mt="8"
        textAlign="left"
        placeholder="Where to next?"
        w="sm"
      />
    </Flex>
  );
};

export default HomeNavbar;
