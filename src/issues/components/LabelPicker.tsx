import LoadingIcon from "../../shared/components/LoadingIcon";
import { useLabels } from "../hooks/useLaberls";

interface Props {
  selectedLabels: string[];
  onChange: (label: string) => void;
}

export const LabelPicker = ({ selectedLabels, onChange }: Props) => {
  const labelsQuery = useLabels();

  if (labelsQuery.isLoading) return <LoadingIcon />;
  return (
    <div>
      {labelsQuery.data?.map((label) => (
        <span
          key={label.id}
          onClick={() => onChange(label.name)}
          className={`badge rounded-pill m-1 label-picker ${
            selectedLabels.includes(label.name) ? "label-active" : ""
          }`}
          style={{
            border: `1px solid #${label.color}`,
            color: `#${label.color}`,
          }}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
