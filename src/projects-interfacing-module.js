import sortByPriority from "./todo-priority-module";

const Projects = function() {
    const projTodoDict = {'default': [],};
    const addProject = function(projName) {
        projTodoDict[`${projName}`] = [];
    };
    const getProjectNames = function() {
        const projectNames = [];
        projectNames.push(...Object.keys(projTodoDict));
        return projectNames;
    }
    const delProject = function(projName) {
        delete projTodoDict[`${projName}`];
    };
    const addTodoToProject = function(todoObject, projName) {
        projTodoDict[`${projName}`].push(todoObject);
        const todoArr = getAllTodosFromProj(projName);
        projTodoDict[`${projName}`] = sortByPriority(todoArr);
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
                delete todoList[i];
                console.log(todoList);
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
    }
};

export default Projects;