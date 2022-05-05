import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;

    @media(max-width: 564px) {
        align-items: flex-start;
        padding: 2rem 0rem;
    }
`;

const StyledH2 = styled.h2`
    color: var(--color-text-gray);
    margin-top: 1rem;
    font-weight: 400;
`;

const Tag = styled.div`
    color: var(--color-main);
    margin-bottom: 1rem;
`;

const ArticleHero = ({title, subtitle, tag, slug}) => {
    return (
        <Container>
            <Tag>{tag}</Tag>
            <h1>{title}</h1>
            <StyledH2>{subtitle}</StyledH2>
            <div>

            </div>
        </Container>
    );
}

export default ArticleHero;