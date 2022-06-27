const Project = function(name) {
    todoList = [];
    const addTodo = function(todo) {
        todoList.push(todo);
    };
    const deleteTodo = function(todo) {
        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i] === todo) {
                todoList.splice(i, 1);
            }
        }
    };
    return {
        addTodo, deleteTodo,
    }
};