import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../apis/githubApi";

const getLabelsIssues = async () => {
  const { data } = await githubApi.get("/labels");
  return data;
};

export const LabelPicker = () => {
  const labelsQuery = useQuery({
    queryKey: ["labels"],
    queryFn: getLabelsIssues,
  });

  return (
    <div>
      <span
        className="badge rounded-pill m-1 label-picker"
        style={{ border: `1px solid #ffccd3`, color: "#ffccd3" }}
      >
        Primary
      </span>
    </div>
  );
};
