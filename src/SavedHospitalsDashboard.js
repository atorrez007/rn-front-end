import {
  Accordion,
  Box,
  Card,
  CardBody,
  CardHeader,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

import HospitalAccordion from "./components/HospitalAccordion";

const SavedHospitalsDashboard = () => {
  const savedHospitals = useSelector((state) => state.users.savedHospitals);

  // const mappedHospitals = savedHospitals.map((item, index) => {
  //   return (
  //     <VStack spacing={4} align="stretch">
  // <Card
  //   key={index}
  //   w="100%"
  //   direction={{ base: "column", sm: "row" }}
  //   overflow="hidden"
  //   variant="outline"
  // >
  //   <Image
  //     objectFit="cover"
  //     maxW={{ base: "100%", sm: "200px" }}
  //     src={item.img}
  //     alt="Caffe Latte"
  //   />

  //   <Stack>
  //     <CardBody>
  //       <Heading size="md">{item.name}</Heading>

  //       <Text py="2">
  //         {item.city}, {item.state}
  //       </Text>
  //     </CardBody>

  //     <CardFooter>
  //       <Button variant="solid" colorScheme="blue">
  //         Go To Hospital
  //       </Button>
  //     </CardFooter>
  //   </Stack>
  // </Card>
  //     </VStack>
  //   );
  // });

  return (
    <Box style={{ height: "600px", width: "1200px", overflow: "hidden" }}>
      <Card pt="2" w="500px" style={{ height: "100%", overflowY: "auto" }}>
        <CardHeader size="xl">
          <Text as="b">Your Saved Hospitals</Text>
        </CardHeader>
        <CardBody>
          <Accordion defaultIndex={[0]} allowMultiple>
            {savedHospitals ? (
              savedHospitals.map((hospital, index) => (
                <HospitalAccordion
                  key={index}
                  name={hospital.name}
                  img={hospital.img}
                  city={hospital.city}
                  state={hospital.state}
                  overallScore={hospital.overallScore}
                />
              ))
            ) : (
              <Text>Loading...</Text>
            )}
          </Accordion>
        </CardBody>
      </Card>
    </Box>
  );
};

export default SavedHospitalsDashboard;
