import * as React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const StyledListItem = styled.li`
  cursor: pointer;
  :hover {
    color: var(--color-main);
  }
`;

const StyledLink = styled((props) => <Link {...props} />)`
  text-decoration: none;
  color: var(--text-color);
  font-weight: 600;
`;

const ListItem = ({ to, name }) => {
  return (
    <StyledListItem>
      <StyledLink to={to}>{name}</StyledLink>
    </StyledListItem>
  );
};

export default ListItem;
