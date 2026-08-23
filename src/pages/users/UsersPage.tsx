import { UsersTable, UsersTableFilter } from '@/features/users'
import { PageHeader } from '@/layout'

const UsersPage = () => (
  <div className="flex flex-col">
    <PageHeader title="Пользователи" />

    <div className="max-w-300 mx-auto w-full px-7 py-7">
      <UsersTableFilter />
      <UsersTable />
    </div>
  </div>
)

export default UsersPage
