import { useForm } from "react-hook-form"
import { PostSearchForm } from "./styles"
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useIssue } from "../../../../contexts/IssueContext"

const issueSearchFormSchema = z.object({
  query: z.string()
})

type IssueSearchForm = z.infer<typeof issueSearchFormSchema>

type IssueSearchProps = {
  issuesTotal: number
}

export const IssueSearch = ({ issuesTotal }: IssueSearchProps) => {
  const { fetchIssues } = useIssue()
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(issueSearchFormSchema)
  })

  const handleSearchIssues = (data: IssueSearchForm) => {
    fetchIssues(data.query)
  }

  return (
    <PostSearchForm onSubmit={handleSubmit(handleSearchIssues)}>
      <div>
        <span>
          Publicações
        </span>
        <span>
          {issuesTotal} publicações
        </span>
      </div>
      <input
        type="text"
        placeholder="Buscar conteúdo"
        {...register('query')}
      />
    </PostSearchForm>
  )
}