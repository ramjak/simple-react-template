/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */
import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import debounce from "lodash.debounce";
import classes from "./HomePage.module.scss";
import ROUTES, { useNavigateTo } from "../../routes";
import IUser from "../../domains/user";
import useUserRepositories from "../../repositories/UserRepository";
import { useUserContext } from "../../contexts/UserContext";

interface IHomePage {}

const HomePage: FC<IHomePage> = (props) => {
  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<IUser[]>([]);

  const { search } = useUserRepositories();
  const onSearch = useCallback(
    async (q: string) => {
      const res = await search(q);
      setUsers(res);
    },
    [search]
  );
  const debouncedUserSearch = useRef(
    debounce(onSearch, 500, { trailing: true })
  ).current;

  const isFirstLoad = useRef(true);
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      debouncedUserSearch(query);
    }
  }, [debouncedUserSearch, query]);

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const { setUserData } = useUserContext();
  const navigateTo = useNavigateTo();
  const handleUserClick = useCallback(
    (user: IUser) => {
      setUserData(user);
      navigateTo(ROUTES.viewUser, user.username);
    },
    [navigateTo, setUserData]
  );

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
          value={query}
          onChange={handleSearch}
        />
      </div>
      <div className={classes.result}>
        <div className={classes.listUser}>
          {users.map((u) => (
            <div
              key={u.username}
              className={classes.user}
              /* eslint-disable-next-line react/jsx-no-bind */
              onClick={() => handleUserClick(u)}
              role="button"
            >
              <img src={u.avatarUrl} alt="" />
              <div>{u.username}</div>
            </div>
          ))}
        </div>
        {/*<div className={classes.higlight}>highlight</div>*/}
      </div>
    </div>
  );
};

export default HomePage;
