import { useParams } from "react-router-dom"
import { IssueHeader } from "./components/IssueHeader"
import { IssueContainer } from "./styles"
import { useEffect, useState } from "react"
import { Issue } from "../../models/issue"
import { api } from "../../lib/api"
import { MarkdownHooks } from "react-markdown"
import rehypeRaw from "rehype-raw"
import rehypeStarryNight from "rehype-starry-night"
import remarkGfm from "remark-gfm"
import { USER_REPOSITORY_GITHUB_PATH } from "../../constants"

export const IssuePage = () => {
  const { id } = useParams()
  const [issue, setIssue] = useState<Issue | null>(null)

  const fetchIssue = async (idIssue: number) => {
    const response = await api.get(`repos/${USER_REPOSITORY_GITHUB_PATH}/issues/${idIssue}`)
    setIssue(response.data)
  }

  useEffect(() => {
    if (id) {
      fetchIssue(id as unknown as number)
    }
  }, [id])

  if (!issue) {
    return
  }

  return (
    <IssueContainer>
      <IssueHeader issue={issue} />

      <article className="markdown-body">
        <MarkdownHooks rehypePlugins={[rehypeRaw, rehypeStarryNight]} remarkPlugins={[remarkGfm]}>
          {issue.body}
        </MarkdownHooks>
      </article>
    </IssueContainer>
  )
}