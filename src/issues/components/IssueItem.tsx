import { useQueryClient } from "@tanstack/react-query";
import { FiCheckCircle, FiInfo, FiMessageSquare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getCommentInfo, getIssueInfo } from "../hooks";
import { Issue, State } from "../interfaces";

interface Props {
  issue: Issue;
}

const getDayAgo = (dateString: Date): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 6 * 24));

  return `${diffDays} days ago`;
};

export const IssueItem = ({ issue }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  //? carga la data en cache incluyendolo en la queryKey
  const prefetchData = () => {
    queryClient.prefetchQuery({
      queryKey: ["issue", issue.number],
      queryFn: () => getIssueInfo(issue.number),
    });

    queryClient.prefetchQuery({
      queryKey: ["issueComments", issue.number],
      queryFn: () => getCommentInfo(issue.number),
    });
  };

  const preSetData = () => {
    queryClient.setQueryData(["issue", issue.number], issue, {
      updatedAt: new Date().getTime() + 10000,
    });
  };

  return (
    <div
      onClick={() => navigate(`/issues/issue/${issue.number}`)}
      onMouseEnter={preSetData}
      className="card mb-2 issue"
    >
      <div className="card-body d-flex align-items-center">
        {issue.state === State.Open ? (
          <FiInfo size={30} color="red" />
        ) : (
          <FiCheckCircle size={30} color="green" />
        )}

        <div className="d-flex flex-column flex-fill px-2">
          <span>{issue.title}</span>
          <span className="issue-subinfo">
            #{issue.number} opened {getDayAgo(issue.created_at)} by{" "}
            <span className="fw-bold">{issue.user.login}</span>
          </span>
        </div>

        <div className="d-flex align-items-center">
          <img
            src={issue.user.avatar_url}
            alt="User Avatar"
            className="avatar"
          />
          <span className="px-2">{issue.comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  );
};
