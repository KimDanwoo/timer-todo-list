import EndTodoList from "../common/EndTodoList";
import Heading from "../common/Heading";

export default function EndTodo({ $target }) {
  const $endTodo = document.createElement("div");
  $endTodo.classList.add("right");

  const subTitle = new Heading({
    $target: $endTodo,
    title: "종료된 할 일",
    size: "h3",
  });

  const endTodoList = new EndTodoList({
    $target: $endTodo,
  });

  this.setState = () => {
    this.render();
  };
  this.render = () => {
    subTitle.render();
    endTodoList.render();
    $target.append($endTodo);
  };
  this.render();
}
