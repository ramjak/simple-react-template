import { FC, useEffect, useState } from "react";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./RepoPage.module.scss";
import { IRouteParams, useParams } from "../../routes";
import useRepoRepositories from "../../repositories/RepoRepository";

interface IRepoPage {}

const RepoPage: FC<IRepoPage> = (props) => {
  const { username, repo } = useParams<IRouteParams["viewRepo"]>();
  const [readme, setReadme] = useState("");

  const { getMarkdownText } = useRepoRepositories();

  useEffect(() => {
    getMarkdownText(username, repo)
      .then((text) => setReadme(text))
      .catch((e) => console.error(e));
  }, [getMarkdownText, repo, username]);

  return (
    <div className={classes.repoPage}>
      <div className={classes.shortProfile}>
        <FontAwesomeIcon icon={faBook} className={classes.searchIcon} />
        <div>{repo}</div>
      </div>
      <div className={classes.readme}>
        <div>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: readme }} />
        </div>
      </div>
    </div>
  );
};

export default RepoPage;
