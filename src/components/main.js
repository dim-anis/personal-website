import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1100px;
  padding-block: min(10vh, 10rem);
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Main = ({children, title}) => {
  return (
    <Container>
      <h1>{title}</h1>
      {children}
    </Container>
  )
}

export default Main;
