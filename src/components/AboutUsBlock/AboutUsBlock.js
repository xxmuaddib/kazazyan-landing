import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";

export const AboutUsBlock = ({ lang, isHomePage, isGrey }) => {
  const pageData = useStaticQuery(graphql`
    query AllContentfulAboutUs {
      allContentfulAboutUs {
        nodes {
          id
          title {
            title
          }
          titleRu {
            titleRu
          }
          text {
            text
          }
          textRu {
            textRu
          }
          image {
            url
          }
          shortText {
            shortText
          }
          shortTextRu {
            shortTextRu
          }
          createdAt
          updatedAt
        }
      }
    }
  `);

  const pageDataText = pageData.allContentfulAboutUs.nodes?.[0] || {};

  return (
    <AboutUsContainer id="about" $isGrey={isGrey}>
      <AboutUsInnerContainer>
        <AboutUsTextContainer>
          <AboutUsTextTitle>
            {lang === "ru"
              ? pageDataText.titleRu?.titleRu
              : pageDataText.title?.title}
          </AboutUsTextTitle>
          <AboutUsText
            dangerouslySetInnerHTML={{
              __html:
                lang === "ru"
                  ? isHomePage
                    ? pageDataText.shortTextRu.shortTextRu
                    : pageDataText.textRu?.textRu
                  : isHomePage
                  ? pageDataText.shortText.shortText
                  : pageDataText.text?.text,
            }}
          />
        </AboutUsTextContainer>
        <AboutUsImage
          src={pageDataText.image?.url}
          alt={pageDataText.title?.title}
        />
      </AboutUsInnerContainer>
      {isHomePage && (
        <ViewMoreContainer to="about">Read more</ViewMoreContainer>
      )}
    </AboutUsContainer>
  );
};

const AboutUsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => (p.$isGrey ? "#f2f2f2" : "#fff")};
  color: #000;
  width: 100%;
  padding: 60px 16px;
  @media (min-width: 1024px) {
    padding: 100px 32px;
  }
  @media (min-width: 1440px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

const AboutUsInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  @media (min-width: 1024px) {
    width: 906px;
    flex-direction: row;
  }
`;

const AboutUsTextTitle = styled.h2`
  font-weight: 600;
  font-size: 32px;
  line-height: 130%;
  margin-bottom: 26px;
  margin-top: 0;
  @media (min-width: 1024px) {
    font-size: 48px;
  }
`;

const AboutUsTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (min-width: 1024px) {
    width: 423px;
  }
`;

const AboutUsText = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 130%;
  @media (min-width: 1024px) {
    font-size: 18px;
  }
`;

const AboutUsImage = styled.img`
  width: 100%;
  @media (min-width: 1024px) {
    width: 423px;
  }
  height: 420px;
  object-fit: cover;
`;

const ViewMoreContainer = styled(Link)`
  margin-top: 70px;
  padding: 10px 20px;
  background-color: #222222;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  text-decoration: none;
`;
