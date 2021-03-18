import { Row } from "@styles/flexStyle";
import sizeStyle from "@styles/sizeStyle";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

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

const CustomImage = styled.img`
  ${sizeStyle("22px", "22px")};
  object-fit: contain;
`;

const homeMatch = (location: NextRouter) => location.pathname === "/";
const categoryMatch = (location: NextRouter) =>
  location.pathname.includes("/category");
const noticeMatch = (location: NextRouter) => location.pathname === "/notice";
const memberMatch = (location: NextRouter) => location.pathname === "/member";

export default function Footer() {
  const router = useRouter();

  return (
    <Wrapper>
      <Link href="/">
        <div>
          <CustomImage
            src={
              homeMatch(router)
                ? `/static/lnr-home@3x.png`
                : `/static/icon_home_gray@3x.png`
            }
            alt="home"
          />
        </div>
      </Link>
      <Link href="/category">
        <div>
          <CustomImage
            src={
              categoryMatch(router)
                ? "/static/lnr-tag@3x.png"
                : "/static/icon_tag_gray@3x.png"
            }
            alt="tag"
          />
        </div>
      </Link>
      {/* <Link href="/login">
        <div>
          <CustomImage
            src={
              noticeMatch(router)
                ? "/static/lnr-alarm@3x.png"
                : "/static/icon_alarm_gray@3x.png"
            }
            alt="notice"
          />
        </div>
      </Link> */}
      <Link href="/member">
        <div>
          <CustomImage
            src={
              memberMatch(router)
                ? "/static/lnr-user@3x.png"
                : "/static/icon_user_gray@3x.png"
            }
            alt="user"
          />
        </div>
      </Link>
    </Wrapper>
  );
}
