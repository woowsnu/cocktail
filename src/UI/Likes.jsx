import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import styled from "styled-components";

const Likes = ({ id, isLiked, listUpdate }) => {
  const [presentLike, setPresentLike] = useState(isLiked);

  useEffect(() => {
    const likeList = JSON.parse(localStorage.getItem("likes"));
    if (likeList && likeList.includes(id)) {
      setPresentLike(true);
    }
  }, [id, setPresentLike]);

  const handleLikes = () => {
    let likeList = localStorage.getItem("likes");
    if (!presentLike) {
      if (!likeList) {
        const newArr = [id];
        localStorage.setItem("likes", JSON.stringify(newArr));
        setPresentLike(true);
        return;
      }
      if (likeList) {
        let parseArr = JSON.parse(likeList);
        if (parseArr.includes(id)) {
          console.log("이미 추가된 아이디입니다.");
          return;
        }
        parseArr.push(id);
        localStorage.setItem("likes", JSON.stringify(parseArr));
        setPresentLike(true);
      }
      return;
    }

    if (presentLike) {
      console.log("삭제로직");
      let parseArr = JSON.parse(likeList);
      const newArr = parseArr.filter((check) => check !== id);
      localStorage.setItem("likes", JSON.stringify(newArr));
      setPresentLike(false);
      listUpdate();
    }
  };
  return (
    <>
      {presentLike ? (
        <Like>
          <AiFillHeart onClick={handleLikes} style={{ color: "#f84848" }} />
        </Like>
      ) : (
        <Like>
          <AiOutlineHeart onClick={handleLikes} />
        </Like>
      )}
    </>
  );
};

export default Likes;

const Like = styled.span`
  font-size: 1.8rem;
  color: #101b45;
  padding-left: 0.6rem;
  cursor: pointer;
`;
