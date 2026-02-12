import * as React from "react";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import { Header } from "../components/Header";
import { GlobalStyles } from "../common/GlobalStyles";
import styled from "styled-components";
import { Footer } from "../components/Footer";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const NewsPage = ({ data }) => {
  const [lang, setLang] = React.useState("en");

  React.useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang) {
      setLang(storedLang);
    }
  }, []);

  const news = data.contentfulNews;
  const seoTags =
    data.allContentfulSeoTags.nodes.find((n) => n.lang === lang) || {};

  const title = lang === "ru" ? news.titleRu?.titleRu : news.title?.title;
  const text = lang === "ru" ? news.textRu?.textRu : news.text?.text;

  return (
    <div>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <title>
          {title} | {seoTags.title}
        </title>
        {seoTags.description && (
          <meta name="description" content={seoTags.description} />
        )}
      </Helmet>
      <GlobalStyles />
      <Header lang={lang} setLang={setLang} />

      <OuterContainer>
        <InnerContainer>
          <NewsContainer>
            <BackLink to="/#news">
              {lang === "ru" ? "← Назад к новостям" : "← Back to News"}
            </BackLink>
            <NewsHeader>
              <NewsDate>
                {dayjs(news.date, "DD.MM.YYYY").format("MMMM D, YYYY")}
              </NewsDate>
              <NewsTitle dangerouslySetInnerHTML={{ __html: title }} />
            </NewsHeader>
            {news.image?.url && <NewsImage src={news.image.url} alt={title} />}
            <NewsText dangerouslySetInnerHTML={{ __html: text }} />
          </NewsContainer>
        </InnerContainer>
      </OuterContainer>

      <BlackOuterContainer>
        <InnerContainer>
          <Footer lang={lang} />
        </InnerContainer>
      </BlackOuterContainer>
    </div>
  );
};

export default NewsPage;

export const query = graphql`
  query ($id: String!) {
    contentfulNews(id: { eq: $id }) {
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
    }
    allContentfulSeoTags {
      nodes {
        title
        description
        lang
      }
    }
  }
`;

const OuterContainer = styled.div`
  width: 100%;
  display: block;
  background-color: #f3f3f3;
  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const BlackOuterContainer = styled(OuterContainer)`
  background-color: #222222;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 1024px) {
    width: 100%;
  }
  @media (min-width: 1440px) {
    width: 1440px;
  }
`;

const NewsContainer = styled.div`
  width: 100%;
  padding: 40px 16px 60px 16px;
  @media (min-width: 1024px) {
    width: 906px;
    padding: 60px 0 100px 0;
  }
`;

const BackLink = styled(Link)`
  font-size: 14px;
  font-weight: 400;
  color: #2e2e2e;
  text-decoration: none;
  margin-bottom: 32px;
  display: inline-block;
  &:hover {
    text-decoration: underline;
  }
`;

const NewsHeader = styled.div`
  margin-bottom: 32px;
`;

const NewsDate = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #666;
  margin-bottom: 16px;
`;

const NewsTitle = styled.h1`
  font-family: Bricolage Grotesque;
  font-weight: 600;
  font-size: 22px;
  line-height: 130%;
  margin: 0;
  @media (min-width: 1024px) {
    font-size: 48px;
  }
`;

const NewsImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-bottom: 32px;
`;

const NewsText = styled.div`
  font-family: Bricolage Grotesque;
  font-weight: 400;
  font-size: 18px;
  line-height: 160%;
  color: #2e2e2e;

  p {
    margin-bottom: 16px;
  }

  a {
    color: #2e2e2e;
    text-decoration: underline;
  }
`;
