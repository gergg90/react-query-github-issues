import { useState } from "react";
import LoadingIcon from "../../shared/components/LoadingIcon";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssuesInfiniteScroll } from "../hooks";
import { State } from "../interfaces";

export const ListViewInfiniteScroll = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const [state, setState] = useState<State>();
  const { issuesQueryInfinite } = useIssuesInfiniteScroll({
    state,
    labels: selectedLabels,
  });

  const onLabelChange = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQueryInfinite.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            state={state}
            onStateChange={(newState) => setState(newState)}
            issues={issuesQueryInfinite.data?.pages.flat() || []}
          />
        )}

        <div className="card-footer bg-dark d-flex justify-content-between align-items-center pt-2">
          <button
            disabled={!issuesQueryInfinite.hasNextPage}
            onClick={() => issuesQueryInfinite.fetchNextPage()}
            className="btn btn-primary"
          >
            Load more...
          </button>
        </div>
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
