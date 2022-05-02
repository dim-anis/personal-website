import * as React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import vsDark from "prism-react-renderer/themes/vsDark";

import styled from "styled-components";

//Paragraph styles

const StyledP = styled.p`
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
`;

export const P = ({ children }) => <StyledP>{children}</StyledP>;

//Headings styles

const StyledH1 = styled.h1`

`;

const StyledH2 = styled.h2`
  margin-top: 4rem;
  margin-bottom: 2rem;
  color: var(--color-main);
`;

const StyledH3 = styled.h3`
`;

export const H1 = ({ children }) => <StyledH1>{children}</StyledH1>;
export const H2 = ({ children }) => <StyledH2>{children}</StyledH2>;
export const H3 = ({ children }) => <StyledH3>{children}</StyledH3>;

//Code and inline-code styles

const StyledPre = styled.pre`
  padding: 2rem;
  border-radius: 10px;
  font-size: 1rem;
  position: relative;
  margin-bottom: 2rem;
`;

const Tag = styled.span`
  position: absolute;
  right: 1rem;
  top: 0;
  color: #cfcfcf;
`;

export const CodeBlock = ({ children, className }) => {
  const language = className.replace(/language-/, "") || "";

  return (
    <Highlight
      {...defaultProps}
      code={children.trim()}
      language={language}
      theme={vsDark}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <StyledPre className={className} style={style}>
          <Tag>{language.toUpperCase()}</Tag>
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
  );
};

