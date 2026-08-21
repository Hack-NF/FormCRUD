import UserForm from './components/UserForm'
import UserTable from './components/UserTable'
import Pagination from './components/Pagination'
import { useUsers } from './js/users'

function App() {
  const {
    users,
    loading,
    error,
    mutationError,
    editingUser,
    totalPages,
    safePage,
    visibleUsers,
    retry,
    submit,
    edit,
    remove,
    cancel,
    dismissError,
    setCurrentPage,
  } = useUsers()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50/50 to-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {mutationError && (
            <div className="flex items-center justify-between gap-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <span>{mutationError}</span>
              <button
                type="button"
                onClick={dismissError}
                className="rounded-md p-1 text-red-400 transition hover:bg-red-100 hover:text-red-600"
                aria-label="Dismiss"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          <UserForm
            key={editingUser ? editingUser.id : 'new'}
            editingUser={editingUser}
            onSubmit={submit}
            onCancel={cancel}
          />

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">All Users</h2>
              <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                {loading ? 'Loading…' : `${users.length} ${users.length === 1 ? 'user' : 'users'}`}
              </span>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white py-16 shadow-sm">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
                <p className="mt-4 text-sm text-slate-500">Loading users…</p>
              </div>
            ) : error ? (
              <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-12 text-center shadow-sm">
                <p className="text-sm font-semibold text-red-700">
                  Failed to load users
                </p>
                <p className="mt-1 text-sm text-red-500">{error}</p>
                <button
                  type="button"
                  onClick={retry}
                  className="mt-4 rounded-md bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <UserTable
                  users={visibleUsers}
                  onEdit={edit}
                  onDelete={remove}
                />
                <Pagination
                  currentPage={safePage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  totalItems={users.length}
                  pageSize={5}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
