import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import classes from "./HomePage.module.scss";
import ROUTES, { Link } from "../../routes";

interface IHomePage {}

const HomePage: FC<IHomePage> = (props) => {
  return (
    <div className={classes.homePage}>
      <div className={classes.searchBar}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={classes.searchIcon}
        />
        <input
          type="text"
          className={classes.input}
          placeholder="Search user"
        />
      </div>
      <div className={classes.result}>
        <div className={classes.listUser}>
          {Array(20)
            .fill(true)
            .map(() => (
              <Link route={ROUTES.viewUser} params={["test"]}>
                <div className={classes.user}>
                  <img src="https://via.placeholder.com/32" alt="" />
                  <div>name</div>
                  <div className={classes.username}>username</div>
                </div>
              </Link>
            ))}
        </div>
        {/*<div className={classes.higlight}>highlight</div>*/}
      </div>
    </div>
  );
};

export default HomePage;
