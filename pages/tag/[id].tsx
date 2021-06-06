import InfiniteScrollObserver from "@components/InfiniteScrollObserver";
import PostCard from "@components/PostCard";
import useDebounce from "@hooks/useDebounce";
import {
  fetchInfinitePosts,
  fetchPosts,
  postState,
  setIsNotInfiniteOver,
} from "@redux/postSlice";
import { wrapper } from "@redux/store";
import { fetchTag, tagState } from "@redux/tagSlice";
import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import { QueryStatus } from "api/PostApi";
import React, { FC, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled(Row)`
  flex-direction: column;
  padding: 20px 0;
  justify-content: center;
`;

const TagTitle = styled.h1`
  margin-bottom: 8px;
  ${fontStyle("24px", "33px", "bold")};
`;

const TagPostCount = styled.h5`
  margin-bottom: 16px;
  color: ${({ theme: { color } }) => color.grey500};
  ${fontStyle("12px", "17px")};
`;

const Follow = styled.button`
  padding: 8px 24px;
  border-radius: 17px;
  box-shadow: 0px 3px 12px ${({ theme: { color } }) => color.grey100};
  ${fontStyle("12px", "17px", "bold")};
`;

const MentionTitle = styled.h2`
  padding: 12px 16px;
  background: ${({ theme: { color } }) => color.grey100};
  ${fontStyle("14px", "20px", "bold")};
`;

const CardWrapper = styled.div`
  padding: 0 16px 52px 16px;
`;

type Props = {
  tagId: number;
};

const Tag: FC<Props> = (props) => {
  const { tagId } = props;

  const dispatch = useDispatch();
  const { postsResult, postTags, isInfiniteOver, isFetching } = useSelector(
    postState
  );
  const { tagInfo } = useSelector(tagState);

  const [page, setPage] = useState<number>(1);

  const onInfiniteScroll = useCallback(
    useDebounce(() => {
      if (isInfiniteOver || isFetching) return;

      dispatch(
        fetchInfinitePosts({ tagId, query: QueryStatus.NEW, page: page + 1 })
      );
      setPage((prev) => prev + 1);
    }, 500),
    [dispatch, isInfiniteOver, page]
  );

  return (
    <div>
      <Wrapper>
        <TagTitle>{`#${tagInfo?.name}`}</TagTitle>
        <TagPostCount>{`共${tagInfo?.count}篇文章`}</TagPostCount>
        {/* <Follow>追蹤</Follow> */}
      </Wrapper>
      <MentionTitle>提及的文章</MentionTitle>
      <CardWrapper>
        {postsResult.posts.map((post) => (
          <PostCard key={post.id} post={post} postTags={postTags} />
        ))}
      </CardWrapper>
      <InfiniteScrollObserver callback={onInfiniteScroll} />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  try {
    await ctx.store.dispatch(
      fetchPosts({ tagId: ctx.query.id, query: QueryStatus.NEW, page: 1 })
    );
  } catch (error) {}

  try {
    await ctx.store.dispatch(fetchTag(ctx.query.id));
  } catch (error) {}

  ctx.store.dispatch(setIsNotInfiniteOver());

  return { props: { tagId: ctx.query.id } };
});

export default Tag;
