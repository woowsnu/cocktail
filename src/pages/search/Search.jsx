import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../UI/Modal";
import { highlightText } from "../../utils/highlightText";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";

const Search = (props) => {
  const navigate = useNavigate();
  const [enteredKeyword, setEnteredKeyword] = useState("");
  const [keywordArr, setKeywordArr] = useState(null);
  const [isUnvalid, setIsUnvalid] = useState(false);

  useEffect(() => {
    if (enteredKeyword.trim().length === 0) {
      setKeywordArr(null);
      return;
    }
    const debounce = setTimeout(async () => {
      const result = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${enteredKeyword}`
      )
        .then((res) => res.json())
        .then((data) => data.drinks);
      const array = result.slice(0, 10);
      setKeywordArr(null);
      setKeywordArr(array);
    }, 200);

    return () => {
      clearTimeout(debounce);
    };
  }, [enteredKeyword]);

  const handleKeyword = (e) => {
    setEnteredKeyword(e.target.value);
    if (e.target.value.trim().length > 0) {
      setIsUnvalid(false);
    }
    if (e.target.value.trim().length === 0) {
      setKeywordArr(null);
    }
  };

  const handleKeywordSearch = (keyword) => {
    navigate(`/search/${keyword}`);
    props.onClose();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (isUnvalid) {
      setIsUnvalid(true);
      console.log("dkr!!");
      return;
    }
    if (!isUnvalid) {
      navigate(`/search/${enteredKeyword}`);
      props.onClose();
    }
  };

  return (
    <Modal>
      <Container>
        <Wrap>
          <Btn>
            <AiOutlineClose onClick={props.onClose} />
          </Btn>
          <SearchBar onSubmit={handleSearch}>
            <input
              type="text"
              onChange={handleKeyword}
              value={enteredKeyword}
            />
            <button type="submit">
              <AiOutlineSearch style={{ fontSize: "2rem" }} />
            </button>
            {keywordArr?.length > 0 && (
              <SearchKeyword>
                {keywordArr?.map((keyword) => (
                  <li
                    key={keyword.idDrink}
                    onClick={() => {
                      handleKeywordSearch(keyword.strDrink);
                    }}
                  >
                    {highlightText(keyword.strDrink, enteredKeyword)}
                  </li>
                ))}
              </SearchKeyword>
            )}
          </SearchBar>
          {isUnvalid ? <div>검색어를 입력하세요.</div> : ""}
        </Wrap>
      </Container>
    </Modal>
  );
};

export default Search;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 2rem 0;
`;

const Wrap = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 0 auto;

  @media only screen and (min-width: 360px) and (max-width: 768px) {
    padding: 0 0.6rem;
  }
`;

const Btn = styled.button`
  display: flex;
  padding: 0;
  border: 0;
  font-size: 2rem;
  background-color: transparent;
`;

const SearchBar = styled.form`
  position: relative;
  margin-top: 10vh;

  input {
    width: 600px;
    height: 40px;
    font-size: 2rem;
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

  @media only screen and (min-width: 360px) and (max-width: 768px) {
    margin-top: 8vh;

    input {
      width: 100%;
      height: 40px;
      font-size: 2rem;
      border-bottom: 2px solid #000;
    }
  }
`;

const SearchKeyword = styled.ul`
  width: 100%;

  li {
    font-size: 1.2rem;
    padding-top: 0.8rem;
    color: #999;
  }

  li:hover {
    cursor: pointer;
    color: #101b45;
    font-weight: 700;
  }
`;
