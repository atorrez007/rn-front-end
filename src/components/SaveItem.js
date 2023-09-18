import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Icon, useToast } from "@chakra-ui/react";

export default function SaveItem({ handleSave, handleUnsave, isLiked }) {
  const styleLiked = { color: "red", fontSize: "1.2em" };
  const styleUnliked = { fontSize: "1.2em" };
  const [isClick, setClick] = useState(isLiked);
  const toast = useToast();
  useEffect(() => {
    setClick(isLiked);
  }, [isLiked]);

  const setLike = () => {
    if (!isClick) {
      try {
        handleSave();
        toast({
          position: "top",
          title: "Save Hospital",
          description: "Hospital Saved to Favorites!",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
      }
    }
    setClick(!isClick);
  };

  const setUnlike = () => {
    handleUnsave();
    setClick(!isClick);
  };
  return (
    <div className="App">
      <button>
        {isClick ? (
          <Icon as={FaHeart} onClick={setUnlike} style={styleLiked} />
        ) : (
          <Icon as={FaRegHeart} onClick={setLike} style={styleUnliked} />
        )}
      </button>
    </div>
  );
}
