export default function CustomInput({ $target, title, value }) {
  const $div = document.createElement("div");
  const $heading = document.createElement("p");
  const $input = document.createElement("input");
  $heading.textContent = title;

  this.setState = () => {
    this.render();
  };
  this.render = () => {
    $div.append($heading);
    $div.append($input);
    $target.append($div);
  };
  this.render();
}
