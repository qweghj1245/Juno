import {
  FetchPositiveNegative,
  FetchPositiveNegativeStatus,
} from "@api/PostApi";
import {
  fetchAddCollect,
  fetchAddPostNegative,
  fetchAddPostPositive,
  fetchDeleteCollect,
  fetchPatchPositiveNegativeStatus,
  fetchRemovePostNegative,
  fetchRemovePostPositive,
} from "@redux/postSlice";
import { Row } from "@styles/flexStyle";
import fontStyle from "@styles/fontStyle";
import sizeStyle from "@styles/sizeStyle";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Wrapper = styled(Row)`
  padding: 12px 17px;
  border-bottom: solid 1px ${({ theme: { color } }) => color.grey100};
`;

const Scope = styled(Row)<{ isActive: boolean; noMargin?: boolean }>`
  justify-content: space-between;
  min-width: 78px;
  border-radius: 20px;
  padding: 8px 14px;
  margin-right: ${({ noMargin }) => (noMargin ? "0px" : "12px")};
  border: solid 1px
    ${({ theme: { color }, isActive }) =>
      isActive ? color.grey500 : color.grey100};
`;

const Count = styled.span<{ isActive: boolean }>`
  color: ${({ theme: { color }, isActive }) =>
    isActive ? color.grey900 : color.grey500};
  ${fontStyle("16px", "22px")};
`;

const CustomImage = styled.img`
  ${sizeStyle("21px", "21px")};
  object-fit: contain;
`;

const Collect = styled.span<{ isActive: boolean }>`
  margin-left: 4px;
  color: ${({ theme: { color }, isActive }) =>
    isActive ? color.grey900 : color.grey500};
  ${fontStyle("14px", "20px")};
`;

type Props = {
  postId: number;
  positiveNegative: FetchPositiveNegative;
  positiveNegativeStatus: FetchPositiveNegativeStatus;
  isCollect: boolean | null;
  collectId: number | null;
  isStatusDone: boolean;
  isCountDone: boolean;
};

export default function Evaluation(props: Props) {
  const {
    postId,
    positiveNegative,
    positiveNegativeStatus,
    isCollect,
    collectId,
    isStatusDone,
    isCountDone,
  } = props;

  const dispatch = useDispatch();

  const [statusInit, setStatusInit] = useState<boolean>(false);
  const [collectInit, setCollectInit] = useState<boolean>(false);
  const [positive, setPositive] = useState<boolean>(false);
  const [negative, setNegative] = useState<boolean>(false);
  const [positiveCount, setPositiveCount] = useState<number>(0);
  const [negativeCount, setNegativeCount] = useState<number>(0);
  const [isCollectPost, setIsCollectPost] = useState<boolean>(false);

  const fetchSetPositive = () => {
    if (negative) {
      setPositive(true);
      setNegative(false);
      setPositiveCount(positiveCount + 1);
      setNegativeCount(negativeCount - 1);
      dispatch(
        fetchPatchPositiveNegativeStatus({
          postId,
          postPositive: true,
          postNegative: false,
        })
      );
    } else {
      if (positive) {
        setPositive(false);
        setPositiveCount(positiveCount - 1);
        dispatch(fetchRemovePostPositive(postId));
      } else {
        setPositive(true);
        setPositiveCount(positiveCount + 1);
        dispatch(fetchAddPostPositive(postId));
      }
    }
  };

  const fetchSetNegative = () => {
    if (positive) {
      setPositive(false);
      setNegative(true);
      setPositiveCount(positiveCount - 1);
      setNegativeCount(negativeCount + 1);
      dispatch(
        fetchPatchPositiveNegativeStatus({
          postId,
          postPositive: false,
          postNegative: true,
        })
      );
    } else {
      if (negative) {
        setNegative(false);
        setNegativeCount(negativeCount - 1);
        dispatch(fetchRemovePostNegative(postId));
      } else {
        setNegative(true);
        setNegativeCount(negativeCount + 1);
        dispatch(fetchAddPostNegative(postId));
      }
    }
  };

  const fetchSetCollect = () => {
    if (isCollectPost) {
      setIsCollectPost(false);
      dispatch(fetchDeleteCollect(collectId!));
    } else {
      setIsCollectPost(true);
      dispatch(fetchAddCollect(postId));
    }
  };

  useEffect(() => {
    if (!statusInit && isStatusDone && isCountDone) {
      setPositive(positiveNegativeStatus.postPositive);
      setPositiveCount(positiveNegative.positiveCount);
      setNegative(positiveNegativeStatus.postNegative);
      setNegativeCount(positiveNegative.negativeCount);
      setStatusInit(true);
    }
  }, [statusInit, positiveNegativeStatus, isStatusDone, isCountDone]);

  useEffect(() => {
    if (!collectInit) {
      setIsCollectPost(isCollect === null ? false : true);
      setCollectInit(true);
    }
  }, [collectInit, isCollect]);

  useEffect(() => {
    if (postId) {
      setCollectInit(false);
      setStatusInit(false);
    }
  }, [postId]);

  return (
    <Wrapper justifyContent="space-between">
      <Row>
        <Scope isActive={positive} onClick={fetchSetPositive}>
          <CustomImage
            src={
              positive
                ? "/static/lnr-thumbs-up@3x.png"
                : "/static/icon_thumbsup_gray@3x.png"
            }
            alt="thumbs up"
          />
          <Count isActive={positive}>{positiveCount}</Count>
        </Scope>
        <Scope isActive={negative} onClick={fetchSetNegative}>
          <CustomImage
            src={
              negative
                ? "/static/lnr-thumbs-down@3x.png"
                : "/static/icon_thumbsdown_gray@3x.png"
            }
            alt="thumbs down"
          />
          <Count isActive={negative}>{negativeCount}</Count>
        </Scope>
      </Row>
      <Scope noMargin isActive={isCollectPost} onClick={fetchSetCollect}>
        <CustomImage
          src={
            isCollectPost
              ? "/static/lnr-star-l@3x.png"
              : "/static/lnr-star@3x.png"
          }
          alt="collect"
        />
        <Collect isActive={isCollectPost}>收藏</Collect>
      </Scope>
    </Wrapper>
  );
}
