var TodoList = /** @class */ (function () {
    function TodoList() {
        var _this = this;
        this.todos = [];
        this.addTodo = function (text) {
            _this.todos.push({ text: text, completed: false });
        };
        this.markCompleted = function (index) {
            _this.todos[index].completed = true;
        };
        this.getTodos = function () {
            return _this.todos;
        };
    }
    return TodoList;
}());
var todoList = new TodoList();
var form = document.querySelector("form");
var input = document.querySelector("input");
var ul = document.querySelector("ul");
var renderTodos = function () {
    ul.innerHTML = "";
    todoList.getTodos().forEach(function (todo, index) {
        var li = document.createElement("li");
        li.innerHTML = "\n        <span class=\"".concat(todo.completed ? "completed" : "", "\">").concat(todo.text, "</span>\n        <button class=\"delete-btn\" data-index=\"").concat(index, "\">&times;</button>\n      ");
        li.addEventListener("click", function () {
            todoList.markCompleted(index);
            renderTodos();
        });
        var deleteBtn = li.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            todoList.getTodos().splice(index, 1);
            renderTodos();
        });
        ul.appendChild(li);
    });
};
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var text = input.value.trim();
    if (text.length > 0) {
        todoList.addTodo(text);
        input.value = "";
        renderTodos();
    }
});
renderTodos();
