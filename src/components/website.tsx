import React from "react";
import { WebsiteLink, Tags, Heading } from "./common";

import useReadMore from "../hooks/useReadMore";

interface WebsiteProps {
  icon: string;
  title: string;
  description: string;
  url: string;
  provider: string;
  tags?: string[];
}
export const Website: React.FC<WebsiteProps> = ({
  icon,
  title,
  description = "",
  url,
  provider,
  tags,
}) => {
  const [desc, ReadMoreButton] = useReadMore(description);

  return (
    <div
      css={`
        margin: 15px 0px;
        border-bottom: 1px solid ${props => props.theme.gray3};
        padding: 10px;
      `}
    >
      <div
        css={`
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        `}
      >
        <img
          css={`
            border-radius: 4px;
            margin-right: 20px;
            height: auto;
            width: 30px;
            background: ${({ theme }) => theme.gray2};
          `}
          src={icon}
          alt={`Thumbnail for ${title}`}
        />
        <div
          css={`margin-top 8px; min-height: 50px; display: flex; align-items: center; flex-wrap: wrap;`}
        >
          <Heading>{title}</Heading>
          <small
            css={`
              padding-left: 8px;
            `}
          >
            by {provider}
          </small>
        </div>
      </div>
      <div>
        <p
          css={`
            margin-bottom: 0;
            margin-top: 10px;
          `}
          dangerouslySetInnerHTML={{ __html: desc }}
        />

        <ReadMoreButton />

        <div
          css={`
            display: flex;
            align-items: center;
            margin-top: 12px;
            flex-wrap: wrap;
          `}
        >
          {tags && tags.length && <Tags tags={tags} />}

          {url && <WebsiteLink url={url} />}
        </div>
      </div>
    </div>
  );
};

export default Website;
