import * as React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const FooterStyled = styled.footer`
  width: 100%;
  background-color: var(--color-main);
  bottom: 0;
`;
const Container = styled.div`
  display: flex;
  max-width: 1100px;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 1rem;
  margin: 0 auto;
`;

const StyledLink = styled((props) => <Link {...props} />)`
  color: var(--color-text-white);
  text-decoration: none;
`;
const Footer = () => {
  return (
    <FooterStyled>
      <Container>
        <StyledLink to="/">Link 1</StyledLink>
        <StyledLink to="/">Link 2</StyledLink>
        <StyledLink to="/">Link 3</StyledLink>
      </Container>
    </FooterStyled>
  )
}  
export default Footer;
