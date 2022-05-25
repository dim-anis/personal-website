import * as React from "react";
import styled from "styled-components";

import ListItem from "./navListItem";

const FooterStyled = styled.footer`
  width: 100%;
  border-top-style: solid;
  border-top-width: 1px;
  border-color: ${props => props.theme.backgroundSecondary};
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

const LinkContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style: none;
`;

const Footer = () => {
  return (
    <FooterStyled>
      <FooterInfoContainer>
        <LinkContainer>
          <ListItem to="/" name="Latest" />
          <ListItem to="/blog" name="Blog" />
          <ListItem to="/projects" name="Projects" />
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
