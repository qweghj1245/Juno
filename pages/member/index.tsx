import PostCard from "@components/PostCard";
import {
  fetchMemberAggregate,
  fetchMemberCollects,
  fetchMemberPost,
  memberState,
} from "@redux/memberSlice";
import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import sizeStyle from "@styles/sizeStyle";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import styled from "styled-components";

const MemberInfo = styled.section`
  padding: 16px;
  border-bottom: solid 1px ${({ theme: { color } }) => color.grey100};

  p {
    height: 20px;
  }
`;

const Avator = styled.img`
  margin-right: 12px;
  border-radius: 50%;
  object-fit: cover;
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

const MemberIntro = styled.div`
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

const NoPost = styled.p`
  text-align: center;
  padding: 28px 0;
  color: ${({ theme: { color } }) => color.grey500};
  ${fontStyle("12px", "17px", "bold")};
`;

type Tab = "owner" | "collect";

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
  const {
    memberProile,
    memberAggregate,
    memberPost,
    postTags,
    memberCollects,
  } = useSelector(memberState);

  const [tab, setTab] = useState<Tab>("owner");

  const postList = useMemo(() => {
    switch (tab) {
      case "owner":
        if (memberPost.length === 0) {
          return <NoPost>還沒有發表文章</NoPost>;
        }

        return memberPost.map((post) => (
          <PostCard key={post.id} post={post} postTags={postTags} />
        ));
      case "collect":
        if (memberCollects.length === 0) {
          return <NoPost>還沒有發表文章</NoPost>;
        }

        return memberCollects.map((post) => (
          <PostCard key={post.id} post={post} postTags={postTags} />
        ));
      default:
        return null;
    }
  }, [tab, memberPost, memberCollects, postTags]);

  useEffect(() => {
    if (memberProile) {
      dispatch(fetchMemberAggregate());
      dispatch(fetchMemberPost({}));
      dispatch(fetchMemberCollects({}));
    } else {
      router.push("/login");
    }
  }, [memberProile]);

  return (
    <>
      <MemberInfo>
        <Row>
          <Avator src={memberProile?.avator} alt={memberProile?.avatorAlt} />
          <Name>{memberProile?.name}</Name>
          <Link href="/member/edit">
            <SettingScope>
              <CustomImage src="/static/icon_cog_gray@3x.png" alt="" />
            </SettingScope>
          </Link>
        </Row>
        {memberProile && (
          <MemberIntro
            dangerouslySetInnerHTML={{ __html: memberProile.description }}
          />
        )}
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
          onChange={(option) => setTab(option!.value as Tab)}
        />
      </Selector>
      <CardWrapper>{postList}</CardWrapper>
    </>
  );
}
