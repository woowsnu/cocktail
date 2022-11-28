
# Today's Cocktail 🍸

- 랜덤 칵테일을 추천받고, 칵테일 정보를 검색할 수 있는 서비스
- 사용 api : https://www.thecocktaildb.com/api.php
- 개인프로젝트 | 2022.11.20~ (진행중) 

<br>

## 배포 링크

- [링크🍹](https://cocktail-pied.vercel.app/)

<br>

## 목차
- [기술스택](#기술-스택)
- [와이어프레임](#와이어프레임)
- [실행방법](#실행방법)
- [프로젝트 구조](#프로젝트-구조)
- [구현내용](#구현기능)

<br>

## 기술 스택

- JavaScript, React(CRA)

- styled-components, React-icons

- graphql, apollo client

<br>

## 와이어프레임
<img width="889" alt="Screen Shot 2022-11-28 at 12 04 30 PM" src="https://user-images.githubusercontent.com/105709187/204182729-4fc3486c-0057-4bc9-ae1e-86bae6c1e92b.png">


<br>

## 실행방법

1. Install

```bash
 $ yarn install
```
2. start the project

```
 $ yarn start
```

<br>

## 프로젝트 구조
```
📦src
 ┣ 📂UI
 ┃ ┣ 📜Header.jsx
 ┃ ┣ 📜Layout.jsx
 ┃ ┣ 📜Likes.jsx
 ┃ ┣ 📜Loading.jsx
 ┃ ┣ 📜Modal.jsx
 ┃ ┣ 📜Pagination.jsx
 ┃ ┗ 📜Skeleton.jsx
 ┣ 📂pages
 ┃ ┣ 📂cocktails
 ┃ ┃ ┣ 📜Cocktail.jsx
 ┃ ┃ ┗ 📜Cocktails.jsx
 ┃ ┣ 📂home
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┗ 📜RandomCocktail.jsx
 ┃ ┃ ┗ 📜Home.jsx
 ┃ ┣ 📂myCocktail
 ┃ ┃ ┗ 📜MyCocktail.jsx
 ┃ ┗ 📂search
 ┃ ┃ ┣ 📜Search.jsx
 ┃ ┃ ┣ 📜SearchResult.jsx
 ┃ ┃ ┗ 📜SearchResultItem.jsx
 ┣ 📂utils
 ┃ ┣ 📜highlightText.js
 ┣ 📜App.js
 ┣ 📜client.js
 ┣ 📜index.css
 ┗ 📜index.js
```
<br>

## 구현내용

**[공통]**
  - 필요한 데이터만 사용하기 위해 Rest API 를 graphql로 마이그레이션
  - apollo client 의 useQuery hook을 사용해 loading, error 처리
  - loading 시 스켈레톤, 스피너 UI 적용
  - 반응형 미디어 쿼리 적용
  - 하트 버튼 클릭 시 localStorage에 cocktail id 저장
 
**[메인페이지]**
  - 랜덤 칵테일 api의 데이터를 query해 화면 노출
  - retry 버튼 클릭 시 페이지 새로고침되며 새로운 랜덤 칵테일 정보로 화면 업데이트
  - 하트 클릭 시 My Cocktail 에 추가, 제거됨

**[검색 화면]**
  - 키워드 입력 시 검색바 하단에 추천 검색어 표시 (키워드가 포함된 칵테일 이름)
  - 추천 검색어에 입력된 키워드와 일치하는 부분 볼드 처리
  - 추천 검색어 클릭 시 해당 키워드의 검색결과로 이동
	  - **이슈** 
		  - 검색어 입력되지 않을 시 return 처리가 제대로 적용되지 않아 수정 필요
	  - **To-Be**
		  - 키보드로 추천 검색어로 이동되도록 처리

**[칵테일 리스트 페이지 - 검색 결과 화면&MyCocktail ]** 
  - 검색결과 7개마다 페이지네이션 적용
  - 리스트 우측의 하트 클릭 시 MyCocktail에 추가, 제거됨
