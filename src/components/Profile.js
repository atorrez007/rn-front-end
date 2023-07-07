import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Box, Wrap, WrapItem } from "@chakra-ui/react";

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
      </Box>
    )
  );
};

export default Profile;
