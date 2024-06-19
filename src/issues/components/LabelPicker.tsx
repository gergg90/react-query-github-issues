import { useQuery } from "@tanstack/react-query";

const getLabelsIssues = async () => {
  const res = await fetch("https://github.com/facebook/react/issues");
  const data = await res.json();
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
