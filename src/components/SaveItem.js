import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Icon } from "@chakra-ui/react";

export default function SaveItem({ handleSave, handleUnsave, isLiked }) {
  const styleLiked = { color: "red", fontSize: "1.2em" };
  const styleUnliked = { fontSize: "1.2em" };
  const [isClick, setClick] = useState(isLiked);

  const setLike = () => {
    if (!isClick) {
      handleSave();
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
