import CreateContentBox from "../common/CreateContentBox";
import FilterControl from "../common/FilterControl";
import Heading from "../common/Heading";
import TodoList from "../common/TodoList";

export default function CreateTodo({
  $target,
  initialState,
  onClickAddTodoItem,
}) {
  const $container = document.createElement("div");
  const $createContainer = document.createElement("div");
  const $createTodo = document.createElement("div");
  $createTodo.classList.add("left");

  this.state = initialState;

  const createContentBox = new CreateContentBox({
    $target: $createContainer,
    onClickAddTodoItem,
  });

  new Heading({
    $target: $createTodo,
    title: "할 일 목록",
    size: "h3",
  });

  new FilterControl({
    $target: $createTodo,
  });

  const todoList = new TodoList({
    $target: $createTodo,
    initialState: this.state,
  });

  this.setState = () => {
    this.render();
  };

  this.render = () => {
    createContentBox.render();
    todoList.render();
    $container.append($createContainer);
    $container.append($createTodo);
    $target.append($container);
  };

  this.render();
}
