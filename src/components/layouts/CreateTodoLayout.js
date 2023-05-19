import CreateContentBox from "../common/CreateContentBox";
import FilterControl from "../common/FilterControl";
import TodoList from "../common/TodoList";

export default function CreateTodo({
  $target,
  initialState,
  onClickAddTodoItem,
}) {
  const $createContainer = document.createElement("div");
  const $createTodo = document.createElement("div");
  $createTodo.classList.add("left");

  this.state = initialState;

  const createContentBox = new CreateContentBox({
    $target: $createTodo,
    onClickAddTodoItem,
  });

  new FilterControl({
    $target: $createTodo,
  });

  const todoList = new TodoList({
    $target: $createTodo,
    initialState: this.state.filter(({ isEnd }) => !isEnd),
  });

  this.setState = () => {
    this.render();
  };

  this.render = () => {
    $createContainer.append(createContentBox);
    todoList.render();
    $target.append($createTodo);
  };

  this.render();
}
