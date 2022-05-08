import * as React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const StyledLink = styled((props) => <Link {...props} />)`
  text-decoration: none;
  color: var(--text-color);
  font-weight: 600;
`;

const StyledGatsbyLink = ({ to, name }) => {
    return (
        <StyledLink to={to}>
            {name}
        </StyledLink>
    )
}

export default StyledGatsbyLink;