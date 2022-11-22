import * as ReactDOM from 'react-dom';
import styled from "styled-components";

const ModalOverlay = (props) => {
  return (
    <ModalContainer>{props.children}</ModalContainer>
  );
};

const Modal = (props) => {
  const container = document.getElementById("modal-root");
  return ReactDOM.createPortal(
    <ModalOverlay>{props.children}</ModalOverlay>,
    container
  );
};
export default Modal;

const ModalContainer = styled.div`
  position: fixed;
  z-index: 1000;
  background-color: #fff;
  opacity: 0.98;
`;
