import * as React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import SunIcon from "../images/icons/sunny.svg";
import MenuIcon from "../images/icons/menu-outline.svg";
import CloseIcon from "../images/icons/close-outline.svg";
import NavButtonItem from "./navButtonItem";
import ListItem from "./navListItem";

const StyledHeader = styled.header`
width: 100%;
margin: 2rem auto;
max-width: 1100px;
background: ${props => props.theme.backgroundTransparent};
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
color: ${props => props.theme.fontColor};
font-weight: 800;
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
  background: ${props => props.theme.backgroundTransparent};
  color: ${props => props.theme.menuColor};
  padding: min(30vh, 10rem) 2em;
  gap: 5rem;
  transform: ${props => props.open ? "translateX(0%)" : "translateX(100%)"};
  will-change: transform;
  transition: transform 350ms ease-out; //${props => props.open ? "transform 350ms ease-out" : "none"};
}
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Dot = styled.em`
color: ${(props) => props.theme.colorBrand};
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
  color: ${props => props.theme.fontColorSecondary};

  &:hover {
    color: ${props => props.theme.fontColor};
  }

  @media(max-width: 35em) {
    display: block;
  }
`;

const Header = () => {

  const [open, setOpen] = React.useState(false);

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
              <ListItem to="/" name="Latest" />
              <ListItem to="/blog" name="Blog" />
              <ListItem to="/projects" name="Projects" />
            </NavList>
          </nav>
          <NavButtonItem icon={<SunIcon />} alt="theme toggle" />
        </NavRight>
      </NavContainer>
    </StyledHeader>
  );
};

export default Header;