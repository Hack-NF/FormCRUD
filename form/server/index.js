const express = require('express')
const cors = require('cors')
const { DatabaseSync } = require('node:sqlite')

const app = express()
const db = new DatabaseSync('data.db')

app.use(cors())
app.use(express.json())

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT,
    lastName TEXT,
    password TEXT,
    email TEXT UNIQUE,
    avatar TEXT
  )
`)

async function seed() {
  const count = db.prepare('SELECT COUNT(*) AS c FROM users').get().c
  if (count > 0) return

  const insert = db.prepare(
    'INSERT INTO users (firstName, lastName, password, email, avatar) VALUES (?, ?, ?, ?, ?)',
  )
  const response = await fetch('https://dummyjson.com/users?limit=30')
  const data = await response.json()
  for (const u of data.users) {
    insert.run(u.firstName, u.lastName, u.password, u.email, u.image)
  }
  console.log('Fetched 30 users from dummyjson')
}

app.get('/api/users', (req, res) => {
  res.json(db.prepare('SELECT * FROM users').all())
})

app.get('/api/users/:id', (req, res) => {
  res.json(db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id))
})

app.post('/api/users', (req, res) => {
  const { firstName, lastName, password, email, avatar } = req.body
  try {
    const info = db
      .prepare(
        'INSERT INTO users (firstName, lastName, password, email, avatar) VALUES (?, ?, ?, ?, ?)',
      )
      .run(firstName, lastName, password, email, avatar || null)
    res.json(db.prepare('SELECT * FROM users WHERE id = ?').get(info.lastInsertRowid))
  } catch (err) {
    res.status(400).json({ message: 'Email already exists' })
  }
})

app.put('/api/users/:id', (req, res) => {
  const { firstName, lastName, password, email, avatar } = req.body
  try {
    db.prepare(
      'UPDATE users SET firstName = ?, lastName = ?, password = ?, email = ?, avatar = ? WHERE id = ?',
    ).run(firstName, lastName, password, email, avatar || null, req.params.id)
    res.json(db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id))
  } catch (err) {
    res.status(400).json({ message: 'Email already exists' })
  }
})



app.delete('/api/users/:id', (req, res) => {
  db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id)
  res.sendStatus(204)
})

seed().then(() => {
  app.listen(5000, () => {
    console.log('Server running on http://localhost:5000')
  })
})
