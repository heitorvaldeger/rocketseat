import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { Issue } from "../models/issue";
import { api } from "../lib/api";
import { USER_REPOSITORY_GITHUB_PATH } from "../constants";

interface IssueContextValues {
  issues: Issue[]
  issuesTotal: number
  fetchIssues: (query?: string) => void
}

export const IssueContext = createContext({} as IssueContextValues)

export const IssueProvider = ({ children }: PropsWithChildren) => {
  const [issues, setIssues] = useState<Issue[]>([])
  const [ issuesTotal, setIssuesTotal ] = useState(0)

  const fetchIssues = async (query?: string) => {
    const querys = []
    if (query) {
      querys.push(query)
    }
    querys.push(`repo:${USER_REPOSITORY_GITHUB_PATH}`)

    const response = await api.get('search/issues', {
      params: {
        q: querys.join(' ')
      }
    })

    setIssues(response.data.items)
    setIssuesTotal(response.data.total_count)
  }

  useEffect(() => {
    if (!issues.length) {
      fetchIssues()
    }
  }, [])

  return (
    <IssueContext.Provider value={{
      issues,
      issuesTotal,
      fetchIssues
    }}>
      {children}
    </IssueContext.Provider>
  )
}

export const useIssue = () => {
  const issueContext = useContext(IssueContext)
  if (!issueContext) {
    throw new Error('IssueContext creation failed!')
  }

  return issueContext
}