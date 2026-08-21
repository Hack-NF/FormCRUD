import { useEffect, useState } from 'react'

const API = 'http://localhost:5000/api/users'
const PER_PAGE = 5

async function getError(res) {
  const data = await res.json().catch(() => null)
  return data?.message || `Request failed with status ${res.status}`
}

async function getUsers() {
  const res = await fetch(API)
  return res.json()
}

async function addUser(user) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
  if (!res.ok) throw new Error(await getError(res))
  return res.json()
}

async function editUser(id, user) {
  const res = await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
  if (!res.ok) throw new Error(await getError(res))
  return res.json()
}

async function removeUser(id) {
  const res = await fetch(`${API}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(await getError(res))
}

export function useUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mutationError, setMutationError] = useState(null)
  const [editingUser, setEditingUser] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(users.length / PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const startIndex = (safePage - 1) * PER_PAGE
  const visibleUsers = users.slice(startIndex, startIndex + PER_PAGE)

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data)
        setError(null)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const retry = () => {
    setLoading(true)
    setError(null)
    getUsers()
      .then((data) => {
        setUsers(data)
        setError(null)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  const submit = async (data) => {
    setMutationError(null)
    try {
      if (editingUser) {
        const updated = await editUser(editingUser.id, data)
        setUsers((prev) =>
          prev.map((u) => (u.id === editingUser.id ? updated : u)),
        )
        setEditingUser(null)
      } else {
        const created = await addUser(data)
        setUsers((prev) => [...prev, created])
        setCurrentPage(Math.ceil((users.length + 1) / PER_PAGE))
      }
    } catch (err) {
      setMutationError(err.message)
    }
  }

  const edit = (user) => {
    setEditingUser(user)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const remove = async (id) => {
    setMutationError(null)
    try {
      await removeUser(id)
      setUsers((prev) => prev.filter((u) => u.id !== id))
      if (editingUser?.id === id) setEditingUser(null)
    } catch (err) {
      setMutationError(err.message)
    }
  }

  const cancel = () => setEditingUser(null)
  const dismissError = () => setMutationError(null)

  return {
    users,
    loading,
    error,
    mutationError,
    editingUser,
    currentPage,
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
  }
}
