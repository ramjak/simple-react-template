import { FC } from "react";
import classes from "./UserPage.module.scss";
import ROUTES, { IRouteParams, Link, useParams } from "../../routes";

interface IUserPage {}

const UserPage: FC<IUserPage> = (props) => {
  const { username } = useParams<IRouteParams["viewUser"]>();

  return (
    <div className={classes.userPage}>
      <div className={classes.shortProfile}>
        <img src="https://via.placeholder.com/32" alt="" />
        <div>Name</div>
        <div className={classes.username}>@{username}</div>
      </div>
      <div className={classes.repoHeader}>Repositories:</div>
      <div className={classes.result}>
        <div className={classes.listRepo}>
          {Array(20)
            .fill(true)
            .map(() => (
              <Link route={ROUTES.viewRepo} params={[username, "repo"]}>
                <div className={classes.repo}>
                  <div>name</div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
