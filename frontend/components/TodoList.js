import React from 'react'

export default class TodoList extends React.Component {
  render() {
    <div id='todos'>
    <h2>Todos:</h2>
    {
      this.props.todos.reduce((acc, todo) => {
        if(this.props.displayCompleted || !todo.completed) return acc.concat(
          <div onClick={this.props.toggleCompleted(todo.id)} key={todo.id} className="todo">
            {todo.completed ? <p><s>{todo.name}</s></p> : <p>{todo.name}</p>}
          </div>
        )
        return acc
      }, [])  
    }
  </div>
  }
}
