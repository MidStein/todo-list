import './style.css';
import Projects from './projects-interfacing-module';
import TodoCons from "./todo-generator-module";
import Complete from './completed-todo-module';
import expandMoreUrl from './icons/expand-more.svg';
import addUrl from './icons/add.svg';
import categoryUrl from './icons/category.svg';
import starUrl from './icons/star.svg';
import deleteUrl from './icons/delete.svg';
import todoCreateBg from './images/tasks-art.png';
import editUrl from './icons/edit.svg';

const DomController = function() {
    let currProject = 'default';
    let bringDownSel, curtainBarSel, titleBarSel;
    let projListContSel, projectCardSel, projectIconSel, projectNameSel, projectDeleteSel;
    let todoListContSel, todoCardSel, todoBoxSel, todoTitleSel, todoDueDateSel, todoDeleteSel;
    const projCrContSel = document.querySelector('.project-create-container');
    const layerShieldSel = document.querySelector('.layer-shield');
    const todoCreateFormSel = layerShieldSel.querySelector('#todo-create-form');
    const editFormSel = document.getElementById('todo-edit-form');
    const pencils = document.querySelectorAll('.edit-image');
    let titleSel, descSel, dateSel, notesSel, reminderSel;
    let todoBeingEdited;

    const curtainBarCreate = function() {
        curtainBarSel = document.createElement('div');
        titleBarSel = document.createElement('div');
        bringDownSel = document.createElement('div');

        titleBarSel.textContent = 'All Projects'
        bringDownSel.addEventListener('click', viewAllProjects);

        titleBarSel.className = 'all-projects';
        bringDownSel.className = 'expand-more';

        curtainBarSel.appendChild(titleBarSel);
        curtainBarSel.appendChild(bringDownSel);
        return curtainBarSel;
    };
    const exitEditMenu = function(e) {
        if (editFormSel.style.visibility === 'visible' && !e.composedPath().includes(editFormSel)) {
            todoBeingEdited.title = titleSel.value;
            todoBeingEdited.description = descSel.value;
            todoBeingEdited.dueDate = dateSel.value;
            todoBeingEdited.notes = notesSel.value;
            todoBeingEdited.remindTime = reminderSel.value;
            const priorityFinal = editFormSel.querySelector('[type="radio"]:checked+label').textContent;
            todoBeingEdited.priority = priorityFinal === 'High' ? '1' : priorityFinal === 'Medium' ? '2' : '3';
            const checksFinal = editFormSel.querySelectorAll('.editable-checklists>input');
            todoBeingEdited.checklist = [];
            checksFinal.forEach(check => {
                if (check.value !== '') {
                    todoBeingEdited.checklist.push(check.value);
                }
            });
            editFormSel.querySelector('.to-enable>button').disabled = true;
            if (editFormSel.previousElementSibling) {
                editFormSel.previousElementSibling.querySelector('.todo-title').textContent = titleSel.value;
                editFormSel.previousElementSibling.querySelector('.todo-due-date').textContent = "Due Date: " + dateSel.value;
                editFormSel.previousElementSibling.classList = ['todo-card'];
                if (priorityFinal === 'High') {
                    editFormSel.previousElementSibling.classList.add('todo-high-priority');
                } else if (priorityFinal === 'Medium') {
                    editFormSel.previousElementSibling.classList.add('todo-medium-priority');
                } else {
                    editFormSel.previousElementSibling.classList.add('todo-low-priority');
                }
            }
            editFormSel.style.visibility = 'hidden';
            editFormSel.style.position = 'absolute';
            pencils.forEach(pencil => pencil.style.backgroundColor = 'transparent');
            editFormSel.querySelectorAll('input').forEach(input => input.disabled = true);
            editFormSel.querySelector('textarea').disabled = true;
            editFormSel.querySelectorAll('[type="radio"]').forEach(input => input.disabled = false);
            editFormSel.querySelector('fieldset').disabled = true;
        }
    }
    const revealTodo = function(todoCard) {
        todoCard.after(editFormSel);
        editFormSel.style.visibility = 'visible';
        editFormSel.style.position = 'static';
        if (todoBeingEdited.priority === '1') {
            editFormSel.classList = ['todo-high-priority']
        } else if (todoBeingEdited.priority === '2') {
            editFormSel.classList = ['todo-medium-priority']
        } else {
            editFormSel.classList = ['todo-low-priority']
        }

        titleSel = editFormSel.querySelector('#editable-title');
        descSel = editFormSel.querySelector('#editable-desc');
        dateSel = editFormSel.querySelector('#editable-date');
        notesSel = editFormSel.querySelector('#editable-notes');
        reminderSel = editFormSel.querySelector('#editable-reminder');

        titleSel.value = todoBeingEdited.title;
        descSel.value = todoBeingEdited.description;
        dateSel.value = todoBeingEdited.dueDate;
        notesSel.value = todoBeingEdited.notes;
        reminderSel.value = todoBeingEdited.remindTime;
        let priorityVal = todoBeingEdited.priority;
        if (priorityVal === '1') {
            editFormSel.querySelector('#editable-high').checked = true;
        } else if (priorityVal === '2') {
            editFormSel.querySelector('#editable-medium').checked = true;
        } else {
            editFormSel.querySelector('#editable-low').checked = true;
        }
        const listOfCheck = todoBeingEdited.checklist;
        if (listOfCheck.length !== 0) {
            const checklistsSel = editFormSel.querySelector('.editable-checklists');
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

        const easyEdits = editFormSel.querySelectorAll('input+img');
        easyEdits.forEach(editPencil => editPencil.addEventListener('click', () => {
            editPencil.parentElement.querySelector('input').disabled = false;
        }));
        const priorityEdit = editFormSel.querySelector('fieldset>img');
        priorityEdit.addEventListener('click', () => {
            priorityEdit.parentElement.disabled = false;
        });
        const notesEdit = editFormSel.querySelector('[for="editable-notes"]>img');
        notesEdit.addEventListener('click', () => {
            notesEdit.parentElement.nextElementSibling.disabled = false;
        });
        const checklistEdit = editFormSel.querySelector('div>img');
        checklistEdit.addEventListener('click', () => {
            const listSel = editFormSel.querySelectorAll('.editable-checklists>input');
            listSel.forEach(listItem => listItem.disabled = false);
            editFormSel.querySelector('.to-enable>button').disabled = false;
        });
    }
    const todoListContCreate = function(projectName) {
        const todoList = projects.getAllTodosFromProj(projectName);
        todoListContSel = document.createElement('div');
        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i].isComplete === false) {
                todoCardSel = document.createElement('div');
                todoBoxSel = document.createElement('div');
                todoTitleSel = document.createElement('div');
                todoDueDateSel = document.createElement('div');
                todoDeleteSel = document.createElement('div');

                todoTitleSel.textContent = todoList[i].title;
                todoDueDateSel.textContent = `Due Date: ${todoList[i].dueDate}`;

                todoCardSel.classList.add('todo-card');
                if (todoList[i].priority == '1') {
                    todoCardSel.classList.add('todo-high-priority');
                } else if (todoList[i].priority == '2') {
                    todoCardSel.classList.add('todo-medium-priority');
                } else if (todoList[i].priority == '3') {
                    todoCardSel.classList.add('todo-low-priority');
                }
                todoBoxSel.classList.add('todo-box');
                todoTitleSel.classList.add('todo-title');
                todoDueDateSel.classList.add('todo-due-date');
                todoDeleteSel.classList.add('todo-delete');
                todoCardSel.addEventListener('click', (e) => {
                    if (!e.composedPath()[0].classList.contains('todo-box') && !e.composedPath()[0].classList.contains('todo-delete')) {
                        todoBeingEdited = todoList[i];
                        revealTodo(e.composedPath()[1]);
                    }
                });
                todoBoxSel.addEventListener('click', (e) => {
                    e.composedPath()[1].remove();
                    todoList[i].isComplete = true;
                    exitEditMenu(e);
                })
                todoDeleteSel.addEventListener('click', (e) => {
                    e.composedPath()[1].remove();
                    projects.delTodo(todoList[i], projectName);
                    exitEditMenu(e);
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
    const todoListOpen = function() {
        currProject = this.querySelector('.project-name').textContent;
        document.body.removeChild(projListContSel);
        document.body.appendChild(curtainBarCreate());
        document.body.appendChild(todoListContCreate(currProject));
    };
    const projListContCreate = function() {
        projListContSel = document.createElement('div');
        const projectNames = projects.getProjectNames();
        for (let i = 0; i < projectNames.length; i++) {
            projectCardSel = document.createElement('div');
            projectIconSel = document.createElement('div');
            projectNameSel = document.createElement('div');
            projectDeleteSel = document.createElement('div');

            projectCardSel.addEventListener('click', todoListOpen);
            projectNameSel.textContent = projectNames[i];

            projectCardSel.className = 'project-card';
            projectIconSel.className = 'project-icon';
            projectNameSel.className = 'project-name';
            projectDeleteSel.className = 'project-delete';

            projListContSel.appendChild(projectCardSel);
            projectCardSel.appendChild(projectIconSel);
            projectCardSel.appendChild(projectNameSel);
            projectCardSel.appendChild(projectDeleteSel);
        }
        projListContSel.querySelector('.project-card').style.background = '#0d0';
        projListContSel.querySelector('.project-icon').style.background = `50% 50% url(${starUrl}) no-repeat`;
        projListContSel.querySelector('.project-card')
            .removeChild(projListContSel.querySelector('.project-delete'));
        projListContSel.className = 'projects-list-container';
        return projListContSel;
    };
    const viewAllProjects = function() {
        document.body.removeChild(curtainBarSel);
        document.body.removeChild(todoListContSel);
        document.body.appendChild(projListContCreate());
    };
    const showAddMenu = function() {
        if (document.querySelector('.todo-list-container')) {
            todoCreateFormSel.querySelector('.initial-checklists').innerHTML = '<input type="text" placeholder="Check1"><div class="to-enable"><input type="text" disabled><button type="button">+</button></div>';
            todoCreateFormSel.querySelector('.to-enable>button').addEventListener('click', addCheck);
            todoCreateFormSel.reset();
            layerShieldSel.style.visibility = 'visible';
            layerShieldSel.querySelector('input').focus();
        }
        else {
            projCrContSel.style.visibility = 'visible';
            projCrContSel.querySelector('input').focus();
            setTimeout(() => {
                if (projCrContSel.querySelector('input').value === '') {
                    projCrContSel.style.visibility = 'hidden';
                }
            }, 5000);
        }
    };
    const addItem = function() {
        if (document.querySelector('.todo-list-container')) {
            const titleInp = document.getElementById('initial-title').value;
            const descInp = document.getElementById('initial-desc').value;
            const dateInp = document.getElementById('initial-date').value;
            const priorityLabel = document.querySelector('[type=radio]:checked+label').textContent;
            const priorityInp = priorityLabel === 'High' ? '1' : priorityLabel === 'Medium' ? '2' : '3';
            const notesInp = document.getElementById('initial-notes').value;
            const checklistSels = document.querySelectorAll('.initial-checklists>input');
            let checklistInp = [];
            checklistSels.forEach(checklistSel => {
                if (checklistSel.value !== '') {
                    checklistInp.push(checklistSel.value);
                }
            });
            const reminderInp = document.getElementById('initial-reminder').value;
            let newTodo = new TodoCons(titleInp, descInp, dateInp, priorityInp, notesInp, checklistInp, reminderInp, false);
            projects.addTodoToProject(newTodo, currProject);
            layerShieldSel.style.visibility = 'hidden';
            document.body.removeChild(todoListContSel);
            document.body.appendChild(todoListContCreate(currProject));
        }
        else {
            projects.addProject(projCrContSel.querySelector('input').value);

            projectCardSel = document.createElement('div');
            projectIconSel = document.createElement('div');
            projectNameSel = document.createElement('div');
            projectDeleteSel = document.createElement('div');

            projectCardSel.addEventListener('click', todoListOpen);
            projectNameSel.textContent = projCrContSel.querySelector('input').value;

            projectCardSel.className = 'project-card';
            projectIconSel.className = 'project-icon';
            projectNameSel.className = 'project-name';
            projectDeleteSel.className = 'project-delete';

            projListContSel.appendChild(projectCardSel);
            projectCardSel.appendChild(projectIconSel);
            projectCardSel.appendChild(projectNameSel);
            projectCardSel.appendChild(projectDeleteSel);
            projCrContSel.querySelector('input').value = '';
            projCrContSel.style.visibility = 'hidden';
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
        if (!e.composedPath().includes(document.querySelector('#todo-create-form'))) {
            layerShieldSel.style.visibility = 'hidden';
        }
    }
    const swapPage = function() {
        if (this.textContent === 'Go Back') {
            this.textContent = 'Completed Todos';
            todoListContSel = document.querySelector('.todo-list-container');
            document.body.removeChild(todoListContSel);
            document.body.appendChild(todoListContCreate(currProject));
            document.querySelector('.create-item-button').style.visibility = 'visible';
        } else {
            Complete().activate(projects, currProject);
        }
    }
    const onVisit = function() {
        document.body.appendChild(curtainBarCreate());
        document.body.appendChild(todoListContCreate('default'));
        document.querySelector('.create-item-button').addEventListener('click', showAddMenu);
        projCrContSel.querySelector('button').onclick = addItem;
        layerShieldSel.querySelector('.flex-container>button').onclick = addItem;
        layerShieldSel.addEventListener('click', exitForm);
        document.querySelector('.switch-complete').addEventListener('click', swapPage);
        editFormSel.querySelector('.to-enable>button').addEventListener('click', addCheck);
        pencils.forEach(pencil => pencil.addEventListener('click', () => {
            pencil.style.backgroundColor = '#4ade80';
        }));
        document.addEventListener('click', exitEditMenu, {
            capture: true,
        });
    };
    return {
        onVisit,
    }
};

const projects = Projects();
DomController().onVisit();