import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: []
  }

  // fetchAllTodos = () => {
  //   axios.get(URL)
  //     .then(res => {
  //       this.setState({
  //         todos: res.data
  //       })
  //     })
  //     .catch(err => console.log(err))
  // } Does the same thing as the code below.

  componentDidMount() {
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        this.setState({ ...this.state, todos: data.data })
      })
  }

  render() {
    return (
      <div>
        <div id='error'>Error: No error here</div>
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
          <input type='text' placeholder='Type todo'></input>
          <input type='submit'></input>
          <button>Clear Completed</button>
        </form>
      </div>
    )
  }
}
