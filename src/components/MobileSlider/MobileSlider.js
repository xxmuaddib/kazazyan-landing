import * as React from "react";
import Slider from "react-slick";
import styled from "styled-components";

const mobileSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: false,
  arrows: false,
};

export const MobileSlider = ({ sliderItems, mobileSliderRef, lang }) => {
  return (
    <MobileSliderContainer>
      <Slider {...mobileSettings} ref={mobileSliderRef}>
        {sliderItems.map((item, index) => (
          <SliderItem key={index}>
            <SliderItemImage src={item.image?.url} />
            <SliderTextContainer>
              <SliderItemTitle>{item.title}</SliderItemTitle>
              <SliderItemDescription>{item.text?.text}</SliderItemDescription>
              {item.pdf?.url && (
                <SliderItemPdfLink href={item.pdf?.url}>
                  {lang === "ru" ? "Скачать PDF" : "Download PDF"}
                </SliderItemPdfLink>
              )}
            </SliderTextContainer>
          </SliderItem>
        ))}
      </Slider>
    </MobileSliderContainer>
  );
};

const MobileSliderContainer = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  margin-bottom: 60px;
  @media (min-width: 768px) {
    display: none;
  }
`;

const SliderRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 32px;
  }
`;

const SliderCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  > div {
    max-width: 25%;
  }
`;

const SliderItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 16px;
`;

const SliderItemImage = styled.img`
  width: 100%;
  height: 100%;
`;

const SliderItemTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  line-height: 130%;
  margin-bottom: 6px;
  @media (min-width: 1024px) {
    font-size: 24px;
  }
`;

const SliderItemDescription = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 130%;
`;

const SliderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding: 16px;
`;

const SliderItemPdfLink = styled.a`
  font-size: 16px;
  font-weight: 400;
  line-height: 130%;
  color: #000;
  text-decoration: underline;
  margin-top: 24px;
  cursor: pointer;
`;
