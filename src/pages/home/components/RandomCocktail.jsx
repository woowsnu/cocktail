import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { AiOutlineRetweet, AiOutlineShareAlt } from "react-icons/ai";
import styled from "styled-components";
import Skeleton from "../../../UI/Skeleton";
import Likes from "../../../UI/Likes";

const RANDOM_COCKTAIL = gql`
  query randomCocktial {
    randomCocktail {
      idDrink
      strDrink
      strCategory
      strAlcoholic
      strDrinkThumb
      strInstructions
      strIngredient1
      strIngredient2
      strIngredient3
      strIngredient4
      strIngredient5
      strGlass
    }
  }
`;

const RandomCocktail = () => {
  const [presentLike, setPresentLike] = useState(false);
  const { data, loading, error } = useQuery(RANDOM_COCKTAIL);
  const randomData = data?.randomCocktail[0];

  useEffect(() => {
    let likeList = localStorage.getItem("likes");
    if (likeList && likeList.includes(randomData?.idDrink)) {
      setPresentLike(true);
    }
  }, [setPresentLike, randomData?.idDrink]);

  const handleRetry = () => {
    window.location.reload();
  };

  const handleShare = () => {
    const url = `https://cocktail-pied.vercel.app/cocktail/${randomData?.idDrink}`;
    if (navigator.share) {
      navigator.share({
        title: "Today's Cocktail",
        text: "아갓시 눈동자에 치얼쓰",
        url: url,
      });
    } else {
      alert("공유하기가 지원되지 않는 환경 입니다.");
    }
  };

  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
        <Container>
          <Img
            src={data?.randomCocktail[0].strDrinkThumb}
            alt={data?.randomCocktail[0].strDrink}
          />
          <Info>
            <BtnWrap>
              <AiOutlineRetweet onClick={handleRetry} />
              <div
                onClick={() => {
                  handleShare();
                }}
              >
                <AiOutlineShareAlt />
              </div>
              <Likes id={randomData?.idDrink} isLiked={presentLike} />
            </BtnWrap>
            <h1>{data?.randomCocktail[0].strDrink}</h1>
            <h2>{data?.randomCocktail[0].strInstructions}</h2>
            <List>
              <h3>category</h3>
              <p>{data?.randomCocktail[0].strCategory}</p>
            </List>
            <List>
              <h3>alcoholic</h3>
              <p>{data?.randomCocktail[0].strAlcoholic}</p>
            </List>
            <List>
              <h3>Ingredient</h3>
              <p>
                <span>{data?.randomCocktail[0].strIngredient1}</span>
                <span>{data?.randomCocktail[0].strIngredient2}</span>
                <span>{data?.randomCocktail[0].strIngredient3}</span>
                <span>{data?.randomCocktail[0].strIngredient4}</span>
                <span>{data?.randomCocktail[0].strIngredient5}</span>
              </p>
            </List>
            <List>
              <h3>glass</h3>
              <p>{data?.randomCocktail[0].strGlass}</p>
            </List>
          </Info>
        </Container>
      )}
    </>
  );
};

export default RandomCocktail;

const Container = styled.div`
  max-width: 960px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin: 0 auto;
  padding-top: 3rem;

  @media only screen and (min-width: 360px) and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    padding-top: 0;
  }
`;

const Img = styled.img`
  max-width: 40%;
  height: 600px;
  overflow: hidden;
  object-fit: cover;

  @media only screen and (min-width: 360px) and (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    height: auto;
  }
`;
const Info = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 60%;
  padding-left: 2rem;
  color: #101b45;

  h1 {
    padding-bottom: 1.2rem;
    color: #101b45;
    font-size: 3rem;
    font-weight: 800;
  }

  h2 {
    padding-bottom: 1rem;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: -0.3px;
    line-height: 1.2;
  }

  @media only screen and (min-width: 360px) and (max-width: 768px) {
    box-sizing: border-box;
    justify-content: flex-start;
    width: 100%;
    padding: 0.6rem;

    h1 {
      padding-bottom: 1.2rem;
      color: #101b45;
      font-size: 2.2rem;
      font-weight: 800;
    }
  }
`;

const BtnWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.8rem;

  div {
    display: none;
  }

  @media only screen and (min-width: 360px) and (max-width: 768px) {
    position: relative;
    display: flex;
    justify-content: flex-end;

    div {
      display: block;
      font-size: 1.8rem;
      padding-left: 0.6rem;
    }
  }
`;

const List = styled.div`
  padding: 1rem 0;
  border-top: 1px solid #ddd;

  h3 {
    color: #101b45;
    padding-bottom: 0.6rem;
  }

  p {
    color: #999;
  }

  @media only screen and (min-width: 360px) and (max-width: 768px) {
    p {
      word-break: break-all;
    }
  }
`;
