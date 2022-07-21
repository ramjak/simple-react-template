import { FC, useEffect, useState } from "react";
import classes from "./UserPage.module.scss";
import ROUTES, { IRouteParams, Link, useParams } from "../../routes";
import IRepo from "../../domains/repo";
import useRepoRepositories from "../../repositories/RepoRepository";

interface IUserPage {}

const UserPage: FC<IUserPage> = (props) => {
  const { username } = useParams<IRouteParams["viewUser"]>();
  const [repos, setRepos] = useState<IRepo[]>([]);

  const { getAll } = useRepoRepositories();

  useEffect(() => {
    getAll(username)
      .then((res) => setRepos(res))
      .catch((e) => console.error(e));
  }, [getAll, username]);

  return (
    <div className={classes.userPage}>
      <div className={classes.shortProfile}>
        <img src="https://via.placeholder.com/32" alt="" />
        <div>@{username}</div>
      </div>
      <div className={classes.repoHeader}>Repositories:</div>
      <div className={classes.result}>
        <div className={classes.listRepo}>
          {repos.map((r) => (
            <Link route={ROUTES.viewRepo} params={[username, r.name]}>
              <div className={classes.repo}>
                <div>{r.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
