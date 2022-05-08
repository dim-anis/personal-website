import * as React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const StyledLink = styled((props) => <Link {...props} />)`
  text-decoration: none;
  color: var(--color-text);
  font-weight: 600;
  border: 1px solid var(--color-text);
  padding: .5rem;
  transition: all 350ms ease-out;

  &:hover {
    background-color: var(--color-text);
    color: var(--color-text-white);
  }
`;

const StyledMain = styled.main`
  height: 100vh;
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
`;

const StyledH1 = styled.h1`
  font-size: 10rem;
  margin-top: 5rem;
`;

const StyledSpan = styled.span`
  display: block;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const NotFoundPage = () => {
  return (
    <StyledMain>
      <title>Not found</title>
      <StyledH1>404 <StyledSpan>Page not found</StyledSpan></StyledH1>
      <p>
        <StyledLink to="/">Go home</StyledLink>
      </p>
    </StyledMain>
  )
}

export default NotFoundPage;
