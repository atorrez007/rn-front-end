import {
  Accordion,
  Box,
  Card,
  CardBody,
  CardHeader,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import HospitalAccordion from "./components/HospitalAccordion";
import { useAuth0 } from "@auth0/auth0-react";

const SavedHospitalsDashboard = () => {
  const { user } = useAuth0();

  const [existingHospitalList, setExistingHospitalList] = useState(
    JSON.parse(localStorage.getItem(`hospitalList_${user.sub}`)) || []
  );

  const handleHospitalUnsave = (hospitalId) => {
    const updatedHospitalList = existingHospitalList.filter(
      (hospital) => hospital.id !== hospitalId
    );
    localStorage.setItem(
      `hospitalList_${user.sub}`,
      JSON.stringify(updatedHospitalList)
    );

    setExistingHospitalList(updatedHospitalList);
  };

  useEffect(() => {}, []);

  return (
    <Box style={{ height: "600px", width: "1200px", overflow: "hidden" }}>
      <Card pt="2" w="500px" style={{ height: "100%", overflowY: "auto" }}>
        <CardHeader size="xl">
          <Text as="b">Your Saved Hospitals</Text>
        </CardHeader>
        <CardBody>
          <Accordion defaultIndex={[0]} allowMultiple>
            {existingHospitalList ? (
              existingHospitalList.map((hospital, index) => (
                <HospitalAccordion
                  key={index}
                  name={hospital.name}
                  img={hospital.img}
                  city={hospital.city}
                  state={hospital.state}
                  overallScore={hospital.overallScore}
                  id={hospital.id}
                  unsave={handleHospitalUnsave}
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
