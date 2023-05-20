export default function TodoList({
  $target,
  initialState,
  className,
  handleClickCheckList,
}) {
  const $todoList = document.createElement("article");
  $todoList.classList.add(className);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
    if (handleClickCheckList) {
      const checkboxes = document.querySelectorAll(".todo-checkbox");
      checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener("click", (e) => {
          console.log("nextState", nextState);
          handleClickCheckList(e);
          if (nextState.checkedTodoList.length) {
            e.target.checked = nextState.checkedTodoList.includes(e.target.id);
          }
        });
      });
    }
  };

  this.render = () => {
    const nullClass =
      className === "done" ? "할일을 마무리해보세요!" : `할일을 만들어보세요!`;

    console.log(this.state.checkedTodoList);
    if (this.state.todoList.length) {
      $todoList.innerHTML = `
        <ul class="todo_list ${className}">
        ${this.state.todoList
          .map(
            (item, id) => `
            <li class="todo_item">
              ${
                item.isEnd
                  ? ""
                  : `<input 
                    class="todo-checkbox"
                    type="checkbox"
                    ${
                      this.state.checkedTodoList?.includes(item.id)
                        ? "checked"
                        : ""
                    }
                    id="${item.id}"/>
                  `
              }
              <p>${item.title}</p>
              <p>${item.time}</p>
              ${item.isEnd ? "" : `<button type="button">삭제</button>`}
            </li>`
          )
          .join("")}
        </ul>
      `;
    } else {
      $todoList.innerHTML = `
      <ul class="todo_list no_list ${className}">
      <h4 class="no_title">${nullClass}
      </h4 >
      </ul>
    `;
    }
    $target.append($todoList);
  };

  this.render();
}
