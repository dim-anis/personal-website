import * as React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const StyledListItem = styled.li`
  cursor: pointer;
  transition: color 200ms ease-in-out;

  &:hover {
    color: ${(props) => props.theme.colorBrand};
    text-decoration: 2px underline solid;
  }
`;

const StyledLink = styled((props) => <Link {...props} />)`
  text-decoration: none;
  color: var(--text-color);
  font-weight: 600;
  padding: .5rem;
`;

const ListItem = ({ to, name }) => {
  return (
    <StyledListItem key={name}>
      <StyledLink to={to}>{name}</StyledLink>
    </StyledListItem>
  );
};

export default ListItem;
