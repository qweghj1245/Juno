import {
  FetchPositiveNegative,
  FetchPositiveNegativeStatus,
} from "@api/PostApi";
import {
  fetchAddPostNegative,
  fetchAddPostPositive,
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

const Scope = styled(Row)<{ isActive: boolean }>`
  justify-content: space-between;
  min-width: 78px;
  border-radius: 20px;
  margin-right: 12px;
  padding: 8px 14px;
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

type Props = {
  postId: number;
  positiveNegative: FetchPositiveNegative;
  positiveNegativeStatus: FetchPositiveNegativeStatus;
};

export default function Evaluation(props: Props) {
  const { postId, positiveNegative, positiveNegativeStatus } = props;

  const dispatch = useDispatch();

  const [init, setInit] = useState<boolean>(false);
  const [positive, setPositive] = useState<boolean>(false);
  const [negative, setNegative] = useState<boolean>(false);
  const [positiveCount, setPositiveCount] = useState<number>(0);
  const [negativeCount, setNegativeCount] = useState<number>(0);

  const fetchSetPositive = () => {
    if (positive) {
      setPositive(false);
      setPositiveCount(positiveCount - 1);
      dispatch(fetchRemovePostPositive(postId));
    } else {
      setPositive(true);
      setPositiveCount(positiveCount + 1);
      dispatch(fetchAddPostPositive(postId));
    }
  };

  const fetchSetNegative = () => {
    if (negative) {
      setNegative(false);
      setNegativeCount(negativeCount - 1);
      dispatch(fetchRemovePostNegative(postId));
    } else {
      setNegative(true);
      setNegativeCount(negativeCount + 1);
      dispatch(fetchAddPostNegative(postId));
    }
  };

  useEffect(() => {
    if (!init) {
      if (positiveNegativeStatus.postPositive) {
        setPositive(true);
        setPositiveCount(positiveNegative.positiveCount);
        setInit(true);
      } else if (positiveNegativeStatus.postNegative) {
        setNegative(true);
        setNegativeCount(positiveNegative.negativeCount);
        setInit(true);
      }
    }
  }, [init, positiveNegativeStatus]);

  return (
    <Wrapper>
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
    </Wrapper>
  );
}
