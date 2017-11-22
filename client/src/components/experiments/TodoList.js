import React, { Component } from "react";
import { connect } from "react-redux";
import { setVisibilityFilter, toggleTodo, addTodo } from "./actions";
import FlipMove from "react-flip-move";

// Todo
const Todo = ({ onClick, text, completed, id }) => {
  return (
    <li
      style={{ textDecoration: completed ? "line-through" : "none" }}
      onClick={onClick}
    >
      {text}
    </li>
  );
};

class TodoStateful extends Component {
  render() {
    return <Todo {...this.props} />;
  }
}

// TodoList
const TodoList = ({ todos, onTodoClick }) => {
  return (
    <ul>
      <FlipMove>
        {todos.map((todo, idx) => (
          <TodoStateful
            {...todo}
            onClick={() => onTodoClick(todo.id)}
            key={todo.id}
          />
        ))}
      </FlipMove>
    </ul>
  );
};

// Link
const Link = ({ onClick, active, children }) => {
  if (active) return <span>{children}</span>;
  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

// Footer
const Footer = () => (
  <p>
    Show: <FilterLink filter="SHOW_ALL">All</FilterLink>
    {", "}
    <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
    {", "}
    <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
  </p>
);

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_COMPLETED":
      return todos.filter(t => t.completed);
    case "SHOW_ACTIVE":
      return todos.filter(t => !t.completed);
  }
};

// Container: VisibleTodoList
const VisibleTodoList = connect(
  state => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }),
  dispatch => ({
    onTodoClick: id => dispatch(toggleTodo(id))
  })
)(TodoList);

// Container: FilterLink
const FilterLink = connect(
  (state, ownProps) => ({
    active: state.visibilityFilter == ownProps.filter ? true : false
  }),
  (dispatch, ownProps) => ({
    onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
  })
)(Link);

let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(addTodo(input.value));
          input.value = "";
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};
AddTodo = connect()(AddTodo);

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

const reducer = (
  state = {
    todos: [],
    visibilityFilter: "SHOW_ALL"
  },
  action
) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          { text: action.text, completed: false, id: action.id }
        ]
      };
    case "SET_VISIBILITY_FILTER":
      return {
        ...state,
        visibilityFilter: action.filter
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map(
          (todo, idx) =>
            todo.id === action.id
              ? { ...todo, completed: !todo.completed }
              : todo
        )
      };
    default:
      return state;
  }
};

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

let store = createStore(reducer, applyMiddleware(logger));

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
