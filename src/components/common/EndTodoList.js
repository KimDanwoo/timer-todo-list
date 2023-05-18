import EndTodoItem from "./EndTodoItem";

export default function EndTodoList({ $target }) {
  const $endTodoList = document.createElement("ul");
  $endTodoList.classList.add("end_todo_box");

  new EndTodoItem({
    $target: $endTodoList,
    title: "할 일 내용 1",
    time: 50,
  });
  new EndTodoItem({
    $target: $endTodoList,
    title: "할 일 내용 1",
    time: 50,
  });
  new EndTodoItem({
    $target: $endTodoList,
    title: "할 일 내용 1",
    time: 50,
  });
  new EndTodoItem({
    $target: $endTodoList,
    title: "할 일 내용 1",
    time: 50,
  });
  new EndTodoItem({
    $target: $endTodoList,
    title: "할 일 내용 1",
    time: 50,
  });
  new EndTodoItem({
    $target: $endTodoList,
    title: "할 일 내용 1",
    time: 50,
  });

  this.setState = () => {
    this.render();
  };
  this.render = () => {
    $target.append($endTodoList);
  };

  this.render();
}
