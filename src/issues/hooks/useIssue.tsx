import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../apis/githubApi";
import { sleep } from "../../helpers/sleep";
import { Issue } from "../interfaces";

const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
  await sleep(2);
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
  console.log(data);

  return data;
};

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery({
    queryKey: ["issue", issueNumber],
    queryFn: () => getIssueInfo(issueNumber),
  });

  return issueQuery;
};
