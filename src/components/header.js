import * as React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import SunIcon from "../images/icons/sunny.svg";
import NavButtonItem from "./navButtonItem";
import ListItem from "./navListItem";

const StyledHeader = styled.header`
width: 100%;
margin: 2rem auto;
max-width: 1100px;
height: auto;
backdrop-filter: blur(0.3rem);
position: sticky;
top: 0;

@media(max-width: 768px) {
  margin: 0 auto;
}
`;

const NavContainer = styled.div`
display: flex;
justify-content: flex-start;
align-items: baseline;
padding: 0 1rem;
gap: 2rem;
`;

const NavList = styled.ul`
display: flex;
list-style-type: none;
gap: 1rem;
padding: 0;
`;

const StyledLogoLink = styled((props) => <Link {...props} />)`
text-decoration: none;
color: var(--text-color);
font-weight: 800;
font-size: 1.5rem;
`;

const NavRight = styled.div`
display: flex;
justify-content: space-between;
gap: 1rem;
flex-grow: 1;
`;

const Dot = styled.em`
color: var(--color-main);
font-size: 2rem;
font-style: normal;
`;

const Header = () => {
  return (
    <StyledHeader>
      <NavContainer>
        <StyledLogoLink to="/">
          dim<Dot>.</Dot>anis
        </StyledLogoLink>
        <NavRight>
          <nav>
            <NavList>
              <ListItem to="/" name="Latest" />
              <ListItem to="/blog" name="Blog" />
              <ListItem to="/projects" name="Projects" />
            </NavList>
          </nav>
          <NavButtonItem icon={SunIcon} alt="theme toggle" />
        </NavRight>
      </NavContainer>
    </StyledHeader>
  );
};

export default Header;