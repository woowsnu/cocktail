import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

const Layout = () => {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
};

export default Layout;

const Container = styled.section`
  width: 100%;
  max-width: 1200px;
  height: 100vh;
  margin: 0 auto;

  @media only screen and (min-width: 360px) and (max-width: 768px) {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
`;
