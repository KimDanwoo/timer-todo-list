import Button from "./Button";
import CustomInput from "./CustomInput";
import Heading from "./Heading";

export default function TodoForm({
  $target,
  initialState,
  handleClickAddTodo,
  handleChangeTodoInput,
}) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  const $article = document.createElement("article");
  const $form = document.createElement("form");
  $article.classList.add("form_container");

  const handleSubmit = () => {
    handleClickAddTodo(this.state);
    this.setState({ title: "", time: 0 });
    console.log("서브밋");
    console.log($form);
    const $inputs = Array.from($form.querySelectorAll("input"));
    $inputs.forEach(($input) => {
      $input.value = null;
    });
  };

  new Heading({
    $target: $target,
    title: "할 일 만들기",
    size: "h3",
  });

  const writeInput = new CustomInput({
    $target: $form,
    title: "할 일",
    name: "title",
    value: this.state.input.title,
    onChange: handleChangeTodoInput,
  });
  const timerInput = new CustomInput({
    $target: $form,
    title: "종료 시간(초)",
    name: "time",
    value: this.state.input.time,
    onChange: handleChangeTodoInput,
  });

  const button = new Button({
    $target: $form,
    initialState: { text: "추가" },
    type: "submit",
    onClick: handleSubmit,
  });

  this.render = () => {
    writeInput.render();
    timerInput.render();
    button.render();
    $article.append($form);
    $target.append($article);
  };
  this.render();

  $form.addEventListener("submit", handleSubmit);
}
