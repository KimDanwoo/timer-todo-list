import Heading from "../common/Heading";
import TodoList from "../common/TodoList";

export default function DoneTodoContainer({ $target, initialState }) {
  const $doneTodoContainer = document.createElement("section");
  $doneTodoContainer.classList.add("right");
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const subTitle = new Heading({
    $target: $doneTodoContainer,
    title: "종료된 할 일",
    size: "h3",
  });

  const todoList = new TodoList({
    $target: $doneTodoContainer,
    initialState: {
      todoList: this.state.todoList.filter(({ isEnd }) => isEnd),
    },
    className: "done",
  });

  this.render = () => {
    subTitle.render();
    todoList.render();
    todoList.setState({
      todoList: this.state.todoList.filter(({ isEnd }) => isEnd),
    });
    $target.append($doneTodoContainer);
  };

  this.render();
}
