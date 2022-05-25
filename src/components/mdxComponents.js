import * as React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import darkTheme from "prism-react-renderer/themes/vsDark";
import lightTheme from "prism-react-renderer/themes/vsLight";

import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";

//Paragraph styles

const StyledP = styled.p`
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
`;

export const P = ({ children }) => <StyledP>{children}</StyledP>;

//Headings styles

const StyledH1 = styled.h1``;

const StyledH2 = styled.h2`
  margin-top: 3.5rem;
  margin-bottom: 1.5rem;
  color: var(--color-main);
`;

const StyledH3 = styled.h3`
  margin-top: 3rem;
  margin-bottom: 1rem;
`;

export const H1 = ({ children }) => <StyledH1>{children}</StyledH1>;
export const H2 = ({ children }) => <StyledH2>{children}</StyledH2>;
export const H3 = ({ children }) => <StyledH3>{children}</StyledH3>;

//List styles

const StyledUL = styled.ul`
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
  list-style-type: none;
  padding-left: 1rem;
`;

const StyledLI = styled.li`
  margin-bottom: 1rem;

  &::before {
    content: "◉";
    color: var(--color-main);
    font-weight; bold;
    display: inline-block;
    width: 1.125rem;
    margin-left: -1rem;
  }
`;

export const UL = ({ children }) => <StyledUL>{children}</StyledUL>;
export const LI = ({ children }) => <StyledLI>{children}</StyledLI>;

//Link styles

const StyledA = styled.a`
  color: var(--color-main);
  cursor: pointer;

  &:visited {
    color: ${(props) => props.theme.fontColor};
  }

  &:hover {
    border-bottom: 3px solid var(--color-main);
  }
`;

export const A = ({ children }) => <StyledA>{children}</StyledA>

//Block quote styles

const StyledBlockQuote = styled.blockquote`
  background-color: var(--color-background-gray);
  border-radius: 0px 10px 10px 0px;
  border-left: 3px solid var(--color-main);
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 2rem 1rem;
`;

export const BlockQuote = ({ children }) => (
  <StyledBlockQuote>{children}</StyledBlockQuote>
);

//Code and inline-code styles

const StyledCode = styled.code`
  background-color: ${(props) => props.theme.backgroundSecondary};
  border-radius: 5px;
  font-family: var(--font-code);
`;

export const InlineCode = (props) => <StyledCode {...props}></StyledCode>;

const StyledPre = styled.pre`
  padding: 2rem 1rem;
  border-radius: 10px;
  font-size: 1rem;
  position: relative;
  margin-bottom: 1rem;
  font-family: var(--font-code);
  overflow-x: auto;

  @media(min-width: 35em) {
    padding: 2rem;
  }
`;

const Tag = styled.span`
  position: absolute;
  right: 1rem;
  top: 0.125rem;
  color: ${(props) => props.theme.fontColorSecondary};
  opacity: 0.25;
  user-select: none;

  @media(min-width: 35em) {
    right: 2rem;
  }
`;

export const CodeBlock = ({ children, className }) => {
  const language = className.replace(/language-/, "") || "";

  return (
    <UserContext.Consumer>
      {(context) => (
        <Highlight
          {...defaultProps}
          code={children.trim()}
          language={language}
          theme={context.isDark ? darkTheme : lightTheme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <StyledPre className={className} style={style}>
              <Tag>{language}</Tag>
              {tokens.map((line, index) => {
                const lineProps = getLineProps({ line, key: index });
                return (
                  <div key={index} {...lineProps}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                );
              })}
            </StyledPre>
          )}
        </Highlight>
      )}
    </UserContext.Consumer>
  );
};
