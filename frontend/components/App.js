import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoNameInput: '',
    displayCompleted: true,
  }

  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({...this.state, todos: this.state.todos.map(todo => {
          return todo.id === id ? res.data.data : todo
        })})
      })
      .catch(this.setError)
  }

  onChange = evt => {
    const { value } = evt.target
    this.setState({...this.state, todoNameInput: value})
  }

  resetForm = () => {
    this.setState({...this.state.todos, todoNameInput: ''})
  }

  setError = err => {
    this.setState({...this.state, error: err.response.data.message})
  }

  postNewTodo = () => {
    axios.post(URL, {
      name: this.state.todoNameInput
    })
      .then(res => {
        this.setState({...this.state, todos: this.state.todos.concat(res.data.data)})
        this.resetForm()
      })
      .catch(this.setError)
  }

  onFormSubmit = evt => {
    evt.preventDefault()
    this.postNewTodo()
  }

  onClear = evt => {
    evt.preventDefault()
    this.setState({...this.state, displayCompleted: !this.state.displayCompleted})
  }

  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({
          ...this.state, todos: res.data.data
        })
      })
      .catch(this.setError)
  } 

  componentDidMount() {
    this.fetchAllTodos()
  }

  render() {
    return (
      <div>
        {this.state.error && <div id='error'>Error: {this.state.error}</div>}
        <TodoList
          toggleCompleted = {this.toggleCompleted}
          displayCompleted = {this.state.displayCompleted}
          todos = {this.state.todos}
        />
        <Form 
          onFormSubmit = {this.onFormSubmit}
          onChange = {this.onChange}
          onClear = {this.onClear}
          todoNameInput = {this.state.todoNameInput}
          displayCompleted = {this.state.displayCompleted}
        />
      </div>
    )
  }
}
