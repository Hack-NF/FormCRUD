import UserRow from './UserRow'

export default function UserTable({ users, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead>
            <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="px-4 py-3.5 sm:px-6">Avatar</th>
              <th className="px-4 py-3.5 sm:px-6">First Name</th>
              <th className="px-4 py-3.5 sm:px-6">Last Name</th>
              <th className="px-4 py-3.5 sm:px-6">Password</th>
              <th className="px-4 py-3.5 sm:px-6">Email</th>
              <th className="px-4 py-3.5 text-right sm:px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {users.length > 0 ? (
              users.map((user) => (
                <UserRow key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-14 text-center sm:px-6">
                  <p className="text-sm font-medium text-slate-500">No users yet</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Add your first user using the form above.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
