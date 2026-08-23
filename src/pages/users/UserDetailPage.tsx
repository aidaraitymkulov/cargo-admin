import { AlertCircle, Loader2, Users } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserProductsFilter, UserProductsTable } from '@/features/products'
import { DeleteUserDialog, UserDetailCard, useGetUserByIdQuery } from '@/features/users'
import { PageHeader } from '@/layout'
import { ROUTES } from '@/shared/config'

const UserDetailPage = () => {
  const { id = '' } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [deleteOpen, setDeleteOpen] = useState(false)

  const { data: user, isLoading, isError } = useGetUserByIdQuery(id)

  return (
    <div className="flex flex-col">
      <PageHeader
        title={user ? `${user.firstName} ${user.lastName}` : 'Пользователь'}
        breadcrumbs={[{ label: 'Пользователи', to: ROUTES.USERS.LIST }]}
      />

      <div className="max-w-240 mx-auto w-full px-7 py-7">
        {isLoading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="size-8 animate-spin text-stone-300 dark:text-white/20" />
          </div>
        ) : isError || !user ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-stone-100 dark:bg-ink-800 text-stone-300 dark:text-white/20">
              {isError ? (
                <AlertCircle size={28} strokeWidth={1.2} />
              ) : (
                <Users size={28} strokeWidth={1.2} />
              )}
            </div>
            <p className="text-[16px] font-semibold text-stone-600 dark:text-white/65">
              {isError ? 'Не удалось загрузить пользователя' : 'Пользователь не найден'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <UserDetailCard user={user} onDeleteClick={() => setDeleteOpen(true)} />
            <div>
              <UserProductsFilter userId={id} />
              <UserProductsTable userId={id} />
            </div>
          </div>
        )}
      </div>

      {deleteOpen && user && (
        <DeleteUserDialog
          user={user}
          onClose={() => setDeleteOpen(false)}
          onDeleted={() => navigate(ROUTES.USERS.LIST)}
        />
      )}
    </div>
  )
}

export default UserDetailPage
