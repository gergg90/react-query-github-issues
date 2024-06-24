import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../apis/githubApi";
import { sleep } from "../../helpers/sleep";
import { Issue } from "../interfaces";

export const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
  await sleep(2);
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);

  return data;
};

export const getCommentInfo = async (issueNumber: number): Promise<Issue[]> => {
  await sleep(2);
  const { data } = await githubApi.get<Issue[]>(
    `/issues/${issueNumber}/comments`
  );

  return data;
};

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery({
    queryKey: ["issue", issueNumber],
    queryFn: () => getIssueInfo(issueNumber),
  });

  const commentsQuery = useQuery({
    queryKey: ["issueComments", issueNumber],
    queryFn: () => getCommentInfo(issueQuery.data!.number),
    enabled: issueQuery.data !== undefined,
  });

  return { issueQuery, commentsQuery };
};
