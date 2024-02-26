import sortByPriority from "./todo-priority";

const Projects = function() {
  let projTodoDict = {'default': [],};
  const storage = window.localStorage;

  const addProject = function(projName) {
    if (!projName in projTodoDict) {
      projTodoDict[`${projName}`] = [];
    }
  };

  const getProjectNames = function() {
    return [...Object.keys(projTodoDict)];
  };

  const loadFromLocalStorage = function() {
    if (storage.getItem('projTodoDict')) {
      projTodoDict = JSON.parse(storage.getItem('projTodoDict'));
    }
  };

  const saveToLocalStorage = function() {
    storage.setItem('projTodoDict', JSON.stringify(projTodoDict));
  };

  const delProject = function(projName) {
    delete projTodoDict[`${projName}`];
    saveToLocalStorage();
  };

  const getAllTodosFromProj = function(projName) {
    return [...projTodoDict[`${projName}`]];
  };

  const addTodoToProject = function(todoObject, projName) {
    projTodoDict[`${projName}`].push(todoObject);
    const todoArr = getAllTodosFromProj(projName);
    projTodoDict[`${projName}`] = sortByPriority(todoArr);
    saveToLocalStorage();
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
