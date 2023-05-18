import Button from "./Button";

export default function FilterControl({ $target }) {
  const $btnWrap = document.createElement("div");
  const $leftBtns = document.createElement("div");
  const $rightBtns = document.createElement("div");
  $btnWrap.style = "display:flex;justify-content:space-between";
  $leftBtns.style = "display:flex";
  $rightBtns.style = "display:flex";

  new Button({
    $target: $leftBtns,
    initialState: { text: "입력한 순" },
  });
  new Button({
    $target: $leftBtns,
    initialState: { text: "남은 시간 순" },
  });

  new Button({
    $target: $rightBtns,
    initialState: { text: "전체 종료" },
  });
  new Button({
    $target: $rightBtns,
    initialState: { text: "선택 종료" },
  });

  this.setState = () => {
    this.render();
  };

  this.render = () => {
    $btnWrap.append($leftBtns);
    $btnWrap.append($rightBtns);
    $target.append($btnWrap);
  };

  this.render();
}
