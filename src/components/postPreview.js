import * as React from "react";
import styled from "styled-components";

import { Link } from "gatsby";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Article = styled.article`
  display: flex;
  flex-grow: 1;
`;

const Description = styled.p`
  width: 100%;
  font-weight: 400;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: var(--text-color);
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  gap: 0.75rem;
  cursor: pointer;
  border-radius: 10px;
  padding: 1rem;
  background-color: var(--color-backgroundDimmed);
  border: 1px solid transparent;
  transition: border 250ms ease-in-out;

  &:hover {
    border: 1px solid;
    border-color: var(--color-primary);
  }
  @media(min-width: 895px) {
    padding: 1.5rem;
  }
`;

const StyledGatsbyLink = styled((props) => <Link {...props} />)`
  text-decoration: none;
  color: var(--text-color);
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  gap: 0.75rem;
  cursor: pointer;
  border-radius: 10px;
  padding: 1rem;
  background-color: var(--color-backgroundDimmed);
  border: 1px solid transparent;
  transition: border 250ms ease-in-out;

  &:hover {
    border: 1px solid;
    border-color: var(--color-primary);
  }
  @media(min-width: 895px) {
    padding: 1.5rem;
  }
`;

const PostPreview = ({title, description, to, regularLink}) => {
  return (
    <Container>
      <Article>
        {
          regularLink
            ? 
            <StyledLink href={to}>
              <div>
                <h3>{title}</h3>
                <Description>{description}</Description>
              </div>
              Read more
            </StyledLink>
            :
            <StyledGatsbyLink to={to}>
              <div>
                <h3>{title}</h3>
                <Description>{description}</Description>
              </div>
              Read more
            </StyledGatsbyLink>
        }
      </Article>
    </Container>
  )
}

export default PostPreview;
