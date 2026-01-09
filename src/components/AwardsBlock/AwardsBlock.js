import * as React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { useStaticQuery, graphql } from "gatsby";

export const AwardsBlock = ({ lang }) => {
  const pageData = useStaticQuery(graphql`
    query AllContentfulAwardsBlock {
      allContentfulAwardsBlock {
        nodes {
          id
          title {
            title
          }
          titleRu {
            titleRu
          }
          createdAt
          updatedAt
        }
      }
      allContentfulAward {
        nodes {
          id
          image {
            url
          }
          order
          createdAt
          updatedAt
        }
      }
    }
  `);

  const pageDataText = pageData.allContentfulAwardsBlock.nodes?.[0] || {};
  const awardsData =
    pageData.allContentfulAward.nodes.sort((a, b) => a.order - b.order) || [];

  return (
    <AwardsBlockContainer>
      <AnchorDiv id="awards" />
      <AwardsBlockInnerContainer>
        <AwardsBlockTextTitle>
          {lang === "ru"
            ? pageDataText.titleRu?.titleRu
            : pageDataText.title?.title}
        </AwardsBlockTextTitle>
        <AwardsListingBlock>
          {awardsData.map((item, index) => (
            <StyledImg src={item.image.url} />
          ))}
        </AwardsListingBlock>
      </AwardsBlockInnerContainer>
    </AwardsBlockContainer>
  );
};

const AwardsBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 100%;
  padding: 60px 16px 20px 16px;
  @media (min-width: 1024px) {
    padding: 100px 32px;
  }
  @media (min-width: 1440px) {
    padding-left: 0;
    padding-right: 0;
  }
  position: relative;
`;

const AnchorDiv = styled.div`
  width: 1px;
  height: 1px;
  top: -70px;
  position: absolute;
`;

const AwardsBlockInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  @media (min-width: 1024px) {
    width: 906px;
  }
`;

const AwardsBlockTextTitle = styled.h2`
  font-weight: 600;
  font-size: 32px;
  line-height: 130%;
  margin-top: 0;
  margin-bottom: 0;
  @media (min-width: 1024px) {
    margin-bottom: 32px;
    font-size: 48px;
  }
`;

const AwardsListingBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  @media (min-width: 768px) {
    width: 50%;
  }
  @media (min-width: 1024px) {
    width: 20%;
  }
`;
