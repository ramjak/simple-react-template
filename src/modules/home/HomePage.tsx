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
import ROUTES, { Link } from "../../routes";
import IUser from "../../domains/user";
import useUserRepositories from "../../repositories/UserRepository";

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
            <Link
              key={u.username}
              route={ROUTES.viewUser}
              params={[u.username]}
            >
              <div className={classes.user}>
                <img src={u.avatarUrl} alt="" />
                <div>{u.username}</div>
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
