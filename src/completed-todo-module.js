import tickUrl from './icons/tick.svg';

const Complete = function() {
    let todoListContSel = document.querySelector('.todo-list-container');
    let projects;
    const compTodoContCreate = function(projectName) {
        const todoList = projects.getAllTodosFromProj(projectName);
        todoListContSel = document.createElement('div');
        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i].isComplete === true) {
                const todoCardSel = document.createElement('div');
                const todoBoxSel = document.createElement('div');
                const todoTitleSel = document.createElement('div');
                const todoDueDateSel = document.createElement('div');
                const todoDeleteSel = document.createElement('div');

                todoTitleSel.textContent = todoList[i].title;
                todoDueDateSel.textContent = `Due Date: ${todoList[i].dueDate}`;

                todoCardSel.classList.add('todo-card', 'completed-card');
                todoBoxSel.classList.add('todo-box');
                todoBoxSel.style.backgroundImage = `url('${tickUrl}')`;
                todoTitleSel.classList.add('todo-title');
                todoDueDateSel.classList.add('todo-due-date');
                todoDeleteSel.classList.add('todo-delete');

                todoBoxSel.addEventListener('click', (e) => {
                    e.composedPath()[1].remove();
                    todoList[i].isComplete = false;
                })
                todoDeleteSel.addEventListener('click', (e) => {
                    e.composedPath()[1].remove();
                    projects.delTodo(todoList[i], projectName);
                });

                todoListContSel.appendChild(todoCardSel);
                todoCardSel.appendChild(todoBoxSel);
                todoCardSel.appendChild(todoTitleSel);
                todoCardSel.appendChild(todoDueDateSel);
                todoCardSel.appendChild(todoDeleteSel);
            }
        }
        todoListContSel.classList.add('todo-list-container');
        return todoListContSel;
    };
    const activate = function(projectsDict, projectName) {
        document.querySelector('.switch-complete').textContent = 'Go Back';
        projects = projectsDict;
        document.body.removeChild(todoListContSel);
        document.body.appendChild(compTodoContCreate(projectName));
        document.querySelector('.create-item-button').style.visibility = 'hidden';
    }

    return {
        compTodoContCreate,
        activate,
    };
};

export default Complete;