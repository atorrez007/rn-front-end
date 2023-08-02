import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Icon } from "@chakra-ui/react";

export default function SaveItem({ handleSave }) {
  const styleLiked = { color: "red", fontSize: "1.2em" };
  const styleUnliked = { fontSize: "1.2em" };
  const [isClick, setClick] = useState(false);
  const setLike = () => {
    handleSave();
    setClick(!isClick);
  };
  return (
    <div className="App">
      <button>
        {isClick ? (
          <Icon as={FaHeart} onClick={setLike} style={styleLiked} />
        ) : (
          <Icon as={FaRegHeart} onClick={setLike} style={styleUnliked} />
        )}
      </button>
    </div>
  );
}
