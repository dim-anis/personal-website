import * as React from "react";
import styled from "styled-components";

import { UserContext } from "../../gatsby-browser";



const Button = styled.button`
  width: 2rem;
  aspect-ratio: 1;
  padding: 0.25rem;
  border: none;
  cursor: pointer;
  background: transparent;
  filter: invert(0%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(30%);

  &:hover {
    filter: invert(0%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%);
  }

  @media(max-width: 564px) {
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(30%);

    &:hover {
      filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%);
    }
  }
`;

const NavButtonItem = ({ icon, alt }) => {
  return (
    <UserContext.Consumer>
      {context => (
        <Button>
          <img src={icon} alt={alt} onClick={() => context.toggleTheme()} />
        </Button>
      )}
    </UserContext.Consumer>
  );
};

export default NavButtonItem;
