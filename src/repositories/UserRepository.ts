import { useCallback, useRef } from "react";
import IUser from "../domains/user";
import IRequestService from "../services/IRequestService";
import RequestService from "../services/RequestService";

interface userSearchRes {
  // eslint-disable-next-line camelcase
  items: { login: string; avatar_url: string }[];
}

const useUserRepositories = () => {
  const requestService: IRequestService = useRef(new RequestService()).current;
  const search = useCallback(
    (q: string): Promise<IUser[]> => {
      return requestService
        .get<userSearchRes>(`/search/users`, {
          queryObj: { q, perPage: "20" },
        })
        .then((res) =>
          res.items.map((u) => ({ username: u.login, avatarUrl: u.avatar_url }))
        );
    },
    [requestService]
  );

  return {
    search,
  };
};

export default useUserRepositories;
