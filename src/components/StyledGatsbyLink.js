import * as React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const StyledLink = styled((props) => <Link {...props} />)`
  text-decoration: none;
  color: var(--text-color);
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: var(--color-textLight);
  }
`;

const StyledGatsbyLink = ({children}) => {
  return (
    <StyledLink>
      {children}
    </StyledLink>
  )
}

export default StyledGatsbyLink;