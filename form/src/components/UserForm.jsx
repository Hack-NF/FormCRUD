import { useState } from 'react'

const inputClass =
  'w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'

const initialForm = (user) => ({
  firstName: user?.firstName ?? '',
  lastName: user?.lastName ?? '',
  password: user?.password ?? '',
  email: user?.email ?? '',
})

export default function UserForm({ editingUser, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => initialForm(editingUser))
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const next = {}
    if (!form.firstName.trim()) next.firstName = 'First name is required'
    if (!form.lastName.trim()) next.lastName = 'Last name is required'
    if (!form.password) next.password = 'Password is required'
    else if (form.password.length < 4)
      next.password = 'Password must be at least 4 characters'
    if (!form.email.trim()) next.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = 'Enter a valid email address'
    return next
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = validate()
    if (Object.keys(next).length > 0) {
      setErrors(next)
      return
    }
    onSubmit({
      ...form,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
    })
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          {editingUser ? 'Edit User' : 'Add New User'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-slate-700">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="e.g. Ahmed"
            value={form.firstName}
            onChange={handleChange}
            className={`${inputClass} ${errors.firstName ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : ''}`}
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-rose-500">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-slate-700">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="e.g. Khan"
            value={form.lastName}
            onChange={handleChange}
            className={`${inputClass} ${errors.lastName ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : ''}`}
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-rose-500">{errors.lastName}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className={`${inputClass} ${errors.password ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : ''}`}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-rose-500">{errors.password}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="e.g. ahmed@gmail.com"
            value={form.email}
            onChange={handleChange}
            className={`${inputClass} ${errors.email ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : ''}`}
          />
          {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email}</p>}
        </div>

        <div className="flex items-center gap-3 sm:col-span-2">
          <button
            type="submit"
            className="rounded-md bg-indigo-100 px-5 py-2.5 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 active:bg-indigo-700"
          >
            {editingUser ? 'Update User' : 'Add User'}
          </button>
          {editingUser && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
