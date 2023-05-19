import Button from "./Button";
import Heading from "./Heading";

export default function FilterControl({ $target }) {
  const $container = document.createElement("div");
  const $btnWrap = document.createElement("div");
  const $leftBox = document.createElement("div");
  const $rightBox = document.createElement("div");
  $container.classList.add("filter_control");
  $btnWrap.classList.add("filter_buttons");

  new Heading({
    $target: $container,
    title: "할 일 목록",
    size: "h3",
  });

  new Button({
    $target: $leftBox,
    initialState: { text: "입력한 순" },
  });
  new Button({
    $target: $leftBox,
    initialState: { text: "남은 시간 순" },
  });

  new Button({
    $target: $rightBox,
    initialState: { text: "전체 종료" },
  });
  new Button({
    $target: $rightBox,
    initialState: { text: "선택 종료" },
  });

  this.setState = () => {
    this.render();
  };

  this.render = () => {
    $btnWrap.append($leftBox);
    $btnWrap.append($rightBox);
    $container.append($btnWrap);
    $target.appendChild($container);
  };

  this.render();
}
