import * as React from "react";
import styled from "styled-components";

import { Link } from "gatsby";

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
  width: 100%;
  gap: 0.5rem;
  cursor: pointer;
  border-radius: 10px;
  padding: 1rem;
  background-color: ${props => props.theme.backgroundSecondary};
  border: 1px solid transparent;
  transition: border 250ms ease-in-out;

  &:hover {
    border: 1px solid var(--color-main);
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
  width: 100%;
  gap: 0.5rem;
  cursor: pointer;
  border-radius: 10px;
  padding: 1rem;
  background-color: ${props => props.theme.backgroundSecondary};
  border: 1px solid transparent;
  transition: border 250ms ease-in-out;

  &:hover {
    border: 1px solid var(--color-main);
  }
  @media(min-width: 895px) {
    padding: 1.5rem;
  }
`;

const PostPreview = ({title, description, to, regularLink}) => {
  return (
    <div>
      <article>
        {
          regularLink
            ? 
            <StyledLink href={to}>
              <h3>{title}</h3>
              <Description>{description}</Description>
              Read more
            </StyledLink>
            :
            <StyledGatsbyLink to={to}>
              <h3>{title}</h3>
              <Description>{description}</Description>
              Read more
            </StyledGatsbyLink>
        }
      </article>
    </div>
  )
}

export default PostPreview;
