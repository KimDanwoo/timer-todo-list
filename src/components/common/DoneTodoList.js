import TodoItem from "./TodoItem";

export default function DoneTodoList({
  $target,
  initialState,
  className,
  handleClickCheckList,
  handleChangeOpenModal,
}) {
  const $article = document.createElement("article");
  const $todoList = document.createElement("ul");
  $article.classList.add(className);
  $todoList.classList.add("todo_list");
  $todoList.classList.add(className);
  this.state = {
    ...initialState,
    items: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
    console.log(this.state.todoList);
    console.log(nextState);


    if (handleClickCheckList) {
      const checkboxes = document.querySelectorAll(".todo-checkbox");

      checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener("click", (e) => {
          console.log(e);
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
    if (this.state.todoList.length) {
      const inner = this.state.todoList
        .map((todo) => {
          const todoItem = new TodoItem({
            initialState: { item: todo },
            startTime: className !== "done" ? this.state.timers[todo?.id] : 0,
            handleChangeOpenModal,
          });
          this.state.items.push(todoItem);
          return todoItem.outerHTML;
        })
        .join("");
      $todoList.innerHTML = inner;
    } else {
      $todoList.classList.add("no_list");
      $todoList.innerHTML = `
        <h4 class="no_title">${nullClass}</h4 >
      `;
    }
    $article.append($todoList);
    $target.append($article);
  };

  this.render();
}
