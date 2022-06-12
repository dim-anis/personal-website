import * as React from "react";
import styled from "styled-components";

const Button = styled.button`
  border: none;
  padding: 0;
  cursor: pointer;
  background: transparent;
  transition: fill 250ms ease-in-out;
  fill: var(--color-textDimmed);

  &:hover {
    fill: var(--color-text);
  }
`;

const StyledA = styled.a`
  width: 2rem;
  aspect-ratio: 1;
`;

const SocialLink = ( { icon, to }) => {
  return (
    <StyledA href={to}>
      <Button>
        {icon}
      </Button>
    </StyledA>
  )
}

export default SocialLink;