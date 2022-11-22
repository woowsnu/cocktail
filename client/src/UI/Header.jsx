import { useState } from "react";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Search from "../pages/search/Search";

const Header = () => {
  // const { pathname } = useLocation();
  // const isSearch = pathname.includes("search") ? "none" : "flex";
  const [searchView, setSearchView] = useState(false);

  const handleOpenSearch = () => {
    setSearchView(!searchView);
  };

  return (
    <Container>
    {/* <Container style={{ display: isSearch }}> */}
      <Logo>Today's Cocktail</Logo>
      <Util>
        <AiOutlineSearch onClick={handleOpenSearch} />
        <AiOutlineMenu />
      </Util>
      {searchView ? <Search onClose={()=>{setSearchView(false)}}/> : ""}
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

  & :last-child {
    margin-left: 0.6rem;
  }
`;
