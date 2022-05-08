import * as React from "react";
import styled from "styled-components";

import { Link } from "gatsby";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
  cursor: pointer;
  border-radius: 10px;
  padding: 1rem;
  background-color: ${props => props.theme.backgroundSecondary};

  @media(min-width: 895px) {
    padding: 1.5rem;
  }
`;

const Description = styled.p`
  width: 100%;
`;

const StyledLink = styled((props) => <Link {...props} />)`
  text-decoration: none;
  color: var(--text-color);
  font-weight: 600;
  &:hover {
    color: var(--color-main);
  }
`;

const PostPreview = ({title, description, to}) => {
  return (
    <Container>
      <h3>{title}</h3>
      <Description>{description}</Description>
      <StyledLink to={to}>Read more</StyledLink>
    </Container>
  )
}

export default PostPreview;
