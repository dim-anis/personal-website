import * as React from "react";
import styled from "styled-components";

import { Link } from "gatsby";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
  cursor: pointer;
  border-radius: 15px;

  @media(min-width: 895px) {
    border: 1px solid var(--color-background-gray);
    padding: 1rem;
  }
`;

const Title = styled.h3`
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
      <Title>{title}</Title>
      <Description>{description}</Description>
      <StyledLink to={to}>Read more</StyledLink>
    </Container>
  )
}

export default PostPreview;
