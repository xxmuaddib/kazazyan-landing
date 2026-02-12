import * as React from "react";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";
import CoverImage from "../../images/cover-image.jpg";

export const CoverBlock = ({ lang }) => {
  const pageData = useStaticQuery(graphql`
    query AllContentfulCoverBlock {
      allContentfulCoverBlock {
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
          subtitle {
            subtitle
          }
          subtitleRu {
            subtitleRu
          }
          createdAt
          updatedAt
        }
      }
    }
  `);

  const pageDataText = pageData.allContentfulCoverBlock.nodes?.[0] || {};

  return (
    <Container>
      <AnchorDiv id="home" />
      <CoverImageBackground />
      <CoverTitle>
        {lang === "ru"
          ? pageDataText.titleRu?.titleRu
          : pageDataText.title?.title}
      </CoverTitle>
      <CoverSubtitle>
        {lang === "ru"
          ? pageDataText.subtitleRu?.subtitleRu
          : pageDataText.subtitle?.subtitle}
      </CoverSubtitle>
      <CoverText
        dangerouslySetInnerHTML={{
          __html:
            lang === "ru"
              ? pageDataText.textRu?.textRu
              : pageDataText.text?.text,
        }}
      ></CoverText>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AnchorDiv = styled.div`
  width: 1px;
  height: 1px;
  top: -93px;
  position: absolute;
`;

const CoverTitle = styled.h1`
  font-family: Bricolage Grotesque;
  font-weight: 700;
  font-style: Bold;
  font-size: 48px;
  line-height: 140%;

  color: #000;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  @media (min-width: 1024px) {
    padding: 0 16px;
    margin-top: 80px;
    margin-bottom: 26px;
    text-align: center;
  }
`;

const CoverSubtitle = styled.h2`
  font-family: Bricolage Grotesque;
  font-weight: 500;
  font-style: Medium;
  font-size: 28px;
  text-align: center;
  line-height: 140%;
`;

const CoverText = styled.h3`
  font-family: Bricolage Grotesque;
  font-weight: 500;
  font-style: Medium;
  font-size: 18px;
  text-align: center;
  line-height: 140%;

  color: #000;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  padding: 0 16px;
  @media (min-width: 1024px) {
    width: 906px;
    margin-bottom: 80px;
  }
`;

const CoverImageBackground = styled.div`
  display: block;
  width: 100%;
  height: 360px;
  background-image: url(${CoverImage});
  background-size: cover;
  background-position: center;
  @media (min-width: 768px) {
    display: none;
  }
  @media (min-width: 1024px) {
    height: 640px;
  }
`;
