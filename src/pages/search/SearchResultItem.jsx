import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Likes from "../../UI/Likes";

const SearchResultItem = (props) => {
  const {
    idDrink,
    strCategory,
    strDrink,
    strDrinkThumb,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
  } = props.cocktail;
  const [presentLike, setPresentLike] = useState(props.isLiked || false);

  useEffect(() => {
    const likeList = JSON.parse(localStorage.getItem("likes"));
    if (likeList && likeList.includes(idDrink)) {
      setPresentLike(true);
    }
  }, [idDrink, setPresentLike]);

  return (
    <Li>
      <Link to={`/cocktail/${idDrink}`} key={props.idDrink}>
        <LinkWrap>
          <img src={strDrinkThumb} alt={strDrink} />
          <Info>
            <h3>{strDrink}</h3>
            <p>{strCategory}</p>
            <p>
              <span>{strIngredient1}</span>
              <span>{strIngredient2}</span>
              <span>{strIngredient3}</span>
              <span>{strIngredient4}</span>
              <span>{strIngredient5}</span>
            </p>
          </Info>
        </LinkWrap>
      </Link>
      <Likes
        id={idDrink}
        isLiked={presentLike}
        listUpdate={props.listUpdate}
      />
    </Li>
  );
};

export default SearchResultItem;

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #999;
  padding-right: 1.4rem;

  img {
    width: 150px;
  }

  @media only screen and (min-width: 360px) and (max-width: 768px) {
    padding-right: 1rem;
  
  img {
    width: 120px;
    height: 120px;
  }
  }
`;

const LinkWrap = styled.div`
  display: flex;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding-left: 1.4rem;
  color: #101b45;

  h3 {
    font-size: 2rem;
    font-weight: 800;
  }

  p {
    padding-top: 0.8rem;
  }

  span {
    font-size: 0.8rem;
    padding-right: 1rem;
    color: #999;
  }

  @media only screen and (min-width: 360px) and (max-width: 768px) {
    padding-left: 1rem;

  h3 {
    font-size: 1.4rem;
    font-weight: 800;
  }

  p {
    padding-top: 0.4rem;
  }

  span {
    display: none;
  }
  }
`;
