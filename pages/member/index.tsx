import CustomImage from "@components/CustomImage";
import PostCard from "@components/PostCard";
import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import sizeStyle from "@styles/sizeStyle";
import React from "react";
import Select from "react-select";
import styled from "styled-components";

const MemberInfo = styled.section`
  padding: 16px;
  border-bottom: solid 1px ${({ theme: { color } }) => color.grey100};
`;

const Avator = styled.img`
  margin-right: 12px;
  border-radius: 50%;
  ${sizeStyle("48px", "48px")};
`;

const Name = styled.h2`
  ${fontStyle("16px", "22px", "bold")};
`;

const SettingScope = styled(Row)`
  margin-left: auto;
  justify-content: center;
  border: solid 1px ${({ theme: { color } }) => color.grey100};
  ${sizeStyle("48px", "48px")};
`;

const MemberIntro = styled.p`
  margin-top: 16px;
  ${fontStyle("14px", "20px")};
`;

const TargetGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  padding: 19px 0;
`;

const Target = styled.h4`
  text-align: center;
  color: ${({ theme: { color } }) => color.grey500};
  ${fontStyle("12px", "17px")};
`;

const TargetCount = styled.h5`
  text-align: center;
  ${fontStyle("14px", "20px", "bold")};
`;

const CardWrapper = styled.div`
  padding: 0 16px;
  margin-bottom: 50px;
`;

const Selector = styled.div`
  padding: 12px 16px;
  padding-left: 65%;
  background: ${({ theme: { color } }) => color.grey100};
`;

const SelectStyle = {
  control: () => ({
    background: "transparent",
    border: 0,
    display: "flex",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

const options = [
  { value: "owner", label: "發表的文章" },
  { value: "collect", label: "收藏的文章" },
];

export default function Member() {
  return (
    <>
      <MemberInfo>
        <Row>
          <Avator />
          <Name>我是小笨寶寶</Name>
          <SettingScope>
            <CustomImage
              url="/static/assets/icons/icon_cog_gray@3x.png"
              width={22}
              height={22}
              alt=""
            />
          </SettingScope>
        </Row>
        <MemberIntro>
          宜蘭平埔族，在地生活三十年，三代傳承農耕經驗
          二十年，蘭陽平原農業委員會會長、永續環境耕作講師
        </MemberIntro>
      </MemberInfo>
      <TargetGrid>
        <div>
          <Target>文章數</Target>
          <TargetCount>200</TargetCount>
        </div>
        <div>
          <Target>總讚數</Target>
          <TargetCount>200</TargetCount>
        </div>
        <div>
          <Target>積分</Target>
          <TargetCount>200</TargetCount>
        </div>
      </TargetGrid>
      <Selector>
        <Select styles={SelectStyle} options={options} />
      </Selector>
      <CardWrapper>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </CardWrapper>
    </>
  );
}
