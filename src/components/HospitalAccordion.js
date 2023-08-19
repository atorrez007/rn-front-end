import {
  AccordionItem,
  AccordionPanel,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

// Review accordion appears under the user's profile page for submitted hospital reviews.

const HospitalAccordion = ({ name, city, state, img, overallScore }) => {
  return (
    <AccordionItem p="2">
      <h2>
        <Link>
          {/* <Box as="span" flex="1" p="2" textAlign="left">
            <Img src={img} h="60px" />
            <Text as="b">{name}</Text>
            <Text as="i"> - {state}</Text>
          </Box> */}
          <Card
            // key={}
            w="100%"
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src={img}
              alt="Caffe Latte"
            />

            <Stack>
              <CardBody>
                <Heading size="md">{name}</Heading>

                <Text py="2">
                  {city}, {state}
                </Text>
                <StarRating overallScore={overallScore} />
              </CardBody>

              <CardFooter>
                <Button variant="solid" colorScheme="blue">
                  Go To Hospital
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        </Link>
      </h2>
      <AccordionPanel pb={4}></AccordionPanel>
    </AccordionItem>
  );
};

export default HospitalAccordion;
