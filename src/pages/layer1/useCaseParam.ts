import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getCase, type CaseDoc } from '../../content/cases'

/** Resolves :caseId; redirects to the case picker when it does not exist. */
export function useCaseParam(): CaseDoc | undefined {
  const { caseId } = useParams()
  const navigate = useNavigate()
  const doc = getCase(caseId)
  useEffect(() => {
    if (!doc) navigate('/structural-conditions/cases', { replace: true })
  }, [doc, navigate])
  return doc
}
