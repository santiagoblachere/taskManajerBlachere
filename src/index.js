import toDos from './toDos'
import project from './project'

const { ToDo, createTodo } = toDos()
const { allProjects, createDefaultProject, createProject, deleteProject } = project()
createDefaultProject();
console.log(allProjects)
const sidebar = document.getElementById('sidebar');
const tasksSection = document.getElementById('tasks');


const addTaskButton = document.createElement('button');

addTaskButton.addEventListener('click', (e) => {
    e.preventDefault()
    const newTask = createTodo('asd', 'asd', 'asd', 'asd');
    const selectedProject = newTask._project
    const projectIndex = allProjects.findIndex( el => el[0] === selectedProject);
    newTask.projectSelect(allProjects[projectIndex]);
    console.log(allProjects)
    

})

tasksSection.appendChild(addTaskButton)