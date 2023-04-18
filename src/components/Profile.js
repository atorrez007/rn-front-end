import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Avatar, Box, Text, Wrap, WrapItem } from "@chakra-ui/react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Box mt="5" ml="2">
        <Wrap>
          <WrapItem>
            <Avatar name={user.name} src={user.picture} size="lg"></Avatar>
          </WrapItem>
        </Wrap>
        <Text>
          Hi, <br></br>
          <strong>{user.name}</strong>
        </Text>
      </Box>

      // <div>
      //   <h2>{user.name}</h2>
      //   <img src={user.picture} alt={user.name} />
      //   <p>{user.email}</p>
      // </div>
    )
  );
};

export default Profile;
