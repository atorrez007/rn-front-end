import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Text,
  Wrap,
  WrapItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  AvatarBadge,
} from "@chakra-ui/react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    isAuthenticated && (
      <Box mt="5" ml="2">
        <Wrap>
          <WrapItem>
            <Avatar name={user.name} src={user.picture} size="lg"></Avatar>
            {/* <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    isActive={isOpen}
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                  >
                    {isOpen ? "Close" : "Open"}
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        alert("logout");
                      }}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu> */}
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
