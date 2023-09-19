import { Box, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";

const HomeCard = ({ imageSource, text }) => {
  return (
    // <Card variant="unstyled" mr="6" mt="4">
    //   <CardBody>
    //     <Image h="250px" w="auto" src={tile1} />
    //     <Stack mt="8" spacing="3">
    //       <Text>Lorem Ipsum</Text>
    //     </Stack>
    //   </CardBody>
    // </Card>
    <Stack direction="column" alignItems="center" w="500px">
      <Box w="500px">
        <Image
          h="250px"
          w="auto"
          src={imageSource}
          borderRadius="lg"
          boxShadow="2xl"
          opacity="1"
          _hover={{ opacity: ".7" }}
          transition="0.1s"
        />
        <Text color="white" fontSize="xl" fontWeight="bold" mt="5">
          Lorem Ipsum
        </Text>
        <Box maxW="300px">
          <Text color="white" mt="5">
            {text}
          </Text>
        </Box>
        {/* <Text as="p" mt="3" color="white">
          Browser through our database of hospitals and find the facility that's
          just right for you!
        </Text> */}
      </Box>
    </Stack>
  );
};

export default HomeCard;
