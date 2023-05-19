import Heading from "../common/Heading";
import TodoList from "../common/TodoList";

export default function EndTodo({ $target, initialState }) {
  const $endTodo = document.createElement("div");
  $endTodo.classList.add("right");
  this.state = initialState;

  const subTitle = new Heading({
    $target: $endTodo,
    title: "종료된 할 일",
    size: "h3",
  });

  const todoList = new TodoList({
    $target: $endTodo,
    initialState: this.state.filter(({ isEnd }) => isEnd),
  });

  this.setState = () => {
    this.render();
  };
  this.render = () => {
    subTitle.render();
    todoList.render();
    $target.append($endTodo);
  };
  this.render();
}
