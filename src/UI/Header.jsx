import { useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Search from "../pages/search/Search";

const Header = () => {
  const navigation = useNavigate();
  const [searchView, setSearchView] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const parseArr = JSON.parse(localStorage.getItem("likes"));
    if (parseArr) {
      setLikeCount(parseArr.length);
    }
  });

  const handleOpenSearch = () => {
    setSearchView(!searchView);
  };

  const handleOpenLikes = () => {
    navigation("/myCocktail", { replace: true });
  };

  return (
    <Container>
      <Logo>
        <Link to="/">Today's Cocktail</Link>
      </Logo>
      <Util>
        <AiOutlineSearch onClick={handleOpenSearch} />
        {likeCount > 0 ? (
          <div onClick={handleOpenLikes}>
            <span>{likeCount}</span>
            <AiFillHeart style={{ color: "#f84848"}}/>
          </div>
        ) : (
          <AiOutlineHeart onClick={handleOpenLikes} style={{ color: "#f84848"}}/>
        )}
      </Util>
      {searchView ? (
        <Search
          onClose={() => {
            setSearchView(false);
          }}
        />
      ) : (
        ""
      )}
    </Container>
  );
};

export default Header;

const Container = styled.header`
  max-width: 1200px;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 1.2rem;
`;

const Logo = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  width: 3rem;
  padding: 0.6rem 1.8rem;
  border: 1px solid #333;
  border-radius: 50%;
  margin-right: auto;
  text-align: center;
`;

const Util = styled.div`
  font-size: 1.8rem;

  div {
    position: relative;
    span {
      position: absolute;
      font-size: 0.6rem;
      top: 0;
      right: 0;
      width: 16px;
      height: 16px;
      border-radius: 100%;
      background-color: #ff0000;
      color: #fff;
      text-align: center;
      line-height: 16px;
    }
  }

  & :last-child {
    margin-left: 0.6rem;
  }
`;
