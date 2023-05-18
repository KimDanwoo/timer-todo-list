export default function EndTodoItem({ $target, title, time }) {
  const $todoContainer = document.createElement("li");
  $todoContainer.classList.add("todo_item");
  const $text = document.createElement("p");
  $text.innerHTML = title;
  const $time = document.createElement("p");
  $time.innerHTML = `${time}초`;

  this.setState = () => {
    this.render();
  };
  this.render = () => {
    $todoContainer.append($text);
    $todoContainer.append($time);
    $target.append($todoContainer);
  };

  this.render();
}
