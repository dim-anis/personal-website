import * as React from "react";
import styled from "styled-components";

const Container = styled.main`
  margin: 0 auto;
  width: 100%;
  max-width: 1100px;
`;

const StyledH1 = styled.h1`
  grid-column: 1 / -1;
  font-size: 2.5rem;
`;

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding-block: min(10vh, 10rem);
  padding-left: 1rem;
  padding-right: 1rem;
  gap: 1rem;

  @media(max-width: 895px) {
    display: flex;
    flex-direction: column;
  }
`;

const Main = ({children, title}) => {
  return (
      <Container>
        <StyledSection>
          <StyledH1>{title}</StyledH1>
          {children}
        </StyledSection>
      </Container>
  )
}

export default Main;
