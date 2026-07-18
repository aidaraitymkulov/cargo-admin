import { skipToken } from '@reduxjs/toolkit/query'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetMeQuery } from '@/features/auth'
import { NewsDeleteDialog, NewsFormView, NewsReadView, useGetNewsByIdQuery } from '@/features/news'
import { ROUTES } from '@/shared/config'
import { ROLE } from '@/shared/constants/enums'

const NewsDetailPage = () => {
  const { id } = useParams<{ id?: string }>()
  const navigate = useNavigate()
  const isCreateMode = !id

  const { data, isLoading } = useGetNewsByIdQuery(id ?? skipToken)

  const { data: user } = useGetMeQuery()
  const isSuperAdmin = user?.role === ROLE.SUPER_ADMIN

  const [editing, setEditing] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  if (!isCreateMode && isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="size-10 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!isCreateMode && !data) return null

  const showForm = isCreateMode || editing

  return (
    <>
      {showForm ? (
        <NewsFormView
          data={data}
          isCreateMode={isCreateMode}
          onSaved={(savedId) => {
            if (isCreateMode) navigate(ROUTES.NEWS.DETAIL(savedId))
            else setEditing(false)
          }}
          onCancel={() => {
            if (isCreateMode) navigate(ROUTES.NEWS.LIST)
            else setEditing(false)
          }}
        />
      ) : (
        data && (
          <NewsReadView
            data={data}
            isSuperAdmin={isSuperAdmin}
            onEdit={() => setEditing(true)}
            onDelete={() => setShowDelete(true)}
          />
        )
      )}

      {showDelete && data && (
        <NewsDeleteDialog id={data.id} title={data.title} onCancel={() => setShowDelete(false)} />
      )}
    </>
  )
}

export default NewsDetailPage
