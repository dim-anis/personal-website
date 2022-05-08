import * as React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const FooterStyled = styled.footer`
  width: 100%;
  border-top: 1px solid var(--color-background-gray);
  position: relative;
`;
const FooterInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  align-items: left;
  padding: 3rem 1rem;
  margin: 0 auto;
  gap: 2rem;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledLink = styled((props) => <Link {...props} />)`
  color: ${props => props.theme};
  text-decoration: none;
`;

const Footer = () => {
  return (
    <FooterStyled>
      <FooterInfoContainer>
        <LinkContainer>
          <h3>Links</h3>
          <StyledLink to="/">Link 1</StyledLink>
          <StyledLink to="/">Link 2</StyledLink>
          <StyledLink to="/">Link 3</StyledLink>
        </LinkContainer>
        <div>
          <p>© 2022 - present Dmitry Anisov.</p>
          <p>All rights reserved.</p>
        </div>
      </FooterInfoContainer>
    </FooterStyled>
  )
}
export default Footer;
