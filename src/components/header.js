import * as React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import SunIcon from "../images/icons/sunny.svg";
import MoonIcon from "../images/icons/moon.svg";
import MenuIcon from "../images/icons/menu-outline.svg";
import CloseIcon from "../images/icons/close-outline.svg";
import NavButtonItem from "./navButtonItem";
import ListItem from "./navListItem";

import { ThemeContext } from "../contexts/ThemeContext";

const StyledHeader = styled.header`
width: 100%;
margin: 2rem auto;
max-width: 1100px;
background: var(--color-background);
opacity: 0.9;
backdrop-filter: blur(0.5rem);
height: auto;
position: sticky;
top: 0;
z-index: 10;

@media(max-width: 768px) {
  margin: 0 auto;
}
`;

const NavContainer = styled.div`
height: auto;
display: flex;
justify-content: flex-start;
align-items: baseline;
padding: 0 1rem;
gap: 3rem;
position: relative;
`;

const NavList = styled.ul`
display: flex;
list-style-type: none;
padding: 0;
gap: 1rem;

@media(max-width: 35em) {
  flex-direction: column;
  gap: 1.5rem;
}
`;

const StyledLogoLink = styled((props) => <Link {...props} />)`
text-decoration: none;
color: var(--color-text);
font-weight: 700;
font-size: 1.5rem;
padding: 0;
`;

const NavRight = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
flex-grow: 1;

@media(max-width: 35em) {
  position: fixed;
  font-size: 1.5rem;
  flex-direction: column;
  height: 100vh;
  align-items: flex-start;
  justify-content: flex-start;
  inset: 0 0 0 35%;
  background: var(--color-background);
  padding: min(30vh, 10rem) 2em;
  gap: 5rem;
  transform: ${props => props.open ? "translateX(0%)" : "translateX(100%)"};
  transition: ${props => props.open ? "transform 350ms ease-out" : "transform 350ms ease-in"};
}
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Dot = styled.em`
color: var(--color-primary);
font-size: 2rem;
font-style: normal;
`;

const NavToggle = styled.button`
  position: absolute;
  padding: 0;
  width: 2rem;
  aspect-ratio: 1;
  top: 0.75rem;
  right: 1rem;
  z-index: 100;
  border: 0;
  background: transparent;
  display: none;
  cursor: pointer;
  color: var(--color-text);

  &:hover {
    color: var(--color-text);
  }

  @media(max-width: 35em) {
    display: block;
  }
`;

const Header = ({ pageTitle }) => {

  const [open, setOpen] = React.useState(undefined);
  const { isDark, toggleTheme } = React.useContext(ThemeContext);
  
  return (
    <StyledHeader>
      <NavContainer>
        <LogoContainer>
          <StyledLogoLink to="/">
            dim<Dot>.</Dot>anis
          </StyledLogoLink>
        </LogoContainer>
        <NavToggle open={open} onClick={() => setOpen(prev => !prev)}>
          {open ? <CloseIcon /> : <MenuIcon />}
        </NavToggle>
        <NavRight open={open}>
          <nav>
            <NavList>
              <ListItem to="/" name="Latest" highlight={pageTitle.toLowerCase() === "latest" ? true : false} />
              <ListItem to="/blog" name="Blog" highlight={pageTitle.toLowerCase() ===  "blog" ? true : false} />
              <ListItem to="/projects" name="Projects" highlight={pageTitle.toLowerCase() === "projects" ? true : false} />
            </NavList>
          </nav>
          {isDark !== "undefined" &&
            <NavButtonItem 
            icon={ isDark ? <SunIcon /> : <MoonIcon /> } 
            handleClick={ () => toggleTheme() } />
          }
        </NavRight>
      </NavContainer>
    </StyledHeader>
  );
};

export default Header;