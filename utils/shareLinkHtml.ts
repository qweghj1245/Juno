import PostApi from "@api/PostApi";

const cssStyle = {
  div: `
    width: 100%;
    height: 78px;
    border-radius: 20px;
    border: solid 1px #EDEDED;
  `,
  wrapper: `
    display: flex;
    align-items: center;
  `,
  leftContent: `
    padding: 16px;
    width: calc(100% - 78px);
  `,
  title: `
    font-size: 16px;
    line-height: 22px;
    font-weight: bold;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  content: `
    font-size: 14px;
    line-height: 20px;
    color: #B5B5B5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  image: `
    width: 78px;
    height: 78px;
    border-radius: 0 20px 20px 0;
    object-fit: cover;
  `,
};

interface Payload {
  url: string;
}

export default async function shareLinkHtml(payload: Payload) {
  try {
    const { url } = payload;
    const linkInfo = await PostApi.fetchLinkPageInfo({ link: url });
    return `
        <div style="${cssStyle.div}">
          <a href="${linkInfo.url}" target="_blank" style="${cssStyle.wrapper}">
            <div style="${cssStyle.leftContent}">
              <h2 style="${cssStyle.title}">${linkInfo.title}</h2>
              <p style="${cssStyle.content}">${linkInfo.description}</p>
            </div>
            <img src="${linkInfo.image}" alt="share link" style="${cssStyle.image}" />
          </a>
        </div>
      `;
  } catch (error) {
    return "";
  }
}
