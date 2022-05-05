import * as React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 2rem;
  aspect-ratio: 1;
  padding: 0.25rem;
  border: 1px solid var(--color-text);
  border-radius: 5px;
  cursor: pointer;
  background: transparent;

  @media(max-width: 564px) {
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%);
  }
`;

const NavButtonItem = ({ icon, alt }) => {
  return (
    <Button>
      <img src={icon} alt={alt} />
    </Button>
  );
};

export default NavButtonItem;
