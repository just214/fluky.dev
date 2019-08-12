import React, { useState } from "react";
import PodcastSuggestionForm from "../components/forms/podcast-suggestion-form";
import { TitleBox } from "../components/common";
import useMedia from "../hooks/useMedia";
import {
  BackToTop,
  SearchBox,
  WebsiteLink,
  Layout,
} from "../components/common";

const Podcasts = ({ pageContext }) => {
  const [filter, setFilter] = useState("");
  const { isMobile } = useMedia();

  const sortedPodcasts = JSON.parse(pageContext.podcasts)
    .sort((a, b) => {
      const nameA = a.title.toLowerCase();
      const nameB = b.title.toLowerCase();
      return nameA < nameB ? -1 : 1;
    })
    .filter(v => {
      if (v.title.toLowerCase().includes(filter.toLowerCase())) {
        return true;
      } else if (v.description.toLowerCase().includes(filter.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });

  // const { getCollapseProps, getToggleProps, isOpen } = useCollapse();

  return (
    <Layout>
      <BackToTop />

      <div
        css={`
          margin-bottom: 200px;
        `}
      >
        <TitleBox
          title="Podcasts"
          subTitle="A collection of the best developer and coding podcasts."
        >
          <PodcastSuggestionForm />
        </TitleBox>

        <br />
        <SearchBox onChange={value => setFilter(value)} />

        {sortedPodcasts.map(podcast => {
          return (
            <div
              key={podcast.id}
              css={`
                display: flex;
                margin: 15px 0px;
                border-bottom: 1px solid ${props => props.theme.gray3};
                padding: 10px;
                flex-direction: ${isMobile ? "column" : "row"};
                align-items: ${isMobile ? "flex-start" : "flex-start"};
              `}
            >
              <img
                css={`
                  border-radius: 10px;
                  margin-right: ${isMobile ? "0px" : "10px"};
                  height: auto;
                  margin-bottom: ${isMobile ? "10px" : "0px"};
                  width: ${isMobile ? "40%" : "150px"};
                `}
                src={podcast.thumbnail}
              />

              <div>
                <h1
                  css={`
                    font-family: "Lalezar";
                    line-height: 30px;
                  `}
                >
                  {podcast.title}
                </h1>

                <p dangerouslySetInnerHTML={{ __html: podcast.description }} />

                <div
                  css={`
                    display: flex;
                    align-items: center;
                    margin-top: 12px;
                  `}
                >
                  <p
                    css={`
                      margin: 0;
                      margin-right: 10px;
                    `}
                  >
                    {podcast.total_episodes} episodes
                  </p>
                  {podcast.website && <WebsiteLink url={podcast.website} />}
                </div>
              </div>
            </div>
          );
        })}
        <div>
          This data is provided by the awesome{" "}
          <a href="https://www.listennotes.com/api/">Listen Notes API</a> .
        </div>
      </div>
    </Layout>
  );
};

export default Podcasts;
