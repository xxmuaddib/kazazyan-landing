import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Logo from "../../images/logo.svg";
import Burger from "../../images/burger.svg";
import Close from "../../images/close.svg";
import { useStaticQuery, graphql } from "gatsby";

export const Header = ({ lang, setLang }) => {
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleSetLang = (lang) => {
    setLang(lang);
    localStorage.setItem("lang", lang);
  };

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <Self>
      <FixedContainer>
        <Container>
          <LogoContainer to="/">
            <StyledImg src={Logo} alt="Logo" />
          </LogoContainer>
          <Navigation>
            <NavItem to="/#home">
              {lang === "ru" ? "Домашняя страница" : "Home"}
            </NavItem>
            <NavItem to="/about">{lang === "ru" ? "Обо мне" : "About"}</NavItem>
            <NavItem to="/#news">{lang === "ru" ? "Новости" : "News"}</NavItem>
            <NavItem to="/gallery">
              {lang === "ru" ? "Галерея" : "Gallery"}
            </NavItem>
            <NavItem to="/press-kit">
              {lang === "ru" ? "Пресс кит" : "Press Kit"}
            </NavItem>
            <NavItem to="/#contacts">
              {lang === "ru" ? "Контакты" : "Contacts"}
            </NavItem>

            {/* <LanguageSwitcher>
              <LangItem
                $isActive={lang === "en"}
                onClick={() => handleSetLang("en")}
              >
                ENG
              </LangItem>
              <LangItem
                $isActive={lang === "ru"}
                onClick={() => handleSetLang("ru")}
              >
                RUS
              </LangItem>
            </LanguageSwitcher> */}
          </Navigation>
          <MobileNavigation>
            <BurgerContainer onClick={() => setIsMobileMenuOpen(true)}>
              <StyledBurger src={Burger} alt="Burger" />
            </BurgerContainer>
          </MobileNavigation>
          {isMobileMenuOpen && (
            <MobileMenu>
              <MobileMenuHeader>
                <LogoContainer to="/">
                  <StyledImg src={Logo} alt="Logo" />
                </LogoContainer>
                <CloseButton onClick={() => setIsMobileMenuOpen(false)}>
                  <StyledCloseImg src={Close} alt="Close" />
                </CloseButton>
              </MobileMenuHeader>
              <MobileNavList>
                <MobileMenuTopPart>
                  <MobileNavItem
                    to="/#home"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {lang === "ru" ? "Домашняя страница" : "Home"}
                  </MobileNavItem>
                  <MobileNavItem
                    to="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {lang === "ru" ? "Обо мне" : "About"}
                  </MobileNavItem>
                  <MobileNavItem
                    to="/#news"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {lang === "ru" ? "Новости" : "News"}
                  </MobileNavItem>
                  <MobileNavItem
                    to="/gallery"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {lang === "ru" ? "Галерея" : "Gallery"}
                  </MobileNavItem>
                  <MobileNavItem
                    to="/press-kit"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {lang === "ru" ? "Пресс Кит" : "Press Kit"}
                  </MobileNavItem>

                  <MobileNavItem
                    to="/#contacts"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {lang === "ru" ? "Контакты" : "Contacts"}
                  </MobileNavItem>

                  <MobileNavItemsRow>
                    {pageDataContact.socialMediaLink1 && (
                      <MobileNavItem
                        $underlined
                        href={pageDataContact.socialMediaLink1}
                        target="_blank"
                      >
                        <img
                          src={pageDataContact.socialMediaIcon1.url}
                          alt="Social Media Icon"
                        />
                      </MobileNavItem>
                    )}
                    {pageDataContact.socialMediaLink2 && (
                      <MobileNavItem
                        $underlined
                        href={pageDataContact.socialMediaLink2}
                        target="_blank"
                      >
                        <img
                          src={pageDataContact.socialMediaIcon2.url}
                          alt="Social Media Icon"
                        />
                      </MobileNavItem>
                    )}
                    {pageDataContact.socialMediaLink3 && (
                      <MobileNavItem
                        $underlined
                        href={pageDataContact.socialMediaLink3}
                        target="_blank"
                      >
                        <img
                          src={pageDataContact.socialMediaIcon3.url}
                          alt="Social Media Icon"
                        />
                      </MobileNavItem>
                    )}
                    {pageDataContact.socialMediaLink4 && (
                      <MobileNavItem
                        $underlined
                        href={pageDataContact.socialMediaLink4}
                        target="_blank"
                      >
                        <img
                          src={pageDataContact.socialMediaIcon4.url}
                          alt="Social Media Icon"
                        />
                      </MobileNavItem>
                    )}
                  </MobileNavItemsRow>
                  {/* <LanguageSwitcher>
                    <LangItem
                      $isActive={lang === "en"}
                      onClick={() => handleSetLang("en")}
                    >
                      ENG
                    </LangItem>
                    <LangItem
                      $isActive={lang === "ru"}
                      onClick={() => handleSetLang("ru")}
                    >
                      RUS
                    </LangItem>
                  </LanguageSwitcher> */}
                </MobileMenuTopPart>
              </MobileNavList>
            </MobileMenu>
          )}
        </Container>
      </FixedContainer>
    </Self>
  );
};

const Self = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 80px;
  @media (min-width: 768px) {
    height: 92px;
  }
`;

const FixedContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #222222;
  box-shadow: 0px 1px 1px 0px #0000001a;
  height: 78px;
  padding: 0 16px;
  @media (min-width: 1024px) {
    height: 72px;
    padding: 0;
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media (min-width: 1024px) {
    width: 100%;
    padding: 0 52px;
  }
  @media (min-width: 1440px) {
    width: 1440px;
  }
`;

const LogoContainer = styled(Link)`
  width: 116px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Navigation = styled.div`
  display: none;
  gap: 32px;
  align-items: center;
  @media (min-width: 1024px) {
    display: flex;
  }
`;

const MobileNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  @media (min-width: 1024px) {
    display: none;
  }
`;

const StyledBurger = styled.img`
  height: 24px;
  object-fit: contain;
`;

const StyledImg = styled.img`
  height: 30px;
  object-fit: contain;
`;

const NavItem = styled(Link)`
  font-size: 16px;
  font-weight: 300;
  color: #fff;
  text-decoration: none;
`;

const LanguageSwitcher = styled.div`
  display: flex;
  align-items: center;
  font-weight: 300;
  height: 20px;
  > div:not(:last-child) {
    border-right: 1px solid #2e2e2e99;
  }
`;

const LangItem = styled.div`
  font-size: 16px;
  line-height: 20px;
  height: 20px;
  font-weight: 400;
  color: ${(p) => (p.$isActive ? "#000" : "#2e2e2e99")};
  padding: 0 8px;
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
  cursor: pointer;
`;

const BurgerContainer = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #222;
`;

const MobileNavList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 16px;
  height: calc(100% - 80px);
`;

const MobileNavItemsRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const MobileNavItem = styled(Link)`
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  text-decoration: ${(p) => (p.$underlined ? "underline" : "none")};
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #222;
  padding: 16px;
  height: 80px;
  @media (min-width: 768px) {
    height: 92px;
  }
`;

const CloseButton = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StyledCloseImg = styled.img`
  height: 24px;
  width: 24px;
  object-fit: contain;
`;

const MobileMenuTopPart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
