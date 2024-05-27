export default function toDos(){
    class ToDo {
        
        constructor(title, description, dueDate, priority, project = 'defaultProject') {
            this.title = title,
            this.description = description,
            this.dueDate = dueDate,
            this.priority = priority,
            this._project = project,
            this._status = 'incomplete'
            
        }
        projectSelect(projectSelected){
            console.log(this)
            
            projectSelected.push(this);

        }
        deleteTask(projectSelected){
            const toDoIndex = projectSelected.indexOf(this);
            projectSelected.splice(toDoIndex,1)
            

        }
        get completeStatus() {
            return this._status
        }
        set completeStatus(status) {
            return this._status = status
        }
        get project() {
            return this._project
        }
        set project(project){
            return this._project = project
        }
 
    }
    function createTodo(title, description, dueDate, priority, project) {
        const task = new ToDo(title, description, dueDate, priority, project);
        return task;
    }
    return { ToDo, createTodo }
}