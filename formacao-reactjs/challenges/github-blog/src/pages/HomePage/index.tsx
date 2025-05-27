import { IssueCard } from "./components/IssueCard";
import { Profile } from "./components/Profile";
import { IssueSearch } from "./components/IssueSearch";
import { IssueList } from "./styles";
import { useIssue } from "../../contexts/IssueContext";

export const HomePage = () => {
  const { issues, issuesTotal } = useIssue()

  return (
    <main>
      <Profile />
      <IssueSearch issuesTotal={issuesTotal} />

      <IssueList>
        {
          issues.map(issue => (
            <IssueCard key={issue.number} issue={issue} />
          ))
        }
      </IssueList>
    </main>
  );
};
