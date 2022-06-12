import * as React from "react";

import styled from "styled-components";
import rangeParser from "parse-numeric-range";
import Highlight, { defaultProps } from "prism-react-renderer";
import darkTheme from "prism-react-renderer/themes/vsDark";
import lightTheme from "prism-react-renderer/themes/vsLight";

import { ThemeContext } from "../../contexts/ThemeContext";

const StyledPre = styled.pre`
  padding: 1.5rem 1rem;
  font-size: 1rem;
  position: relative;
  font-family: var(--font-code);

  @media(min-width: 35em) {
    padding: 2rem 1.5rem;
  }
`;

const Tag = styled.span`
  position: absolute;
  right: 1rem;
  top: 0.5rem;
  color: var(--color-textDimmed);
  opacity: 0.25;
  user-select: none;
`;

const StyledDIV = styled.div`
  background-color: ${(props) => props.highlighted ? 'var(--color-backgroundLight)' : 'transparent'};
  display: block;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 3px;
`;


const linesToHighlight = (meta) => {
  const re = /{([\d,-]+)}/
  if (re.test(meta)) {
    const strLineNumbers = re.exec(meta)[1];
    const lineNumbers = rangeParser(strLineNumbers);
    return (index) => (lineNumbers.includes(index + 1));
  } else {
    return () => false;
  }
}

const CodeBlock = ({ children, className, metastring }) => {
  const language = className.replace(/language-/, "") || "";
  const toHighlight = linesToHighlight(metastring);

  const { isDark } = React.useContext(ThemeContext);
  
  return (
    <Highlight
      {...defaultProps}
      code={children.trim()}
      language={language}
      theme={isDark ? darkTheme : lightTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <StyledPre className={className} style={style}>
          <Tag>{language}</Tag>
          {tokens.map((line, index) => {
            const lineProps = getLineProps({ line, key: index });
            if (toHighlight(index)) {
              return (
                <StyledDIV key={index} {...lineProps} highlighted>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </StyledDIV>
              );
            } else {
              return (
                <StyledDIV key={index} {...lineProps}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </StyledDIV>
              );
            }  
          })}
        </StyledPre>
      )}
    </Highlight>
  );
};

export default CodeBlock;