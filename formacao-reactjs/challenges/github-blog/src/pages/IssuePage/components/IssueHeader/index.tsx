import { FaChevronLeft, FaComment, FaGithub } from "react-icons/fa"
import { FaArrowUpRightFromSquare } from "react-icons/fa6"
import { IssueHeaderContainer } from "./styles"
import { Issue } from "../../../../models/issue"
import { Link, useNavigate } from "react-router-dom"
import { IssueDateDisplay } from "../../../../components/IssueDateDisplay"

type IssueHeaderProps = {
  issue: Issue
}

export const IssueHeader = ({ issue }: IssueHeaderProps) => {
  const navigate = useNavigate()

  return (
    <IssueHeaderContainer>
      <header>
        <button onClick={() => navigate(-1)}>
          <FaChevronLeft size={12}/>
          Voltar
        </button>
        <Link to={issue.html_url} target="_blank">
          Ver no github
          <FaArrowUpRightFromSquare size={12}/>
        </Link>
      </header>

      <main>
        <span>
          {issue?.title}
        </span>
      </main>

      <footer>
        <span>
          <FaGithub />
          {issue?.user.login}
        </span>

        <IssueDateDisplay date={issue.created_at} hasIcon/>

        <span>
          <FaComment />
          {issue?.comments} comentários
        </span>
      </footer>
    </IssueHeaderContainer>
  )
}