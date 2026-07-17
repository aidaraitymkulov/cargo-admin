import { useNavigate, useParams } from 'react-router-dom'
import { useGetBranchesQuery } from '@/api/admin/branches'
import { ROUTES } from '@/config'
import { BranchMapView } from './map/BranchMapView'

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
