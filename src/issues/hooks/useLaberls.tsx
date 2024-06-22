import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../apis/githubApi";
import { sleep } from "../../helpers/sleep";
import { Label } from "../interfaces";

const getLabelsIssues = async (): Promise<Label[]> => {
  await sleep(1);
  const { data } = await githubApi.get<Label[]>("/labels");
  return data;
};

export const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ["labels"],
    queryFn: getLabelsIssues,
    staleTime: 1000 * 60 * 60,
    // initialData: [], //! este caso va a mantener la data en cache segun lo estipulado en staletime (1 hora)
    placeholderData: [
      {
        id: 791921801,
        node_id: "MDU6TGFiZWw3OTE5MjE4MDE=",
        url: "https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
        name: "❤️",
        color: "ffffff",
        default: false,
      },
      {
        id: 945148471,
        node_id: "MDU6TGFiZWw5NDUxNDg0NzE=",
        url: "https://api.github.com/repos/facebook/react/labels/Component:%20ReactIs",
        name: "Component: ReactIs",
        color: "1d76db",
        default: false,
      },
    ],
  });

  return labelsQuery;
};
