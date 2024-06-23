import ReactMarkdown from "react-markdown";
import { Issue } from "../interfaces";

interface Props {
  issue: Issue;
}

export const IssueComment = ({ issue }: Props) => {
  return (
    <div className="col-12">
      <div className="card border-white mt-2">
        <div className="card-header bg-dark">
          <img
            src={issue?.user.avatar_url}
            alt="User Avatar"
            className="avatar"
          />
          <span className="mx-2">{issue?.title}</span>
        </div>
        <div className="card-body text-dark">
          <ReactMarkdown>{issue.body}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
