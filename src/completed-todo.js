import tickUrl from './icons/tick.svg';
import { formatDistance } from 'date-fns';

const Complete = function() {
  let todoListCont = document.querySelector('.todo-list-container');
  let projects;

  const compTodoContCreate = function(projectName) {
    const todoList = projects.getAllTodosFromProj(projectName);
    todoListCont = document.createElement('div');
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].isComplete === true) {
        const todoCard = document.createElement('div');
        const todoBox = document.createElement('div');
        const todoTitle = document.createElement('div');
        const todoDueDate = document.createElement('div');
        const todoDelete = document.createElement('div');

        todoTitle.textContent = todoList[i].title;
        if (todoList[i].dueDate) {
          todoDueDate.textContent = `Due Date: ${formatDistance(new Date(
            todoList[i].dueDate + ' ' + todoList[i].remindTime
          ), new Date(), { addSuffix: true, })}`;
        } else {
          todoDueDate.textContent = `Due Date:`;
        }

        todoCard.classList.add('todo-card', 'completed-card');
        todoBox.classList.add('todo-box');
        todoBox.style.backgroundImage = `url('${tickUrl}')`;
        todoTitle.classList.add('todo-title');
        todoDueDate.classList.add('todo-due-date');
        todoDelete.classList.add('todo-delete');

        todoBox.addEventListener('click', (e) => {
          e.composedPath()[1].remove();
          todoList[i].isComplete = false;
          projects.saveToLocalStorage();
        })
        todoDelete.addEventListener('click', (e) => {
          e.composedPath()[1].remove();
          projects.delTodo(todoList[i], projectName);
        });

        todoListCont.appendChild(todoCard);
        todoCard.appendChild(todoBox);
        todoCard.appendChild(todoTitle);
        todoCard.appendChild(todoDueDate);
        todoCard.appendChild(todoDelete);
      }
    }
    todoListCont.classList.add('todo-list-container');
    return todoListCont;
  };

  const activate = function(projectsDict, projectName) {
    document.querySelector('.switch-complete').textContent = 'Go Back';
    projects = projectsDict;
    document.body.removeChild(todoListCont);
    document.body.appendChild(compTodoContCreate(projectName));
    document.querySelector('.create-item-button').style.visibility = 'hidden';
  }

  return {
    compTodoContCreate,
    activate,
  };
};

export default Complete;
