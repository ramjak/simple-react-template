import { FC } from "react";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./RepoPage.module.scss";
import { IRouteParams, useParams } from "../../routes";

interface IRepoPage {}

const RepoPage: FC<IRepoPage> = (props) => {
  const { repo } = useParams<IRouteParams["viewRepo"]>();

  return (
    <div>
      <div className={classes.shortProfile}>
        <FontAwesomeIcon icon={faBook} className={classes.searchIcon} />
        <div>{repo}</div>
      </div>
    </div>
  );
};

export default RepoPage;
