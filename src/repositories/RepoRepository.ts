import { useCallback, useRef } from "react";
import IRepo from "../domains/repo";
import IRequestService from "../services/IRequestService";
import RequestService from "../services/RequestService";

type getReposRes = {
  // eslint-disable-next-line camelcase
  full_name: string;
  name: string;
}[];

interface getMarkdownRes {
  // eslint-disable-next-line camelcase
  download_url: string;
}

const useRepoRepositories = () => {
  const requestService: IRequestService = useRef(new RequestService()).current;
  const getAll = useCallback(
    (username: string): Promise<IRepo[]> => {
      return requestService
        .get<getReposRes>(`/users/${username}/repos`, {
          queryObj: { perPage: "100" },
        })
        .then((res) => res.map((r) => ({ name: r.name })));
    },
    [requestService]
  );

  const getMarkdownText = useCallback(
    async (owner: string, repo: string): Promise<string> => {
      const readmeDetail = await requestService.get<getMarkdownRes>(
        `/repos/${owner}/${repo}/readme`
      );
      return fetch(readmeDetail.download_url).then((res) => res.text());
    },
    [requestService]
  );

  return {
    getAll,
    getMarkdownText,
  };
};

export default useRepoRepositories;
