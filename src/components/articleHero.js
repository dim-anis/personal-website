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

const StyledH1 = styled.h1`
    font-size: 2.3rem;
		text-align: center;

    @media(max-width: 564px) {
      text-align: left;
    }
`;

const StyledH2 = styled.h2`
    color: var(--color-textDimmed);
    margin-top: 1rem;
    font-weight: 400;
`;

const Tag = styled.div`
    color: var(--color-primary);
    margin-bottom: 1rem;
`;

const TagContainer = styled.div`
    display: flex;
    gap: 1rem;
`;

const ArticleHero = ({ title, subtitle, tags }) => {
	return (
		<Container>
			<TagContainer>
				{tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)}
			</TagContainer>
			<StyledH1>{title}</StyledH1>
			<StyledH2>{subtitle}</StyledH2>
		</Container>
	);
}

export default ArticleHero;