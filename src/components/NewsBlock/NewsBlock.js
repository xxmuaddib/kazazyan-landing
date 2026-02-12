import * as React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { useStaticQuery, graphql } from "gatsby";

export const NewsBlock = ({ lang, isHomePage }) => {
  const pageData = useStaticQuery(graphql`
    query AllContentfulNewsBlock {
      allContentfulNewsBlock {
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
      allContentfulNews {
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
          date
          createdAt
          updatedAt
        }
      }
    }
  `);

  const pageDataText = pageData.allContentfulNewsBlock.nodes?.[0] || {};
  const newsData =
    pageData.allContentfulNews.nodes.sort((a, b) =>
      dayjs(a.date).diff(dayjs(b.date)),
    ) || [];

  // Hide the entire block if there's no news
  if (!newsData || newsData.length === 0) {
    return null;
  }

  return (
    <NewsBlockContainer>
      <AnchorDiv id="news" />
      <NewsBlockInnerContainer>
        <NewsBlockTextTitle>
          {lang === "ru"
            ? pageDataText.titleRu?.titleRu
            : pageDataText.title?.title}
        </NewsBlockTextTitle>
        <NewsListingBlock>
          {newsData.map((item, index) => (
            <NewsListingItem key={index}>
              <NewsListingItemImageContainer>
                <NewsListingItemImage src={item.image?.url} />
              </NewsListingItemImageContainer>
              <NewsListingItemContent>
                <NewsListingItemTitle
                  dangerouslySetInnerHTML={{
                    __html:
                      lang === "ru" ? item.titleRu?.titleRu : item.title?.title,
                  }}
                ></NewsListingItemTitle>
                <ViewMoreButton href={`/news/${item.id}`}>
                  {lang === "ru" ? "Подробнее" : "View More"}
                </ViewMoreButton>
              </NewsListingItemContent>
            </NewsListingItem>
          ))}
        </NewsListingBlock>
      </NewsBlockInnerContainer>
    </NewsBlockContainer>
  );
};

const NewsBlockContainer = styled.div`
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

const NewsBlockInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  @media (min-width: 1024px) {
    width: 906px;
  }
`;

const NewsBlockTextTitle = styled.h2`
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

const NewsListingBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  @media (min-width: 1024px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const NewsListingItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid #2e2e2e;
  padding-top: 32px;
  padding-bottom: 32px;
  &:last-child {
    border-bottom: none;
  }
  @media (min-width: 1024px) {
    flex-direction: column;
    width: 30%;
  }
`;

const NewsListingItemContent = styled.div`
  width: 100%;
`;

const NewsListingItemTitle = styled.div`
  font-family: Bricolage Grotesque;
  font-weight: 500;
  font-size: 16px;

  line-height: 130%;
  margin-bottom: 16px;
  margin-top: 16px;
`;

const NewsListingItemImageContainer = styled.div`
  width: 100%;
  margin-top: 32px;
  @media (min-width: 1024px) {
    margin-top: 0;
  }
`;

const NewsListingItemImage = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  @media (min-width: 1024px) {
    height: unset;
  }
`;

const ViewMoreButton = styled.a`
  font-size: 14px;
  font-weight: 400;
  line-height: 130%;
  color: #000;
  text-decoration: underline;
  text-transform: uppercase;
  cursor: pointer;
`;
