import { Row } from "@styles/flexStyle";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import CustomImage from "./CustomImage";

const Wrapper = styled(Row)`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  justify-content: space-between;
  padding: 14px 36px;
  background: ${({ theme: { color } }) => color.white};
  border-top: solid 1px ${({ theme: { color } }) => color.grey100};
`;

const homeMatch = (location: NextRouter) => location.pathname === "/";
const tagMatch = (location: NextRouter) => location.pathname === "/tag";
const noticeMatch = (location: NextRouter) => location.pathname === "/notice";
const memberMatch = (location: NextRouter) => location.pathname === "/member";

export default function Footer() {
  const router = useRouter();

  return (
    <Wrapper>
      <Link href="/">
        <div>
          <CustomImage
            url={
              homeMatch(router)
                ? "/static/assets/icons/lnr-home@3x.png"
                : "/static/assets/icons/icon_home_gray@3x.png"
            }
            width={22}
            height={22}
            alt=""
          />
        </div>
      </Link>
      <Link href="/">
        <div>
          <CustomImage
            url={
              tagMatch(router)
                ? "/static/assets/icons/lnr-tag@3x.png"
                : "/static/assets/icons/icon_tag_gray@3x.png"
            }
            width={22}
            height={22}
            alt=""
          />
        </div>
      </Link>
      <Link href="/">
        <div>
          <CustomImage
            url={
              noticeMatch(router)
                ? "/static/assets/icons/lnr-alarm@3x.png"
                : "/static/assets/icons/icon_alarm_gray@3x.png"
            }
            width={22}
            height={22}
            alt=""
          />
        </div>
      </Link>
      <Link href="/member">
        <div>
          <CustomImage
            url={
              memberMatch(router)
                ? "/static/assets/icons/lnr-user@3x.png"
                : "/static/assets/icons/icon_user_gray@3x.png"
            }
            width={22}
            height={22}
            alt=""
          />
        </div>
      </Link>
    </Wrapper>
  );
}
