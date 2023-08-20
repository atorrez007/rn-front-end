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
import { CloseIcon } from "@chakra-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import { useAuth0 } from "@auth0/auth0-react";
// Review accordion appears under the user's profile page for submitted hospital reviews.

const HospitalAccordion = ({ name, city, state, img, overallScore, id }) => {
  const { user } = useAuth0();
  const handleUnsave = () => {
    if (user) {
      const userHospitalListKey = `hospitalList_${user.sub}`;

      const existingHospitalList =
        JSON.parse(localStorage.getItem(userHospitalListKey)) || [];

      const updatedHospitalList = existingHospitalList.filter(
        (hospital) => hospital.id !== id
      );

      localStorage.setItem(
        userHospitalListKey,
        JSON.stringify(updatedHospitalList)
      );
    }
  };

  return (
    <AccordionItem p="2">
      <h2>
        <Link>
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

            <Stack display="flex">
              <Button
                bg="red.500"
                _hover={{ bg: "red.400" }}
                ml="180px"
                p="2"
                onClick={handleUnsave}
              >
                <CloseIcon focusable="true">X</CloseIcon>
              </Button>
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
