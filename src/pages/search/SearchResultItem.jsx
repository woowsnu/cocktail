import { Link } from "react-router-dom";
import styled from "styled-components";

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

  return (
    <Link to={`/cocktail/${idDrink}`} key={props.idDrink}>
      <Li>
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
      </Li>
    </Link>
  );
};

export default SearchResultItem;

const Li = styled.li`
  display: flex;
  background-color: #fff;
  border-bottom: 1px solid #999;
  img {
    width: 150px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
`;

