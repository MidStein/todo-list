import sortByPriority from "./todo-priority";

const Projects = function() {
    let projTodoDict = {'default': [],};
    const storage = window.localStorage;
    const addProject = function(projName) {
        projTodoDict[`${projName}`] = [];
    };
    const getProjectNames = function() {
        const projectNames = [];
        projectNames.push(...Object.keys(projTodoDict));
        return projectNames;
    };
    const loadFromLocalStorage = function() {
        if (storage.getItem('projTodoDict')) {
            projTodoDict = JSON.parse(storage.getItem('projTodoDict'));
        }
    };
    const saveToLocalStorage = function() {
        storage.setItem('projTodoDict', JSON.stringify(projTodoDict));;
    };
    const delProject = function(projName) {
        delete projTodoDict[`${projName}`];
        saveToLocalStorage();
    };
    const addTodoToProject = function(todoObject, projName) {
        projTodoDict[`${projName}`].push(todoObject);
        const todoArr = getAllTodosFromProj(projName);
        projTodoDict[`${projName}`] = sortByPriority(todoArr);
        saveToLocalStorage();
    };
    const getAllTodosFromProj = function(projName) {
        const todoList = [];
        todoList.push(...projTodoDict[`${projName}`]);
        return todoList;
    };
    const delTodo = function(todoObject, projName) {
        let todoList = projTodoDict[projName];
        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i] === todoObject) {
                todoList.splice(i, 1);
                return;
            }
        }
    }

    return {
        addProject,
        getProjectNames,
        delProject,
        addTodoToProject,
        getAllTodosFromProj,
        delTodo,
        loadFromLocalStorage,
        saveToLocalStorage,
    }
};

export default Projects;
