interface Todo {
    text: string;
    completed: boolean;
  }
  
  class TodoList {
    private todos: Todo[] = [];
  
    addTodo = (text: string) => {
      this.todos.push({ text, completed: false });
    };
  
    markCompleted = (index: number) => {
      this.todos[index].completed = true;
    };
  
    getTodos = () => {
      return this.todos;
    };
  }
  
  const todoList = new TodoList();
  const form = document.querySelector("form")!;
  const input = document.querySelector("input")!;
  const ul = document.querySelector("ul")!;
  
  const renderTodos = () => {
    ul.innerHTML = "";
  
    todoList.getTodos().forEach((todo, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="${todo.completed ? "completed" : ""}">${todo.text}</span>
        <button class="delete-btn" data-index="${index}">&times;</button>
      `;
      li.addEventListener("click", () => {
        todoList.markCompleted(index);
        renderTodos();
      });
      const deleteBtn = li.querySelector(".delete-btn")!;
      deleteBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        todoList.getTodos().splice(index, 1);
        renderTodos();
      });
      ul.appendChild(li);
    });
  };
  
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (text.length > 0) {
      todoList.addTodo(text);
      input.value = "";
      renderTodos();
    }
  });
  
  renderTodos();
  