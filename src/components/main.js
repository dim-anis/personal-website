import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 0 auto;
  width: 100%;
  max-width: 1100px;
  padding-block: min(10vh, 10rem);
  padding-left: 1rem;
  padding-right: 1rem;
  gap: 1rem;

  @media(max-width: 895px) {
    display: flex;
    flex-direction: column;
  }
`;

const StyledH1 = styled.h1`
  grid-column: 1 / -1;
`;

const Main = ({children, title}) => {
  return (
      <Container>
        <StyledH1>{title}</StyledH1>
        {children}
      </Container>
  )
}

export default Main;
