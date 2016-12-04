// Default example of action creator function

export function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text
  }
}