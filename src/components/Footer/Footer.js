import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Logo from "../../images/logo.svg";
import dayjs from "dayjs";
import { useStaticQuery, graphql } from "gatsby";

export const Footer = ({ lang }) => {
  const pageData = useStaticQuery(graphql`
    query AllContentfulContactData {
      allContentfulContactData {
        nodes {
          email
          socialMediaLink1
          socialMediaIcon1 {
            url
          }
          socialMediaLink2
          socialMediaIcon2 {
            url
          }
          socialMediaLink3
          socialMediaIcon3 {
            url
          }
          socialMediaLink4
          socialMediaIcon4 {
            url
          }
        }
      }
    }
  `);

  const pageDataContact = pageData.allContentfulContactData.nodes?.[0] || {};

  return (
    <FooterContainer id="contacts">
      <FooterRow>
        <LogoContainer>
          <StyledImg src={Logo} alt="Logo" />
        </LogoContainer>
        <FooterNav>
          <FooterNavItem to="/#home">
            {lang === "ru" ? "Домашняя страница" : "Home"}
          </FooterNavItem>
          <FooterNavItem to="/about">
            {lang === "ru" ? "Обо мне" : "About"}
          </FooterNavItem>
          <FooterNavItem to="/#news">
            {lang === "ru" ? "Новости" : "News"}
          </FooterNavItem>
          <FooterNavItem to="gallery">
            {lang === "ru" ? "Gallery" : "Gallery"}
          </FooterNavItem>
          <FooterNavItem to="/#contacts">
            {lang === "ru" ? "Контакты" : "Contacts"}
          </FooterNavItem>
        </FooterNav>
      </FooterRow>
      <FooterMainRow>
        <FooterMainCol>
          <FooterLinksRow>
            <div>
              <FooterLinksTitle>
                {lang === "ru" ? "Связаться" : "Contact"}
              </FooterLinksTitle>
              <FooterLinksItem>
                <a href={`mailto:${pageDataContact.email}`}>
                  {pageDataContact.email}
                </a>
              </FooterLinksItem>
            </div>
            {/* <FooterContactRow>
              <FooterLinksTitle>Follow Haik</FooterLinksTitle>
              <SocialMediaItems>
                {pageDataContact.socialMediaLink1 && (
                  <FooterLinksItem>
                    <a href={pageDataContact.socialMediaLink1} target="_blank">
                      <img
                        src={pageDataContact.socialMediaIcon1.url}
                        alt="Social Media Icon"
                      />
                    </a>
                  </FooterLinksItem>
                )}
                {pageDataContact.socialMediaLink2 && (
                  <FooterLinksItem>
                    <a href={pageDataContact.socialMediaLink2} target="_blank">
                      <img
                        src={pageDataContact.socialMediaIcon2.url}
                        alt="Social Media Icon"
                      />
                    </a>
                  </FooterLinksItem>
                )}
                {pageDataContact.socialMediaLink3 && (
                  <FooterLinksItem>
                    <a href={pageDataContact.socialMediaLink3} target="_blank">
                      <img
                        src={pageDataContact.socialMediaIcon3.url}
                        alt="Social Media Icon"
                      />
                    </a>
                  </FooterLinksItem>
                )}
                {pageDataContact.socialMediaLink4 && (
                  <FooterLinksItem>
                    <a href={pageDataContact.socialMediaLink4} target="_blank">
                      <img
                        src={pageDataContact.socialMediaIcon4.url}
                        alt="Social Media Icon"
                      />
                    </a>
                  </FooterLinksItem>
                )}
                {pageDataContact.socialMediaLink5 && (
                  <FooterLinksItem>
                    <a href={pageDataContact.socialMediaLink5} target="_blank">
                      <img
                        src={pageDataContact.socialMediaIcon5.url}
                        alt="Social Media Icon"
                      />
                    </a>
                  </FooterLinksItem>
                )}
              </SocialMediaItems>
            </FooterContactRow> */}
          </FooterLinksRow>
        </FooterMainCol>
      </FooterMainRow>
      <FooterLastRow>
        <FooterCopyright>
          © Haik Kazazyan{" "}
          {dayjs().format("YYYY") < 2025 ? 2025 : dayjs().format("YYYY")}.{" "}
          {lang === "ru" ? "Все права защищены." : "All rights reserved."}
        </FooterCopyright>
      </FooterLastRow>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 60px 16px;
  @media (min-width: 1024px) {
    padding: 100px 52px;
  }
`;

const LogoContainer = styled.div`
  width: 116px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImg = styled.img`
  height: 32px;
  object-fit: contain;
`;

const FooterMainRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 60px;
  padding-bottom: 20px;
  border-bottom: 1px solid #505050;
  @media (min-width: 1024px) {
    flex-direction: row;
    padding-bottom: 60px;
  }
`;

const FooterMainCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 40px;
  @media (min-width: 1024px) {
    width: 100%;
    margin-bottom: 0;
  }
`;

const FooterLinksRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FooterLinksTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 130%;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 10px;
`;

const FooterLinksItem = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  color: #fff;
  a {
    color: #fff;
  }
`;

const FooterLastRow = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  margin-top: 60px;
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const FooterCopyright = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 130%;
  color: #fff;
  text-align: center;
  margin-top: 32px;
  width: 100%;
  @media (min-width: 1024px) {
    margin-top: 0;
  }
`;

const FooterNav = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const FooterNavItem = styled(Link)`
  font-size: 16px;
  font-weight: 400;
  line-height: 130%;
  text-decoration: none;
  color: #fff;
  padding: 16px;
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-bottom: 40px;
  border-bottom: 1px solid #505050;
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const SocialMediaItems = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
`;

const FooterContactRow = styled.div`
  display: flex;
  flex-direction: column;
`;
