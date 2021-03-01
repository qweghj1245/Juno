import { fetchMemberAggregate, memberState } from "@redux/memberSlice";
import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import sizeStyle from "@styles/sizeStyle";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

const CustomImage = styled.img`
  ${sizeStyle("22px", "22px")};
  object-fit: contain;
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
  const router = useRouter();

  const dispatch = useDispatch();
  const { memberProile, memberAggregate } = useSelector(memberState);

  useEffect(() => {
    if (memberProile) {
      dispatch(fetchMemberAggregate());
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <MemberInfo>
        <Row>
          <Avator src={memberProile?.avator} alt={memberProile?.avatorAlt} />
          <Name>{memberProile?.name}</Name>
          <SettingScope>
            <CustomImage src="/static/icon_cog_gray@3x.png" alt="" />
          </SettingScope>
        </Row>
        <MemberIntro>{memberProile?.description}</MemberIntro>
      </MemberInfo>
      <TargetGrid>
        <div>
          <Target>文章數</Target>
          <TargetCount>{memberAggregate?.publishPostCount}</TargetCount>
        </div>
        <div>
          <Target>總讚數</Target>
          <TargetCount>{memberAggregate?.bePraised}</TargetCount>
        </div>
        <div>
          <Target>積分</Target>
          <TargetCount>{memberAggregate?.quota || "0"}</TargetCount>
        </div>
      </TargetGrid>
      <Selector>
        <Select
          defaultValue={{ value: "owner", label: "發表的文章" }}
          styles={SelectStyle}
          options={options}
        />
      </Selector>
      {/* <CardWrapper>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </CardWrapper> */}
    </>
  );
}
