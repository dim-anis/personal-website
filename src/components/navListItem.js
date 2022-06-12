import * as React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const StyledListItem = styled.li`
  cursor: pointer;
  transition: color 200ms ease-in-out;
  padding: 0.5rem;
  }
`;

const StyledLink = styled((props) => <Link {...props} />)`
  text-decoration: none;
  color: var(--text-color);
  font-weight: 600;
  padding: .5rem;
  border-radius: 5px;
  background: ${(props) => props.highlight ? 'var(--color-backgroundLight)' : "none"};
  
  &:hover {
    background: var(--color-backgroundLight);
  }
`;

const ListItem = ({ to, name, highlight }) => {
  return (
    <StyledListItem key={name}>
      <StyledLink to={to} highlight={highlight} >{name}</StyledLink>
    </StyledListItem>
  );
};

export default ListItem;
