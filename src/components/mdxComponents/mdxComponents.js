import * as React from "react";

import styled from "styled-components";

//Paragraph styles

const StyledP = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
`;

export const P = ({ children }) => <StyledP>{children}</StyledP>;

//Headings styles

const StyledH2 = styled.h2`
  font-size: 1.9rem;
  margin-top: 3.5rem;
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.colorBrand};
`;

const StyledH3 = styled.h3`
  font-size: 1.5rem;
  margin-top: 3rem;
  margin-bottom: 1rem;
`;

export const H2 = ({ children }) => <StyledH2>{children}</StyledH2>;
export const H3 = ({ children }) => <StyledH3>{children}</StyledH3>;

//List styles

const StyledUL = styled.ul`
  margin-bottom: 2rem;
  font-size: 1.2rem;
  list-style-type: none;
  padding-left: 1rem;
`;

const StyledLI = styled.li`
  margin-bottom: 1rem;

  &::before {
    content: "◉";
    color: ${(props) => props.theme.colorBrand};
    display: inline-block;
    padding-right: 0.8rem;
  }
`;

export const UL = ({ children }) => <StyledUL>{children}</StyledUL>;
export const LI = ({ children }) => <StyledLI>{children}</StyledLI>;

//Link styles

const StyledA = styled.a`
  color: ${(props) => props.theme.colorBrand};
  outline: none;
  text-decoration: none;
  transition: border 100ms ease-in;
  cursor: pointer;

  &:hover {
    text-decoration: 2px underline solid;
    text-decoration-color: ${(props) => props.theme.colorBrand};
  }

  &:focus {
    outline: 2px solid;
    border-radius: 2px;  
    outline-color: ${(props) => props.theme.colorBrand};
  }

  &:active {
    background-color: ${(props) => props.theme.colorBrand};
    color: ${(props) => props.theme.fontColor};
  }
`;

export const A = ({ children, href, title }) => <StyledA href={href} title={title}>{children}</StyledA>;

//Block quote styles

const StyledBlockQuote = styled.blockquote`
  background-color: ${(props) => props.theme.colorBrandLight};
  border-radius: 0px 10px 10px 0px;
  border-left: 4px solid;
  border-left-color: ${(props) => props.theme.colorBrand};
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 2rem;

  p {
    margin-bottom: 0rem;
  }
`;

export const BlockQuote = ({ children }) => (
  <StyledBlockQuote>{children}</StyledBlockQuote>
);

//Inline-Code styles

const StyledCode = styled.code`
  background-color: ${(props) => props.theme.backgroundSecondary};
  border-radius: 5px;
  font-family: var(--font-code);
`;

export const InlineCode = (props) => <StyledCode {...props}></StyledCode>;
