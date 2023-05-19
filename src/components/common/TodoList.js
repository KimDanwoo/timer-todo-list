export default function TodoList({ $target, initialState }) {
  const $todoList = document.createElement("div");
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $todoList.innerHTML = `
    <div>
      <ul class="todo_list">
      ${this.state
        .map(
          (item) => `
          <li class="todo_item">
            ${item.isEnd ? "" : `<input type="checkbox" />`}
            <p>${item.title}</p>
            <p>${item.time}</p>
            ${item.isEnd ? "" : `<button type="button">삭제</button>`}
          </li>`
        )
        .join("")}
      </ul>
    </div>
    `;
    $target.append($todoList);
  };

  this.render();
}
