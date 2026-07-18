import { useNavigate, useParams } from 'react-router-dom'
import { BranchMapView, useGetBranchesQuery } from '@/features/branches'
import { ROUTES } from '@/shared/config'

const BranchesMapPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { data } = useGetBranchesQuery()

  return (
    <BranchMapView
      branches={data ?? []}
      focusId={id ?? null}
      onBack={() => navigate(ROUTES.BRANCHES.LIST)}
    />
  )
}

export default BranchesMapPage
