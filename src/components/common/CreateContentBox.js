import Button from "./Button";
import CustomInput from "./CustomInput";
import SubTitle from "./SubTitle";

export default function CreateContentBox({ $target }) {
  const $div = document.createElement("div");
  $div.classList.add("create_todo_box");

  const createSubTitle = new SubTitle({
    $target: $target,
    title: "할 일 만들기",
  });

  const writeInput = new CustomInput({
    $target: $div,
    title: "할 일 작성",
  });
  const timerInput = new CustomInput({
    $target: $div,
    title: "종료 시간",
  });

  const button = new Button({
    $target: $div,
    initialState: { text: "추가" },
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
