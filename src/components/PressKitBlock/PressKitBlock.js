import * as React from "react";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";

export const PressKitBlock = ({ lang }) => {
  const pageData = useStaticQuery(graphql`
    query AllContentfulPressKitBlock {
      allContentfulPressKitBlock {
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
          createdAt
          updatedAt
        }
      }
    }
  `);

  const pageDataText = pageData.allContentfulPressKitBlock.nodes?.[0] || {};

  return (
    <Container>
      <AnchorDiv id="press-kit" />
      <CoverTitle>
        {lang === "ru"
          ? pageDataText.titleRu?.titleRu
          : pageDataText.title?.title}
      </CoverTitle>
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

const CoverText = styled.h3`
  font-family: Bricolage Grotesque;
  font-weight: 500;
  font-style: Medium;
  font-size: 18px;
  text-align: center;
  line-height: 140%;

  color: #000;
  width: 100%;
  padding: 0 16px;
  @media (min-width: 1024px) {
    width: 906px;
    margin-bottom: 80px;
  }
`;
