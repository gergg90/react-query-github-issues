import { useInfiniteQuery } from "@tanstack/react-query";
import { githubApi } from "../../apis/githubApi";
import { sleep } from "../../helpers/sleep";
import { Issue, State } from "../interfaces";

interface Props {
  state?: State;
  labels: string[];
  page?: number;
}

interface QueryProps {
  pageParams?: number;
  queryKey: (string | Props)[];
}

const getIssuesInfinite = async ({
  pageParams = 1,
  queryKey,
}: QueryProps): Promise<Issue[]> => {
  await sleep(2);

  const [, , args] = queryKey;
  const { state, labels } = args as Props;

  const params = new URLSearchParams();

  if (state) params.append("state", state);
  if (labels.length > 0) {
    const labelString = labels.join(",");
    params.append("labels", labelString);
  }

  params.append("page", pageParams?.toString());

  params.append("per_page", "5");

  const { data } = await githubApi.get<Issue[]>("/issues", {
    params,
  });
  return data;
};

export const useIssuesInfiniteScroll = ({ labels, state }: Props) => {
  const issuesQueryInfinite = useInfiniteQuery({
    queryKey: ["issues", "infinite", { labels, state, page: 1 }],
    queryFn: (data) => getIssuesInfinite(data),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
      undefined,
  });

  return { issuesQueryInfinite };
};
