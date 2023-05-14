import React, { useState } from "react";

import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Checkbox,
  CheckboxGroup,
  Stack,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

const EvalForm = (props) => {
  const [hospitalName, setHospitalName] = useState("");
  // const [shifts, setShifts] = useState([]);

  // const addShifts = () => {
  //   alert("added shift!");
  // };

  const handleNameChange = (e) => {
    setHospitalName(e.target.value);
  };
  return (
    <Box bg="white" h="100vh">
      <Box maxW="50%" m="auto">
        <Box p="4">
          <form>
            <FormControl mb="4" isRequired>
              <FormLabel> Facility Name </FormLabel>
              <Input
                type="text"
                name="title"
                onChange={handleNameChange}
                value={hospitalName}
              ></Input>
              <FormHelperText color="gray.400">
                Enter the name of the hospital.
              </FormHelperText>
            </FormControl>

            <FormControl mb="4" isRequired>
              <FormLabel> Department Worked </FormLabel>
              <Input type="text" name="title"></Input>
              <FormHelperText color="gray.400">
                Which department did you work in?
              </FormHelperText>
            </FormControl>

            <FormControl mb="8">
              <FormLabel> Shift</FormLabel>
              <FormHelperText color="gray.400" mb="3">
                What shifts did you work?
              </FormHelperText>
              <CheckboxGroup size="md" colorScheme="green">
                <Stack>
                  <Checkbox value="3:12 days">3:12 days</Checkbox>
                  <Checkbox value="3:12 nights">3:12 nights</Checkbox>
                  <Checkbox value="4:12 days">4:12 days</Checkbox>
                  <Checkbox value="4:12 nights">4:12 nights</Checkbox>
                  <Checkbox value="5:8 days">5:8 days</Checkbox>
                  <Checkbox value="5:8 nights">5:8 nights</Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>
            <FormControl mb="8" isRequired>
              <FormLabel>Nurse to Patient Ratios</FormLabel>
              {/* <Input type="text" name="ratios"></Input> */}
              <FormHelperText mb="4">
                On average what was the nurse to patient ratio ?
              </FormHelperText>
              <RadioGroup>
                <Stack spacing={6} direction="row">
                  <Radio value="1"> 1:3 patients</Radio>
                  <Radio value="2"> 1:4 patients</Radio>
                  <Radio value="3"> 1:5 patients</Radio>
                  <Radio value="4"> 1:6 patients</Radio>
                  <Radio value="5"> 1:7 patients</Radio>
                  <Radio value="6">1:8+</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl mb="8">
              <FormLabel>EMR/Charting Software</FormLabel>
              <RadioGroup>
                <Stack spacing={4} mb="4" direction="row">
                  <Radio value="1">Epic</Radio>
                  <Radio value="2">Meditech</Radio>
                  <Radio value="3">Cerner</Radio>
                </Stack>
                <FormLabel>Other:</FormLabel>
                <Input></Input>
              </RadioGroup>
            </FormControl>
            <FormControl mb="2">
              <Stack spacing={4}>
                <FormLabel>Reliability and Communication</FormLabel>
                <FormHelperText>
                  On a scale of 1-10, did this facility have a good system in
                  place to figure out who you needed to page (MD,PA, NP)?{" "}
                </FormHelperText>
                <RadioGroup>
                  <Stack spacing={4} mb="4" direction="row">
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">3</Radio>
                    <Radio value="4">4</Radio>
                    <Radio value="5">5</Radio>
                    <Radio value="6">6</Radio>
                    <Radio value="7">7</Radio>
                    <Radio value="8">8</Radio>
                    <Radio value="9">9</Radio>
                    <Radio value="10">10</Radio>
                  </Stack>
                </RadioGroup>
              </Stack>
            </FormControl>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default EvalForm;
