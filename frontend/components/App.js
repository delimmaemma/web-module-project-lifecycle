import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoNameInput: ''
  }

  onChange = evt => {
    const { value } = evt.target
    this.setState({...this.state, todoNameInput: value})
  }

  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({
          ...this.state, todos: res.data.data
        })
      })
      .catch(err => {
          this.setState({...this.state, error: err.response.data.message})
      })
  } 
  // Does the same thing as the code below.

  componentDidMount() {
    this.fetchAllTodos()
    // fetch(URL)
    //   .then(response => response.json())
    //   .then(data => {
    //     this.setState({ ...this.state, todos: data.data })
    //   })
    //   .catch(err => {
    //     this.setState({...this.state, error: err.response.data.message})
    //   })
  }

  render() {
    return (
      <div>
        {this.state.error && <div id='error'>Error: {this.state.error}</div>}
        <div id='todos'>
          <h2>Todos:</h2>
          {
            this.state.todos.map(todo => {
              return(<div key={todo.id} className="todo">
                <p>{todo.name}</p>
              </div>)
            })  
          }
        </div>
        <form id='todoForm'>
          <input value = {this.state.todoNameInput} onChange={this.onChange} type='text' placeholder='Type todo'></input>
          <input type='submit'></input>
          <button>Clear Completed</button>
        </form>
      </div>
    )
  }
}
