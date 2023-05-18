import Button from "./Button";

export default function TodoItem({ $target, title, time }) {
  const $todoContainer = document.createElement("div");
  $todoContainer.classList.add("todo_item");
  const $checkbox = document.createElement("input");
  $checkbox.type = "checkbox";
  const $text = document.createElement("p");
  $text.innerHTML = title;
  const $time = document.createElement("p");
  $time.innerHTML = `${time}초`;

  const endBtn = new Button({
    $target: $todoContainer,
    initialState: {
      text: "종료",
    },
  });

  this.setState = () => {
    this.render();
  };
  this.render = () => {
    $todoContainer.append($checkbox);
    $todoContainer.append($text);
    $todoContainer.append($time);
    endBtn.render();
    $target.append($todoContainer);
  };

  this.render();
}
