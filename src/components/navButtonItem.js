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
  fill: ${props => props.theme.fontColorSecondary};

  &:hover {
    fill: ${props => props.theme.fontColor};
  }
`;

const NavButtonItem = ({ icon, alt }) => {
  return (
    <UserContext.Consumer>
      {context => (
        <Button onClick={() => context.toggleTheme()}>
          {icon}
        </Button>
      )}
    </UserContext.Consumer>
  );
};

export default NavButtonItem;
