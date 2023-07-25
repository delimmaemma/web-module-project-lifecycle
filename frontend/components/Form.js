import React from 'react'

export default class Form extends React.Component {
  render() {
    <form id='todoForm' onSubmit={this.onFormSubmit}>
      <input 
        value = {this.props.todoNameInput} 
        onChange={this.props.onChange} 
        type='text' 
        placeholder='Type todo'>
      </input>
      <input type='submit'></input>
      <button onClick={this.props.onClear}>
        {this.props.displayCompleted ? 'Hide' : 'Show'} Completed</button>
  </form>
  }
}
