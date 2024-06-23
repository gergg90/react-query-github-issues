import { useState } from "react";
import LoadingIcon from "../../shared/components/LoadingIcon";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssues } from "../hooks";

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const issuesQueryHook = useIssues();

  const onLabelChange = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQueryHook.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList issues={issuesQueryHook.data || []} />
        )}
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName) => onLabelChange(labelName)}
        />
      </div>
    </div>
  );
};
