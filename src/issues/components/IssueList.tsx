import { Issue, State } from "../interfaces";
import { IssueItem } from "./IssueItem";

interface Props {
  issues: Issue[];
  state?: State;
  onStateChange: (state?: State) => void;
}

export const IssueList = ({ issues, state, onStateChange }: Props) => {
  return (
    <div className="card border-white">
      <div className="card-header bg-dark">
        <ul className="nav nav-pills card-header-pills">
          <li className="nav-item">
            <a
              onClick={() => onStateChange()}
              className={`nav-link ${!state ? "active" : ""}`}
            >
              All
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() => onStateChange(State.Open)}
              className={`nav-link ${state === State.Open ? "active" : ""}`}
            >
              Open
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() => onStateChange(State.Close)}
              className={`nav-link ${state === State.Close ? "active" : ""}`}
            >
              Closed
            </a>
          </li>
        </ul>
      </div>
      <div className="card-body text-dark">
        {issues.map((issue) => (
          <IssueItem issue={issue} key={issue.id} />
        ))}
      </div>
      <div className="card-footer bg-dark d-flex justify-content-between align-items-center">
        <button className="btn btn-primary">Prev</button>
        <span>2</span>
        <button className="btn btn-primary">Next</button>
      </div>
    </div>
  );
};
