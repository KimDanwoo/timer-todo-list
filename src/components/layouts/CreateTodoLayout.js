import CreateContentBox from "../common/CreateContentBox";
import TodoList from "../common/TodoList";

export default function CreateTodo({ $target }) {
  const $createTodo = document.createElement("div");
  $createTodo.classList.add("left");

  const createContentBox = new CreateContentBox({
    $target: $createTodo,
  });

  const todoList = new TodoList({
    $target: $createTodo,
  });

  this.setState = () => {
    this.render();
  };

  this.render = () => {
    createContentBox.render();
    todoList.render();
    $target.append($createTodo);
  };

  this.render();
}
