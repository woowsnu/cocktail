import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Pagination from "../../UI/Pagination";
import SearchResultItem from "./SearchResultItem";

const COCKTAILS_BY_NAME = gql`
  query getCocktailsByName($name: String!) {
    getCocktailsByName(name: $name) {
      idDrink
      strCategory
      strAlcoholic
      strDrink
      strDrinkThumb
      strIngredient1
      strIngredient2
      strIngredient3
      strIngredient4
      strIngredient5
    }
  }
`;

const SearchResult = () => {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const [enteredKeyword, setEnteredKeyword] = useState(keyword);
  const [isUnvalid, setIsUnvalid] = useState(false);
  const [isResearch, setIsResearch] = useState(false);
  const [limit, setLimit] = useState(7);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const { data, loading, error } = useQuery(COCKTAILS_BY_NAME, {
    variables: { name: keyword },
  });

  const handleKeyword = (e) => {
    setEnteredKeyword(e.target.value);
  };

  const handleDeleteKeyword = (e) => {
    e.preventDefault();
    setEnteredKeyword("");
    setIsResearch(!isResearch);
  };

  const handleSearch = () => {
    if (enteredKeyword.trim() === 0) {
      setIsUnvalid(true);
      return;
    }
    if (!isUnvalid) {
      navigate(`/search/${enteredKeyword}`);
      setIsResearch(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  return (
    <Container>
      <SearchBar>
        <input type="text" onChange={handleKeyword} value={enteredKeyword} />
        {!isResearch ? (
          <button onClick={handleDeleteKeyword}>
            <AiOutlineClose style={{ fontSize: "2rem" }} />
          </button>
        ) : (
          <button onClick={handleSearch}>
            <AiOutlineSearch style={{ fontSize: "2rem" }} />
          </button>
        )}
      </SearchBar>
      <Ul>
        {data?.getCocktailsByName
          ?.slice(offset, offset + limit)
          .map((cocktail) => (
            <SearchResultItem key={cocktail.idDrink} cocktail={cocktail} />
          ))}
      </Ul>
      <PageWrap>
        <Pagination
          total={data?.getCocktailsByName?.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </PageWrap>
    </Container>
  );
};

export default SearchResult;

const Container = styled.div`
  width: 100%;
  padding-top: 2rem;
`;

const SearchBar = styled.form`
  position: relative;
  width: 500px;
  margin: 0 auto;
  padding-bottom: 3rem;

  input {
    width: 500px;
    height: 40px;
    font-size: 2rem;
    background-color: transparent;
    border-bottom: 2px solid #000;
  }

  button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.4rem 0;
    font-size: 2rem;
    font-weight: 800;
  }
`;

const Ul = styled.ul`
  max-width: 960px;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

const PageWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 2rem 0;
`;
