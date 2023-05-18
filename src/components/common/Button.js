export default function Button({
  $target,
  initialState = {
    text: "",
  },
  onClick = () => {},
}) {
  const $buttonContainer = document.createElement("div");
  $buttonContainer.id = "button";

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    const { text } = this.state;
    $buttonContainer.innerHTML = /*html*/ `
    <button style="flex: 1">
    <span >
    ${text}
    </span>
    </button>
 `;
    $target.appendChild($buttonContainer);
  };

  $buttonContainer.addEventListener("click", (e) => {
    const $button = e.target.closest("button");
    if ($button) {
      onClick();
    }
  });

  this.render();
}
