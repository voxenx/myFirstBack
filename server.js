const express = require('express')

const app = express()
app.use(express.json())

// =======================
// FAKE DATABASE (ARRAY)
// =======================
let users = [
    { id: 1, name: 'Behruz', age: 20 },
    { id: 2, name: 'Ali', age: 22 },
]

// =======================
// GET — hammasini olish
// =======================
app.get('/users', (req, res) => {
    res.json(users)
})

// =======================
// GET — bitta user
// =======================
app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(u => u.id === id)

    if (!user) return res.status(404).json({ msg: 'User not found' })

    res.json(user)
})

// =======================
// POST — yangi user
// =======================
app.post('/users', (req, res) => {
    const { name, age } = req.body

    const newUser = {
        id: Date.now(),
        name,
        age,
    }

    users.push(newUser)
    res.status(201).json(newUser)
})

// =======================
// PUT — to‘liq update
// =======================
app.put('/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const index = users.findIndex(u => u.id === id)

    if (index === -1)
        return res.status(404).json({ msg: 'User not found' })

    const { name, age } = req.body

    users[index] = {
        id,
        name,
        age,
    }

    res.json(users[index])
})

// =======================
// PATCH — qisman update
// =======================
app.patch('/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(u => u.id === id)

    if (!user) return res.status(404).json({ msg: 'User not found' })

    user.name = req.body.name ?? user.name
    user.age = req.body.age ?? user.age

    res.json(user)
})

// =======================
// DELETE — o‘chirish
// =======================
app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id)
    users = users.filter(u => u.id !== id)

    res.json({ msg: 'User deleted' })
})

// =======================
const PORT = 5000
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})
