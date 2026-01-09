import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import dayjs from "dayjs";
import { useStaticQuery, graphql } from "gatsby";

export const GalleryBlock = ({ lang, isHomePage }) => {
  const pageData = useStaticQuery(graphql`
    query AllContentfulGalleryBlock {
      allContentfulGalleryBlock {
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
      allContentfulGallery {
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

  const pageDataText = pageData.allContentfulGalleryBlock.nodes?.[0] || {};
  const galleryData =
    pageData.allContentfulGallery.nodes
      .sort((a, b) => a.order - b.order)
      .filter((item, index) => (isHomePage ? index < 5 : true)) || [];

  return (
    <GalleryBlockContainer>
      <AnchorDiv id="gallery" />
      <GalleryBlockInnerContainer>
        <GalleryBlockTextTitle>
          {lang === "ru"
            ? pageDataText.titleRu?.titleRu
            : pageDataText.title?.title}
        </GalleryBlockTextTitle>
        <GalleryListingBlock>
          {galleryData.map((item, index) => (
            <StyledImg src={item.image.url} />
          ))}
        </GalleryListingBlock>
      </GalleryBlockInnerContainer>
      {isHomePage && (
        <ViewMoreContainer to="gallery">View more</ViewMoreContainer>
      )}
    </GalleryBlockContainer>
  );
};

const GalleryBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
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

const GalleryBlockInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  @media (min-width: 1024px) {
    width: 906px;
  }
`;

const GalleryBlockTextTitle = styled.h2`
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

const GalleryListingBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  @media (min-width: 1024px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  @media (min-width: 768px) {
    height: 195px;
    width: auto;
  }
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
