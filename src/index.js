import './style.css';

import Projects from './projects-interfacing';
import TodoCons from "./todo-generator";
import Complete from './completed-todo';

import { formatDistance } from 'date-fns';

const DomController = function() {
  let currProject = 'default';
  let bringDown, curtainBar, titleBar;
  let projListCont, projectCard, projectIcon, projectName, projectDelete;
  let todoListCont, todoCard, todoBox, todoTitle, todoDueDate, todoDelete;

  const projCrCont = document.querySelector('.project-create-container');
  const layerShield = document.querySelector('.layer-shield');
  const todoCreateForm = layerShield.querySelector('#todo-create-form');
  const editForm = document.getElementById('todo-edit-form');
  const pencils = document.querySelectorAll('.edit-image');

  let title, desc, date, notes, reminder;
  let todoBeingEdited;

  const curtainBarCreate = function() {
    curtainBar = document.createElement('div');
    titleBar = document.createElement('div');
    bringDown = document.createElement('div');

    titleBar.textContent = 'All Projects'
    bringDown.addEventListener('click', viewAllProjects);

    titleBar.className = 'all-projects';
    bringDown.className = 'expand-more';

    curtainBar.appendChild(titleBar);
    curtainBar.appendChild(bringDown);
    return curtainBar;
  };

  const exitEditMenu = function(e) {
    if (editForm.style.visibility === 'visible'
      && !e.composedPath().includes(editForm)) {
      todoBeingEdited.title = title.value;
      todoBeingEdited.description = desc.value;
      todoBeingEdited.dueDate = date.value;
      todoBeingEdited.notes = notes.value;
      todoBeingEdited.remindTime = reminder.value;
      const priorityFinal =
        editForm.querySelector('[type="radio"]:checked+label').textContent;
      todoBeingEdited.priority =
        priorityFinal === 'High' ? '1' : priorityFinal === 'Medium' ? '2' : '3';
      const checksFinal =
        editForm.querySelectorAll('.editable-checklists>input');
      todoBeingEdited.checklist = [];
      checksFinal.forEach((check) => {
        if (check.value !== '') {
          todoBeingEdited.checklist.push(check.value);
        }
      });
      editForm.querySelector('.to-enable>button').disabled = true;
      if (editForm.previousElementSibling) {
        editForm
          .previousElementSibling
          .querySelector('.todo-title')
          .textContent =
          title.value;
        editForm
          .previousElementSibling
          .querySelector('.todo-due-date')
          .textContent =
          "Due Date: " + date.value;
        editForm.previousElementSibling.classList = ['todo-card'];
        if (priorityFinal === 'High') {
          editForm.previousElementSibling.classList
            .add('todo-high-priority');
        } else if (priorityFinal === 'Medium') {
          editForm.previousElementSibling.classList
            .add('todo-medium-priority');
        } else {
          editForm.previousElementSibling.classList.add('todo-low-priority');
        }
      }
      editForm.style.visibility = 'hidden';
      editForm.style.position = 'absolute';
      pencils.forEach((pencil) => pencil.style.backgroundColor = 'transparent');
      editForm.querySelectorAll('input').forEach((input) =>
        input.disabled = true
      );
      editForm.querySelector('textarea').disabled = true;
      editForm.querySelectorAll('[type="radio"]').forEach((input) =>
        input.disabled = false
      );
      editForm.querySelector('fieldset').disabled = true;
    }
  }

  const revealTodo = function(todoCard) {
    todoCard.after(editForm);
    editForm.style.visibility = 'visible';
    editForm.style.position = 'static';
    if (todoBeingEdited.priority === '1') {
      editForm.classList = ['todo-high-priority']
    } else if (todoBeingEdited.priority === '2') {
      editForm.classList = ['todo-medium-priority']
    } else {
      editForm.classList = ['todo-low-priority']
    }

    title = editForm.querySelector('#editable-title');
    desc = editForm.querySelector('#editable-desc');
    date = editForm.querySelector('#editable-date');
    notes = editForm.querySelector('#editable-notes');
    reminder = editForm.querySelector('#editable-reminder');

    title.value = todoBeingEdited.title;
    desc.value = todoBeingEdited.description;
    date.value = todoBeingEdited.dueDate;
    notes.value = todoBeingEdited.notes;
    reminder.value = todoBeingEdited.remindTime;
    let priorityVal = todoBeingEdited.priority;
    if (priorityVal === '1') {
      editForm.querySelector('#editable-high').checked = true;
    } else if (priorityVal === '2') {
      editForm.querySelector('#editable-medium').checked = true;
    } else {
      editForm.querySelector('#editable-low').checked = true;
    }
    const listOfCheck = todoBeingEdited.checklist;
    if (listOfCheck.length !== 0) {
      const checklistsSel = editForm.querySelector('.editable-checklists');
      const oldChecks = checklistsSel.querySelectorAll('input');
      for (let i = 0; i < oldChecks.length - 1; i++) {
        oldChecks[i].remove();
      }
      for (let i = 0; i < listOfCheck.length; i++) {
        let newCheck = document.createElement('input');
        newCheck.setAttribute('type', 'text');
        newCheck.disabled = true;
        newCheck.value = listOfCheck[i];
        checklistsSel.lastElementChild.before(newCheck);
      }
    }

    const easyEdits = editForm.querySelectorAll('input+img');
    easyEdits.forEach((editPencil) => editPencil.addEventListener('click', () => {
      editPencil.parentElement.querySelector('input').disabled = false;
    }));
    const priorityEdit = editForm.querySelector('fieldset>img');
    priorityEdit.addEventListener('click', () => {
      priorityEdit.parentElement.disabled = false;
    });
    const notesEdit = editForm.querySelector('[for="editable-notes"]>img');
    notesEdit.addEventListener('click', () => {
      notesEdit.parentElement.nextElementSibling.disabled = false;
    });
    const checklistEdit = editForm.querySelector('div>img');
    checklistEdit.addEventListener('click', () => {
      const listSel =
        editForm.querySelectorAll('.editable-checklists>input');
      listSel.forEach((listItem) => listItem.disabled = false);
      editForm.querySelector('.to-enable>button').disabled = false;
    });
  }

  const todoListContCreate = function(projectName) {
    const todoList = projects.getAllTodosFromProj(projectName);
    todoListCont = document.createElement('div');
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].isComplete === false) {
        todoCard = document.createElement('div');
        todoBox = document.createElement('div');
        todoTitle = document.createElement('div');
        todoDueDate = document.createElement('div');
        todoDelete = document.createElement('div');

        todoTitle.textContent = todoList[i].title;
        if (todoList[i].dueDate) {
          todoDueDate.textContent = `Due Date: ${formatDistance(new Date(
            todoList[i].dueDate + ' ' + todoList[i].remindTime
          ), new Date(), { addSuffix: true, })}`;
        } else {
          todoDueDate.textContent = `Due Date:`;
        }

        todoCard.classList.add('todo-card');
        if (todoList[i].priority == '1') {
          todoCard.classList.add('todo-high-priority');
        } else if (todoList[i].priority == '2') {
          todoCard.classList.add('todo-medium-priority');
        } else if (todoList[i].priority == '3') {
          todoCard.classList.add('todo-low-priority');
        }
        todoBox.classList.add('todo-box');
        todoTitle.classList.add('todo-title');
        todoDueDate.classList.add('todo-due-date');
        todoDelete.classList.add('todo-delete');
        todoCard.addEventListener('click', (e) => {
          if (!e.composedPath()[0].classList.contains('todo-box')
            && !e.composedPath()[0].classList.contains('todo-delete')) {
            todoBeingEdited = todoList[i];
            revealTodo(e.composedPath()[1]);
          }
        });
        todoBox.addEventListener('click', (e) => {
          e.composedPath()[1].remove();
          todoList[i].isComplete = true;
          projects.saveToLocalStorage();
          exitEditMenu(e);
        })
        todoDelete.addEventListener('click', (e) => {
          e.composedPath()[1].remove();
          projects.delTodo(todoList[i], projectName);
          exitEditMenu(e);
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

  const todoListOpen = function() {
    currProject = this.querySelector('.project-name').textContent;
    document.body.removeChild(projListCont);
    document.body.appendChild(curtainBarCreate());
    document.body.appendChild(todoListContCreate(currProject));
  };

  const projListContCreate = function() {
    projListCont = document.createElement('div');
    const projectNames = projects.getProjectNames();
    for (let i = 0; i < projectNames.length; i++) {
      projectCard = document.createElement('div');
      projectIcon = document.createElement('div');
      projectName = document.createElement('div');
      projectDelete = document.createElement('div');

      projectCard.addEventListener('click', todoListOpen);
      projectName.textContent = projectNames[i];

      projectCard.className = 'project-card';
      projectIcon.className = 'project-icon';
      projectName.className = 'project-name';
      projectDelete.className = 'project-delete';

      projListCont.appendChild(projectCard);
      projectCard.appendChild(projectIcon);
      projectCard.appendChild(projectName);
      projectCard.appendChild(projectDelete);
    }
    projListCont.querySelector('.project-card').style.background = '#0d0';
    projListCont.querySelector('.project-icon').style.background =
      `50% 50% url(${starUrl}) no-repeat`;
    projListCont.querySelector('.project-card')
      .removeChild(projListCont.querySelector('.project-delete'));
    projListCont.className = 'projects-list-container';
    return projListCont;
  };

  const viewAllProjects = function() {
    document.body.removeChild(curtainBar);
    document.body.removeChild(document.querySelector('.todo-list-container'));

    document.body.appendChild(projListContCreate());
    document.querySelector('.switch-complete').textContent = 'Completed Todos';
    document.querySelector('.create-item-button').style.visibility = 'visible';
  };

  const showAddMenu = function() {
    if (document.querySelector('.todo-list-container')) {
      todoCreateForm.querySelector('.initial-checklists').innerHTML =
        '<input type="text" placeholder="Check1"><div class="to-enable">\
        <input type="text" disabled>\
        <button type="button">+</button></div>';
      todoCreateForm.querySelector('.to-enable>button')
        .addEventListener('click', addCheck);
      todoCreateForm.reset();
      layerShield.style.visibility = 'visible';
      layerShield.querySelector('input').focus();
    }
    else {
      projCrCont.style.visibility = 'visible';
      projCrCont.querySelector('input').focus();
      setTimeout(() => {
        if (projCrCont.querySelector('input').value === '') {
          projCrCont.style.visibility = 'hidden';
        }
      }, 5000);
    }
  };

  const addItem = function() {
    if (document.querySelector('.todo-list-container')) {
      const titleInp = document.getElementById('initial-title').value;
      const descInp = document.getElementById('initial-desc').value;
      const dateInp = document.getElementById('initial-date').value;
      const priorityLabel =
        document.querySelector('[type=radio]:checked+label').textContent;
      const priorityInp =
        priorityLabel === 'High' ? '1' : priorityLabel === 'Medium' ? '2' : '3';
      const notesInp = document.getElementById('initial-notes').value;
      const checklistSels =
        document.querySelectorAll('.initial-checklists>input');
      let checklistInp = [];
      checklistSels.forEach((checklistSel) => {
        if (checklistSel.value !== '') {
          checklistInp.push(checklistSel.value);
        }
      });
      const reminderInp = document.getElementById('initial-reminder').value;
      let newTodo = new TodoCons(
        titleInp,
        descInp,
        dateInp,
        priorityInp,
        notesInp,
        checklistInp,
        reminderInp,
        false
      );
      projects.addTodoToProject(newTodo, currProject);
      layerShield.style.visibility = 'hidden';
      document.body.removeChild(todoListCont);
      document.body.appendChild(todoListContCreate(currProject));
    }
    else {
      projects.addProject(projCrCont.querySelector('input').value);

      projectCard = document.createElement('div');
      projectIcon = document.createElement('div');
      projectName = document.createElement('div');
      projectDelete = document.createElement('div');

      projectCard.addEventListener('click', todoListOpen);
      projectName.textContent = projCrCont.querySelector('input').value;

      projectCard.className = 'project-card';
      projectIcon.className = 'project-icon';
      projectName.className = 'project-name';
      projectDelete.className = 'project-delete';

      projListCont.appendChild(projectCard);
      projectCard.appendChild(projectIcon);
      projectCard.appendChild(projectName);
      projectCard.appendChild(projectDelete);
      projCrCont.querySelector('input').value = '';
      projCrCont.style.visibility = 'hidden';
    }
  };

  const addCheck = function() {
    const checklistContSel = this.parentElement.parentElement;
    if (checklistContSel.childElementCount < 20) {
      let newCheck = document.createElement('input');
      newCheck.setAttribute('type', 'text');
      this.parentElement.before(newCheck);
      newCheck.focus();
    }
  }

  const exitForm = function(e) {
    if (!e.composedPath().includes(
      document.querySelector('#todo-create-form')
    )) {
      layerShield.style.visibility = 'hidden';
    }
  }

  const swapPage = function() {
    if (this.textContent === 'Go Back') {
      this.textContent = 'Completed Todos';
      todoListCont = document.querySelector('.todo-list-container');
      document.body.removeChild(todoListCont);
      document.body.appendChild(todoListContCreate(currProject));
      document.querySelector('.create-item-button').style.visibility =
        'visible';
    } else {
      Complete().activate(projects, currProject);
    }
  }

  const onVisit = function() {
    document.body.appendChild(curtainBarCreate());
    projects.loadFromLocalStorage();
    document.body.appendChild(todoListContCreate('default'));
    document.querySelector('.create-item-button')
      .addEventListener('click', showAddMenu);
    projCrCont.querySelector('button').onclick = addItem;
    layerShield.querySelector('.flex-container>button').onclick = addItem;
    layerShield.addEventListener('click', exitForm);
    document.querySelector('.switch-complete')
      .addEventListener('click', swapPage);
    editForm.querySelector('.to-enable>button')
      .addEventListener('click', addCheck);
    pencils.forEach((pencil) => pencil.addEventListener('click', () => {
      pencil.style.backgroundColor = '#4ade80';
    }));
    document.addEventListener('click', exitEditMenu, { capture: true });
  };

  return {
    onVisit,
  }
};

const projects = Projects();
DomController().onVisit();
