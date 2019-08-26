import React, { useState } from "react";
import { Link } from "gatsby";
import ListLayout from "../components/list-layout";
import ListItem from "../components/list-item";
import Search from "../components/search";
import Heading from "../components/heading";

const Quiz = props => {
  const [filter, setFilter] = useState("");
  const { quizzes } = props.pageContext;
  const { otherQuizzes } = props.pageContext;

  const filteredQuizzes = quizzes.filter(({ node }) => {
    if (node.data.Name.toLowerCase().includes(filter.toLowerCase())) {
      return true;
    }
    return false;
  });

  const filteredOtherQuizzes = otherQuizzes.filter(quiz => {
    if (
      (quiz.title && quiz.title.toLowerCase().includes(filter.toLowerCase())) ||
      (quiz.description &&
        quiz.description.toLowerCase().includes(filter.toLowerCase())) ||
      (quiz.tag && quiz.tag.toLowerCase().includes(filter.toLowerCase()))
    ) {
      return true;
    }
    return false;
  });

  return (
    <ListLayout
      title="Dev Quizzes"
      description="Front end developer quizzes. JavaScript, TypeScript, HTML, CSS, and more."
      keywords={["quiz", "quizzes"]}
      type="quizzes"
      pathname="/quizzes"
    >
      <Search
        onChange={value => {
          setFilter(value);
        }}
      />
      <small
        css={`
          padding-left: 10px;
        `}
      >
        Showing {filteredQuizzes.length + filteredOtherQuizzes.length} of{" "}
        {otherQuizzes.length + quizzes.length}
      </small>
      <div>
        <div
          css={`
            display: flex;
            flex-wrap: wrap;
            background: #000000;
            background: -webkit-linear-gradient(to right, #333, #000000);
            background: linear-gradient(to right, #333, #000000);

            padding-top: 20px;
            margin-top: 20px;
            border-radius: 10px;
            justify-content: center;
          `}
        >
          {filteredQuizzes.map(({ node }) => {
            return (
              <Link
                key={node.data.Name}
                to={`/${node.data.Slug}`}
                css={`
                  border-radius: 20px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  margin: 10px;
                  min-width: 180px;
                  padding: 10px;
                  text-decoration: none;
                  color: ${props => props.theme.blue};
                  transition: background-color 0.5s;

                  @media (min-width: 500px) {
                    &:hover {
                      background-color: ${props => props.theme.gray2};
                    }
                  }
                  @media (max-width: 500px) {
                    &:active {
                      background-color: #dadada;
                    }
                  }
                `}
              >
                <img
                  css={`
                    height: 100px;
                    width: 100px;
                    margin-bottom: 10px;
                  `}
                  src={node.data.Thumbnail[0].url}
                  alt={`${node.data.Name} Quiz`}
                />

                <Heading> {node.data.Name} Quiz</Heading>

                <div
                  css={`
                    color: ${props => props.theme.orange};
                    font-weight: bold;
                  `}
                >
                  {node.data.Count} Questions
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <br />

      <h3>Other Community Quizzes</h3>
      {filteredOtherQuizzes.map(site => {
        return (
          <ListItem
            key={site.url}
            title={site.title}
            description={site.description}
            url={site.url}
            // provider={site.provider}
            tags={site.tags}
          />
        );
      })}
    </ListLayout>
  );
};

export default Quiz;
