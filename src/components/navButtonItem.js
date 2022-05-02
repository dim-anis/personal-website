import * as React from "react";
import styled from "styled-components";

const Img = styled.img`
  width: 100%;
`;

const Button = styled.button`
  width: 1.5rem;
  aspect-ratio: 1;
  border: none;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
`;

const NavButtonItem = ({ icon, alt }) => {
  return (
    <Button>
      <Img src={icon} alt={alt} />
    </Button>
  );
};

export default NavButtonItem;
