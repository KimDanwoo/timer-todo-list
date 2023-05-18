import CreateTodoLayout from "./CreateTodoLayout";
import EndTodoLayout from "./EndTodoLayout";

export default function TodoWrap({ $target, onClickAddTodoItem }) {
  const $todoWrap = document.createElement("div");
  $todoWrap.classList.add("todo_wrap");
  this.setState = () => {
    this.render();
  };

  const createTodoLayout = new CreateTodoLayout({
    $target: $todoWrap,
    onClickAddTodoItem,
  });
  const endTodoLayout = new EndTodoLayout({
    $target: $todoWrap,
  });

  this.render = () => {
    createTodoLayout.render();
    endTodoLayout.render();
    $target.append($todoWrap);
  };
  this.render();
}
