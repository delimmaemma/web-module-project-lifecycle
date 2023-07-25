import React from 'react'

export default class Todo extends React.Component {
  render() {
    return (
      <div onClick={this.props.toggleCompleted(this.props.todo.id)} className="todo">
        {this.props.todo.completed ? <p><s>{this.props.todo.name}</s></p> : <p>{this.props.todo.name}</p>}
      </div>
    )
  }
}
