function TodoCons (title = 'title', description = 'A description for the todo item', 
                            dueDate = '', priority = '1', notes = 'notes corresponding to todo item', 
                            checklist = ['do during afternoon', 'record for youtube'], 
                            remindTime = '', projectCtg = 'general', isComplete = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    this.remindTime = remindTime;
    this.projectCtg = projectCtg;
    this.isComplete = isComplete;
};

export default TodoCons;