const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3001
require('dotenv').config()

app.use(cors({ origin: '*' }))
app.use(bodyParser.json())

const mongoDBLink = process.env.MONGODB_URI
mongoose.connect(mongoDBLink)

const TodoModel = mongoose.model(
  'Todo',
  new mongoose.Schema({ title: String, is_done: Boolean })
)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/todo', async (req, res) => {
  const { title } = req.body

  if (!title) {
    return res.status(400).json({
      message: 'Title value cannot be empty.',
    })
  }

  try {
    const todo = new TodoModel({
      title: title,
      is_done: false,
    })

    const newTodo = await todo.save()

    return res.status(200).json({
      todo: newTodo,
    })
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    })
  }
})

app.get('/todos', async (req, res) => {
  try {
    const todos = await TodoModel.find()

    return res.status(200).json({
      data: todos,
    })
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    })
  }
})

app.delete('/todo/:id', async (req, res) => {
  const { id } = req.params

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: 'Valid ID must be provided.',
    })
  }

  try {
    const todo = await TodoModel.findById(id)

    if (!todo) {
      return res.status(400).json({
        message: 'Todo not found.',
      })
    }

    await todo.delete()

    return res.status(200).json({})
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    })
  }
})

app.put('/todo/:id', async (req, res) => {
  const { id } = req.params

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      message: 'ID must be provided.',
    })
  }

  try {
    const todo = await TodoModel.findById(id)

    if (!todo) {
      return res.status(400).json({
        message: 'Todo not found.',
      })
    }

    todo.is_done = !todo.is_done

    await todo.save()

    return res.status(200).json({
      todo: todo,
    })
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
