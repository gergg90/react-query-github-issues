import { Link, Navigate, useParams } from "react-router-dom";
import LoadingIcon from "../../shared/components/LoadingIcon";
import { IssueComment } from "../components/IssueComment";
import { useIssue } from "../hooks";

export const IssueView = () => {
  const params = useParams();
  const { id = "0" } = params;
  const queryIssueHook = useIssue(+id);

  if (queryIssueHook.isLoading) return <LoadingIcon />;
  if (!queryIssueHook.data) return <Navigate to="./issues/list" />;

  return (
    <div className="row mb-5">
      <div className="col-12 mb-3">
        <Link to="./issues/list">Go Back</Link>
      </div>

      <IssueComment issue={queryIssueHook.data} />
    </div>
  );
};
