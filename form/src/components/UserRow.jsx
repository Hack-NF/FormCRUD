import { useState } from 'react'
import Avatar from './Avatar'

export default function UserRow({ user, onEdit, onDelete }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <tr className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50">
      <td className="px-4 py-3 sm:px-6">
        <Avatar
          name={`${user.firstName} ${user.lastName}`}
          size="md"
        />
      </td>
      <td className="px-4 py-3 text-sm font-medium text-slate-900 sm:px-6">
        {user.firstName}
      </td>
      <td className="px-4 py-3 text-sm text-slate-700 sm:px-6">
        {user.lastName}
      </td>
      <td className="px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <code className="font-mono text-sm text-slate-700">
            {showPassword ? user.password : '••••••••'}
          </code>
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="rounded-md p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600"
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-slate-700 sm:px-6">{user.email}</td>
      <td className="px-4 py-3 text-right sm:px-6">
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => onEdit(user)}
            className="rounded-md p-2 text-indigo-600 transition hover:bg-indigo-50"
            title="Edit user"
          >
            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onDelete(user.id)}
            className="rounded-md p-2 text-rose-600 transition hover:bg-rose-50"
            title="Delete user"
          >
            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  )
}
