import * as React from "react";
import styled from "styled-components";

import SocialLink from "./SocialLink";

import GitHub from "../images/icons/logo-github.svg";
import Email from "../images/icons/mail.svg";
import Twitter from "../images/icons/logo-twitter.svg";
import Telegram from "../images/icons/logo-telegram.svg";

const FooterStyled = styled.footer`
  width: 100%;
  border-top-style: solid;
  border-top-width: 1px;
  border-color: var(--color-backgroundDimmed);
  position: relative;
`;
const FooterInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  align-items: center;
  padding: 3rem 1rem;
  margin: 0 auto;
`;

const CopyrightContainer = styled.div`
  text-align: center;
  color: var(--color-textDimmed);
`;

const LinkContainer = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 2rem;
  gap: 1rem;
`;

const Footer = () => {
  return (
    <FooterStyled>
      <FooterInfoContainer>
        <LinkContainer>
          <SocialLink icon={<GitHub />} to={"https://github.com/dim-anis"}/>
          <SocialLink icon={<Twitter />} to={"https://twitter.com/DmitryAnisov"}/>
          <SocialLink icon={<Telegram />} to={"https://t.me/dim_anis"}/>
          <SocialLink icon={<Email />} to={"mailto:anis.dim@gmail.com"}/>
        </LinkContainer>
        <CopyrightContainer>
          <p>© 2022 - present Dmitry Anisov.</p>
          <p>All rights reserved.</p>
        </CopyrightContainer>
      </FooterInfoContainer>
    </FooterStyled>
  )
}
export default Footer;
