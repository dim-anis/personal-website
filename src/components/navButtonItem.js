import * as React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 2rem;
  aspect-ratio: 1;
  padding: 0.25rem;
  border: none;
  cursor: pointer;
  background: transparent;
  transition: fill 250ms ease-in-out;
  fill: var(--color-textDimmed);

  &:hover {
    fill: var(--color-text);
  }
`;

const NavButtonItem = ({ icon, handleClick }) => {
  return (
    <Button onClick={handleClick}>
      {icon}
    </Button>
  );
};

export default NavButtonItem;
