import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { githubApi } from "../../apis/githubApi";
import { sleep } from "../../helpers/sleep";
import { Issue, State } from "../interfaces";

interface Props {
  state?: State;
  labels: string[];
  page?: number;
}

const getIssues = async ({
  labels,
  page = 1,
  state,
}: Props): Promise<Issue[]> => {
  await sleep(2);

  const params = new URLSearchParams();

  if (state) params.append("state", state);
  if (labels.length > 0) {
    const labelString = labels.join(",");
    params.append("labels", labelString);
  }

  params.append("page", page?.toString());

  params.append("per_page", "5");

  const { data } = await githubApi.get<Issue[]>("/issues", {
    params,
  });
  return data;
};

export const useIssues = ({ state, labels }: Props) => {
  const [page, setPage] = useState(1);

  const issuesQuery = useQuery({
    queryKey: ["issues", { state, labels, page }],
    queryFn: () => getIssues({ labels, state, page }),
  });

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return;
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  return { issuesQuery, page, nextPage, prevPage };
};
