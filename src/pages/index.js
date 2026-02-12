import * as React from "react";
import { Helmet } from "react-helmet";

import { useStaticQuery, graphql } from "gatsby";
import { Header } from "../components/Header";
import { GlobalStyles } from "../common/GlobalStyles";
import styled from "styled-components";
import { AboutUsBlock } from "../components/AboutUsBlock";
import { CoverBlock } from "../components/CoverBlock";
import { Footer } from "../components/Footer";
import CoverImage from "../images/cover-image.jpg";
import { NewsBlock } from "../components/NewsBlock";
import { GalleryBlock } from "../components/GalleryBlock";

const IndexPage = () => {
  const [isCallBackModalOpen, setIsCallBackModalOpen] = React.useState(false);
  const [lang, setLang] = React.useState("en");
  React.useEffect(() => {
    const lang = localStorage.getItem("lang");

    if (!lang) {
      if (window.location.href.includes("/en")) {
        setLang("en");
      } else {
        setLang("en");
      }
    } else {
      setLang(lang);
    }
  }, []);

  const seoTagsData = useStaticQuery(graphql`
    query AllContentfulSeoTags {
      allContentfulSeoTags {
        nodes {
          id
          title
          description
          keywords
          ogTitle
          ogDescription
          ogImage
          twitterTitle
          twitterDescription
          twitterImage
          lang
          createdAt
          updatedAt
        }
      }
    }
  `);

  const seoTags =
    seoTagsData.allContentfulSeoTags.nodes.find((n) => n.lang === lang) || {};

  return (
    <div>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        {seoTags.title && <title>{seoTags.title}</title>}
        {seoTags.description && (
          <meta name="description" content={seoTags.description} />
        )}
        {seoTags.keywords && (
          <meta name="keywords" content={seoTags.keywords} />
        )}

        {seoTags.ogTitle && (
          <meta property="og:title" content={seoTags.ogTitle} />
        )}
        {seoTags.ogDescription && (
          <meta property="og:description" content={seoTags.ogDescription} />
        )}
        {seoTags.ogImage && (
          <meta property="og:image" content={seoTags.ogImage} />
        )}

        {seoTags.twitterTitle && (
          <meta name="twitter:title" content={seoTags.twitterTitle} />
        )}
        {seoTags.twitterDescription && (
          <meta
            name="twitter:description"
            content={seoTags.twitterDescription}
          />
        )}
        {seoTags.twitterImage && (
          <meta name="twitter:image" content={seoTags.twitterImage} />
        )}
      </Helmet>
      <GlobalStyles />
      <Header
        setIsCallBackModalOpen={setIsCallBackModalOpen}
        lang={lang}
        setLang={setLang}
      />
      <CoverImageBackground />
      <OuterContainer>
        <InnerContainer>
          <CoverBlock lang={lang} />
        </InnerContainer>
      </OuterContainer>
      <WhiteOuterContainer>
        <InnerContainer>
          <AboutUsBlock lang={lang} isHomePage />
        </InnerContainer>
      </WhiteOuterContainer>
      <OuterContainer>
        <InnerContainer>
          <NewsBlock lang={lang} />
        </InnerContainer>
      </OuterContainer>
      {/* <WhiteOuterContainer>
        <InnerContainer>
          <AwardsBlock lang={lang} />
        </InnerContainer>
      </WhiteOuterContainer> */}
      <OuterContainer>
        <InnerContainer>
          <GalleryBlock lang={lang} isHomePage />
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

export default IndexPage;

const OuterContainer = styled.div`
  width: 100%;
  display: block;
  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const WhiteOuterContainer = styled(OuterContainer)`
  background-color: #fff;
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

const CoverImageBackground = styled.div`
  display: none;
  width: 100%;
  height: 360px;
  background-image: url(${CoverImage});
  background-size: cover;
  background-position: center;
  @media (min-width: 768px) {
    display: block;
  }
  @media (min-width: 1024px) {
    height: 640px;
  }
`;
