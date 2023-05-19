import Button from "./Button";
import CustomInput from "./CustomInput";
import Heading from "./Heading";

export default function CreateContentBox({ $target, onClickAddTodoItem }) {
  const $div = document.createElement("div");
  $div.classList.add("create_todo_box");

  const todoItem = {
    title: "",
    time: "",
  };

  const onChangeValue = ({ name, value }) => {
    todoItem[name] = value;
  };

  const createSubTitle = new Heading({
    $target: $target,
    title: "할 일 만들기",
    size: "h3",
  });

  const writeInput = new CustomInput({
    $target: $div,
    title: "할 일 작성",
    name: "title",
    onChange: onChangeValue,
  });
  const timerInput = new CustomInput({
    $target: $div,
    title: "종료 시간",
    name: "time",
    onChange: onChangeValue,
  });

  const onClickAddTodo = () => {
    onClickAddTodoItem(todoItem);
  };

  const button = new Button({
    $target: $div,
    initialState: { text: "추가" },
    onClick: onClickAddTodo,
  });

  this.setState = () => {
    this.render();
  };
  this.render = () => {
    createSubTitle.render();
    writeInput.render();
    timerInput.render();
    button.render();
    $target.append($div);
  };
  this.render();
}
