import Markdown from "react-markdown";
import { Issue } from "../../../../models/issue";
import { CardContainer } from "./styles";
import rehypeRaw from 'rehype-raw'
import { useNavigate } from "react-router-dom";
import { IssueDateDisplay } from "../../../../components/IssueDateDisplay";

type IssueCardProps = {
  issue: Issue
}

export const IssueCard = ({ issue }: IssueCardProps) => {
  const navigate = useNavigate()

  const handleNavigateToPost = (idIssue: string) => {
    navigate(`post/${idIssue}`)
  }

  return (
    <CardContainer>
      <header>
        <span onClick={() => handleNavigateToPost(issue.number.toString())}>{issue.title}</span>
        <IssueDateDisplay date={issue.created_at}/>
      </header>

      <p>
        {
          issue.body ? (
            <Markdown rehypePlugins={[rehypeRaw]}>
              {issue.body}
            </Markdown>
          ) : (
            'Not description'
          )
        }
      </p>
    </CardContainer>
  );
};
