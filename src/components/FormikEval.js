import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
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
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Spinner,
  useToast,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
const validationSchema = Yup.object().shape({
  specialty: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("*"),
  shift: Yup.array().min(1, "Select at least one shift"),
  nurseRatio: Yup.string().required("*"),
  accessibility: Yup.string().required("Required"),
  chartingSoftware: Yup.string().required("Required"),
  diningOptions: Yup.array().min(1, "Select at least one dining option"),
  scrubColor: Yup.string().required("Required"),
  accommodations: Yup.array().min(1, "Select at least one accommodation"),
  safety: Yup.string().required("Required"),
  parking: Yup.string().required("Required"),
  overallScore: Yup.number().required("Required"),
  text: Yup.string().max(140, "Must be 140 characters or less."),
});

const EvalForm = () => {
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const { hospitalId } = useParams();
  const { user } = useAuth0();

  const navigate = useNavigate();
  const toast = useToast();
  const toastAlert = () => {
    toast({
      position: "top",
      title: "Review Added",
      description: "Your review has been added!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };
  const onSubmit = async (values) => {
    if (user) {
      onOpen(); //call to Chakra Modal open.
      // console.log(values);
      setTimeout(() => {
        axios
          .post(`${baseURL}/hospitals/${hospitalId}/reviews`, {
            values,
            user: {
              sub: user.sub,
            },
          })
          .then((res) => console.log(res))
          .finally(() => {
            onClose(); //call to Charka Modal close.
            toastAlert();
            navigate(`/search/${hospitalId}`);
          });
      }, 3000);
    } else {
      alert(`You are not logged in. Please log in.`);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const formik = useFormik({
    initialValues: {
      specialty: "",
      shift: [],
      nurseRatio: "",
      accessibility: "",
      chartingSoftware: "",
      diningOptions: [],
      scrubColor: "",
      accommodations: [],
      safety: "",
      parking: "",
      overallScore: 0,
      text: "",
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  const handleInputChange = (name, value) => {
    if (Array.isArray(formik.values[name])) {
      const isChecked = formik.values[name].includes(value);

      if (isChecked) {
        const updatedValues = formik.values[name].filter(
          (item) => item !== value
        );
        formik.setFieldValue(name, updatedValues);
      } else {
        const updatedValues = [...formik.values[name], value];
        formik.setFieldValue(name, updatedValues);
      }
    } else {
      formik.setFieldValue(name, value);
    }
  };

  return (
    <Box bg="white" h="100vh">
      <Box maxW="50%" m="auto">
        <Box p="4">
          <form onSubmit={formik.handleSubmit}>
            <FormControl mb="4">
              <FormLabel>Department Worked</FormLabel>
              <Box mb="3" style={{ color: "red" }}>
                {formik.errors.specialty ? formik.errors.specialty : "*"}
              </Box>
              <Input
                type="text"
                name="specialty"
                placeholder="medsurg, ICU"
                value={formik.values.specialty}
                onChange={formik.handleChange}
              />
              <FormHelperText color="gray.400">
                Which department did you work in?
              </FormHelperText>
            </FormControl>

            {/* Shift Checkbox Group */}
            <FormControl mb="8">
              <FormLabel>Shift</FormLabel>
              <Box mb="3" style={{ color: "red" }}>
                {formik.errors.shift ? formik.errors.shift : ""}
              </Box>
              <FormHelperText color="gray.400" mb="3">
                What shifts did you work?
              </FormHelperText>
              <CheckboxGroup value={formik.values.shift}>
                <Stack>
                  <Checkbox
                    value="3:12 days"
                    onChange={() => handleInputChange("shift", "3:12 days")}
                  >
                    3:12 days
                  </Checkbox>
                  <Checkbox
                    value="3:12 nights"
                    onChange={() => handleInputChange("shift", "3:12 nights")}
                  >
                    3:12 nights
                  </Checkbox>
                  <Checkbox
                    value="4:12 days"
                    onChange={() => handleInputChange("shift", "4:12 days")}
                  >
                    4:12 days
                  </Checkbox>
                  <Checkbox
                    value="4:12 nights"
                    onChange={() => handleInputChange("shift", "4:12 nights")}
                  >
                    4:12 nights
                  </Checkbox>
                  <Checkbox
                    value="5:8 days"
                    onChange={() => handleInputChange("shift", "5:8 days")}
                  >
                    5:8 days
                  </Checkbox>
                  <Checkbox
                    value="5:8 nights"
                    onChange={() => handleInputChange("shift", "5:8 nights")}
                  >
                    5:8 nights
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>

            <FormControl mb="8" isRequired>
              <FormLabel>Nurse to Patient Ratios</FormLabel>
              <FormHelperText mb="4">
                On average, what was the nurse to patient ratio?
              </FormHelperText>

              <RadioGroup
                value={formik.values.nurseRatio}
                name="nurseRatio"
                onChange={(value) => handleInputChange("nurseRatio", value)}
              >
                <Stack spacing={6} direction="row">
                  <Radio value="1:3 patients">1:3 patients</Radio>
                  <Radio value="1:4 patients">1:4 patients</Radio>
                  <Radio value="1:5 patients">1:5 patients</Radio>
                  <Radio value="1:6 patients">1:6 patients</Radio>
                  <Radio value="1:7 patients">1:7 patients</Radio>
                  <Radio value="1:8+ patients">1:8+</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            {/* EMR/Charting Software Radio Group */}
            <FormControl mb="8" isRequired>
              <FormLabel>EMR/Charting Software</FormLabel>
              <RadioGroup
                value={formik.values.chartingSoftware}
                name="chartingSoftware"
              >
                <Stack spacing={4} mb="4" direction="row">
                  <Radio
                    value="Epic"
                    onChange={() =>
                      handleInputChange("chartingSoftware", "Epic")
                    }
                  >
                    Epic
                  </Radio>
                  <Radio
                    value="Meditech"
                    onChange={() =>
                      handleInputChange("chartingSoftware", "Meditech")
                    }
                  >
                    Meditech
                  </Radio>
                  <Radio
                    value="Cerner"
                    onChange={() =>
                      handleInputChange("chartingSoftware", "Cerner")
                    }
                  >
                    Cerner
                  </Radio>
                  <Radio
                    value="Other"
                    onChange={() => {
                      handleInputChange("chartingSoftware", "Other");
                    }}
                  >
                    Other
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl mb="2" isRequired>
              <Stack spacing={4}>
                <FormLabel>Reliability and Communication</FormLabel>
                <FormHelperText>
                  On a scale of 1-10, did this facility have a good system in
                  place to figure out who you needed to page (MD,PA, NP)?{" "}
                </FormHelperText>
                <RadioGroup value={formik.values.accessibility}>
                  <Stack spacing={4} mb="4" direction="row">
                    <Radio
                      value="1"
                      onChange={() => {
                        handleInputChange("accessibility", "1");
                      }}
                    >
                      1
                    </Radio>
                    <Radio
                      value="2"
                      onChange={() => {
                        handleInputChange("accessibility", "2");
                      }}
                    >
                      2
                    </Radio>
                    <Radio
                      value="3"
                      onChange={() => {
                        handleInputChange("accessibility", "3");
                      }}
                    >
                      3
                    </Radio>
                    <Radio
                      value="4"
                      onChange={() => {
                        handleInputChange("accessibility", "4");
                      }}
                    >
                      4
                    </Radio>
                    <Radio
                      value="5"
                      onChange={() => {
                        handleInputChange("accessibility", "5");
                      }}
                    >
                      5
                    </Radio>
                    <Radio
                      value="6"
                      onChange={() => {
                        handleInputChange("accessibility", "6");
                      }}
                    >
                      6
                    </Radio>
                    <Radio
                      value="7"
                      onChange={() => {
                        handleInputChange("accessibility", "7");
                      }}
                    >
                      7
                    </Radio>
                    <Radio
                      value="8"
                      onChange={() => {
                        handleInputChange("accessibility", "8");
                      }}
                    >
                      8
                    </Radio>
                    <Radio
                      value="9"
                      onChange={() => {
                        handleInputChange("accessibility", "9");
                      }}
                    >
                      9
                    </Radio>
                    <Radio
                      value="10"
                      onChange={() => {
                        handleInputChange("accessibility", "10");
                      }}
                    >
                      10
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Stack>
            </FormControl>

            {/* Dining Options Checkbox Group */}
            <FormControl mb="8">
              <FormLabel>
                What were the dining options for staff inside the facility?
              </FormLabel>
              <Box mb="3" style={{ color: "red" }}>
                {formik.errors.diningOptions
                  ? formik.errors.diningOptions
                  : "*"}
              </Box>
              <CheckboxGroup value={formik.values.diningOptions}>
                <Stack>
                  <Checkbox
                    value="on-site cafeteria"
                    onChange={() =>
                      handleInputChange("diningOptions", "on-site cafeteria")
                    }
                  >
                    On-site cafeteria
                  </Checkbox>
                  <Checkbox
                    value="limited hours"
                    onChange={() =>
                      handleInputChange("diningOptions", "limited hours")
                    }
                  >
                    Limited hours
                  </Checkbox>
                  <Checkbox
                    value="smaller cafe with quick bites"
                    onChange={() =>
                      handleInputChange(
                        "diningOptions",
                        "smaller cafe with quick bites"
                      )
                    }
                  >
                    Smaller cafe with quick bites
                  </Checkbox>
                  <Checkbox
                    value="vending machines"
                    onChange={() =>
                      handleInputChange("diningOptions", "vending machines")
                    }
                  >
                    Vending machines
                  </Checkbox>
                  <Checkbox
                    value="coffee shop"
                    onChange={() =>
                      handleInputChange("diningOptions", "coffee shop")
                    }
                  >
                    Coffee shop
                  </Checkbox>
                  <Checkbox
                    value="food available on night shift"
                    onChange={() =>
                      handleInputChange(
                        "diningOptions",
                        "food available on night shift"
                      )
                    }
                  >
                    Food available on night shift
                  </Checkbox>
                  <Checkbox
                    value="other"
                    onChange={() => handleInputChange("diningOptions", "other")}
                  >
                    Other
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>
            <FormControl mb="4" isRequired>
              <FormLabel>Scrub Color</FormLabel>
              <Input
                type="text"
                name="scrubColor"
                placeholder="Red, Green, Navy-Blue"
                value={formik.values.scrubColor}
                onChange={formik.handleChange}
              />
              <FormHelperText color="gray.400">
                Scrub Color or any specific uniform requirements.
              </FormHelperText>
            </FormControl>
            {/* Accommodations Checkbox Group */}
            <FormControl mb="6">
              <FormLabel>
                Accommodations (Where did you stay during the assignment?)
              </FormLabel>
              <Box mb="3" style={{ color: "red" }}>
                {formik.errors.accommodations
                  ? formik.errors.accommodations
                  : "*"}
              </Box>
              <CheckboxGroup value={formik.values.accommodations}>
                <Stack>
                  <Checkbox
                    value="Hotel"
                    onChange={() =>
                      handleInputChange("accommodations", "Hotel")
                    }
                  >
                    Hotel
                  </Checkbox>
                  <Checkbox
                    value="Airbnb"
                    onChange={() =>
                      handleInputChange("accommodations", "Airbnb")
                    }
                  >
                    Airbnb
                  </Checkbox>
                  <Checkbox
                    value="Extended Stay"
                    onChange={() =>
                      handleInputChange("accommodations", "Extended Stay")
                    }
                  >
                    Extended Stay
                  </Checkbox>
                  <Checkbox
                    value="Corporate Housing"
                    onChange={() =>
                      handleInputChange("accommodations", "Corporate Housing")
                    }
                  >
                    Corporate Housing
                  </Checkbox>
                  <Checkbox
                    value="Other"
                    onChange={() =>
                      handleInputChange("accommodations", "Other")
                    }
                  >
                    Other
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>
            <FormControl mb="4" isRequired>
              <FormLabel mb="4">
                How would you rate the surrounding area in the category of
                safety?
              </FormLabel>
              <RadioGroup value={formik.values.safety} mb="6">
                <Stack spacing={4} mb="4" direction="row">
                  <Radio
                    value="1"
                    onChange={() => {
                      handleInputChange("safety", "1");
                    }}
                  >
                    1
                  </Radio>
                  <Radio
                    value="2"
                    onChange={() => {
                      handleInputChange("safety", "2");
                    }}
                  >
                    2
                  </Radio>
                  <Radio
                    value="3"
                    onChange={() => {
                      handleInputChange("safety", "3");
                    }}
                  >
                    3
                  </Radio>
                  <Radio
                    value="4"
                    onChange={() => {
                      handleInputChange("safety", "4");
                    }}
                  >
                    4
                  </Radio>
                  <Radio
                    value="5"
                    onChange={() => {
                      handleInputChange("safety", "5");
                    }}
                  >
                    5
                  </Radio>
                  <Radio
                    value="6"
                    onChange={() => {
                      handleInputChange("safety", "6");
                    }}
                  >
                    6
                  </Radio>
                  <Radio
                    value="7"
                    onChange={() => {
                      handleInputChange("safety", "7");
                    }}
                  >
                    7
                  </Radio>
                  <Radio
                    value="8"
                    onChange={() => {
                      handleInputChange("safety", "8");
                    }}
                  >
                    8
                  </Radio>
                  <Radio
                    value="9"
                    onChange={() => {
                      handleInputChange("safety", "9");
                    }}
                  >
                    9
                  </Radio>
                  <Radio
                    value="10"
                    onChange={() => {
                      handleInputChange("safety", "10");
                    }}
                  >
                    10
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl mb="8" isRequired>
              <FormLabel>What was the parking situation?</FormLabel>
              <RadioGroup value={formik.values.parking}>
                <Stack spacing={4} mb="4" direction="row">
                  <Radio
                    value="Free"
                    onChange={() => {
                      handleInputChange("parking", "Free");
                    }}
                  >
                    Free
                  </Radio>
                  <Radio
                    value="Paid/reimbursed"
                    onChange={() => {
                      handleInputChange("parking", "Paid/reimbursed");
                    }}
                  >
                    Paid/reimbursed
                  </Radio>
                  <Radio
                    value="RN pays for parking/not reimbursed"
                    onChange={() => {
                      handleInputChange(
                        "parking",
                        "RN pays for parking/not reimbursed"
                      );
                    }}
                  >
                    RN Pays for parking/not reimbursed
                  </Radio>
                  <Radio
                    value="other"
                    onChange={() => {
                      handleInputChange("parking", "other");
                    }}
                  >
                    Other
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Overall Rating</FormLabel>
              <RadioGroup value={formik.values.overallScore}>
                <Stack spacing={4} mb="12" direction="row">
                  <Radio
                    value={1}
                    onChange={() => {
                      handleInputChange("overallScore", 1);
                    }}
                  >
                    1
                  </Radio>
                  <Radio
                    value={2}
                    onChange={() => {
                      handleInputChange("overallScore", 2);
                    }}
                  >
                    2
                  </Radio>
                  <Radio
                    value={3}
                    onChange={() => {
                      handleInputChange("overallScore", 3);
                    }}
                  >
                    3
                  </Radio>
                  <Radio
                    value={4}
                    onChange={() => {
                      handleInputChange("overallScore", 4);
                    }}
                  >
                    4
                  </Radio>
                  <Radio
                    value={5}
                    onChange={() => {
                      handleInputChange("overallScore", 5);
                    }}
                  >
                    5
                  </Radio>
                  <Radio
                    value={6}
                    onChange={() => {
                      handleInputChange("overallScore", 6);
                    }}
                  >
                    6
                  </Radio>
                  <Radio
                    value={7}
                    onChange={() => {
                      handleInputChange("overallScore", 7);
                    }}
                  >
                    7
                  </Radio>
                  <Radio
                    value={8}
                    onChange={() => {
                      handleInputChange("overallScore", 8);
                    }}
                  >
                    8
                  </Radio>
                  <Radio
                    value={9}
                    onChange={() => {
                      handleInputChange("overallScore", 9);
                    }}
                  >
                    9
                  </Radio>
                  <Radio
                    value={10}
                    onChange={() => {
                      handleInputChange("overallScore", 10);
                    }}
                  >
                    10
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Comments</FormLabel>
              <Box pb="3" mb="2">
                <Box style={{ color: "red" }}>
                  <Text as="i">
                    {formik.errors.text ? formik.errors.text : null}
                  </Text>
                </Box>
                <Textarea
                  type="text"
                  name="text"
                  value={formik.values.text}
                  onChange={formik.handleChange}
                  placeholder="Leave a comment about your experience."
                ></Textarea>
              </Box>
            </FormControl>
            <Button colorScheme="teal" type="submit">
              Submit
            </Button>
            <Modal size="lg" isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader display="flex" justifyContent="center">
                  Sending Review
                </ModalHeader>
                <ModalBody pb="10" display="flex" justifyContent="center">
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                </ModalBody>
              </ModalContent>
            </Modal>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default EvalForm;
