import TodoForm from "../common/TodoForm";
import FilterControl from "../common/FilterControl";
import TodoList from "../common/TodoList";

export default function TodoListContainer({
  $target,
  initialState,
  handleClickAddTodo,
  handleChangeTodoInput,
  handleClickFilterLimitTime,
  handleClickFilterIndex,
  handleClickAllDone,
  handleClickCheckList,
  handleClickCheckListDone,
}) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  const $createContainer = document.createElement("div");
  const $createTodo = document.createElement("section");
  $createTodo.append($createContainer);
  $createTodo.classList.add("left");

  const todoForm = new TodoForm({
    $target: $createContainer,
    initialState: this.state,
    handleClickAddTodo,
    handleChangeTodoInput,
  });

  const filterControl = new FilterControl({
    $target: $createTodo,
    initialState: { sortType: this.state.sortType },
    handleClickFilterLimitTime,
    handleClickFilterIndex,
    handleClickAllDone,
    handleClickCheckListDone,
  });

  const todoList = new TodoList({
    $target: $createTodo,
    initialState: {
      todoList: this.state.todoList.filter(({ isEnd }) => !isEnd),
      checkedTodoList: this.state.checkedTodoList,
    },
    className: "unfinished",
    handleClickCheckList,
  });

  this.render = () => {
    $target.append($createTodo);
    todoForm.setState(this.state);
    filterControl.setState({ sortType: this.state.sortType });
    todoList.setState({
      todoList: this.state.todoList.filter(({ isEnd }) => !isEnd),
      checkedTodoList: this.state.checkedTodoList,
    });
  };

  this.render();
}
