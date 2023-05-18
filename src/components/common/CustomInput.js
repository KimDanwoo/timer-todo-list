export default function CustomInput({ $target, title, name, onChange }) {
  const $div = document.createElement("div");
  const $heading = document.createElement("p");
  const $input = document.createElement("input");
  $heading.textContent = title;
  $input.name = name;

  this.setState = () => {
    this.render();
  };
  this.render = () => {
    $div.append($heading);
    $div.append($input);
    $target.append($div);
  };

  $input.addEventListener("change", (e) => {
    onChange(e.target);
  });
  this.render();
}
