export default function Button({
  $target,
  initialState = {
    text: "",
    sortType,
    disabled,
  },
  type = "button",
  onClick = () => {},
  disabled,
}) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  const $buttonContainer = document.createElement("button");
  $buttonContainer.id = "button";
  $buttonContainer.type = type;

  this.render = () => {
    const { text, sortType } = this.state;
    console.log(this.state.disabled);
    if (this.state.disabled) {
      $buttonContainer.disabled = "disabled";
    } else {
      $buttonContainer.disabled = false;
    }

    $buttonContainer.innerHTML = /*html*/ `
      <span >
        ${text}
      </span>
    `;
    if (sortType === text) {
      $buttonContainer.classList.add("active");
    } else {
      $buttonContainer.classList.remove("active");
    }
    $target.appendChild($buttonContainer);
  };

  $buttonContainer.addEventListener("click", (e) => {
    e.preventDefault();
    onClick();
  });

  this.render();
}
