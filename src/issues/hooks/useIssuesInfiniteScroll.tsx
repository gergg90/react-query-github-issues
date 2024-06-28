import { useInfiniteQuery } from "@tanstack/react-query";
import { githubApi } from "../../apis/githubApi";
import { Issue, State } from "../interfaces";

interface Props {
  state?: State;
  labels: string[];
  page?: number;
}

interface QueryProps {
  pageParam?: number;
  queryKey: (string | Props)[];
}

const getIssuesInfinite = async ({
  pageParam = 1,
  queryKey,
}: QueryProps): Promise<Issue[]> => {
  // await sleep(2);

  const [, , args] = queryKey;
  const { state, labels } = args as Props;

  console.log(labels.length);

  const params = new URLSearchParams();

  if (state) params.append("state", state);
  if (labels.length > 0) {
    const labelString = labels.join(",");
    params.append("labels", labelString);
  }

  params.append("page", pageParam?.toString());

  params.append("per_page", "5");

  const { data } = await githubApi.get<Issue[]>("/issues", {
    params,
  });
  return data;
};

export const useIssuesInfiniteScroll = ({ labels, state }: Props) => {
  const issuesQueryInfinite = useInfiniteQuery({
    queryKey: ["issues", "infinite", { labels, state }],
    queryFn: (data) => getIssuesInfinite(data),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return;
      return pages.length + 1;
    },
  });

  return { issuesQueryInfinite };
};
