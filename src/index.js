import toDos from './toDos'
import project from './project'
import { compareAsc, format } from "date-fns";

format(new Date(2014, 1, 11), "MM/dd/yyyy");

const { ToDo, createTodo } = toDos()
const { allProjects, createDefaultProject, createProject, deleteProject } = project()
createDefaultProject();
console.log(allProjects)
const sidebar = document.getElementById('sidebar');
const tasksSection = document.getElementById('tasks');
/* FORM */


const taskForm = document.createElement('form');

// title
const titleLabel = document.createElement('label');
titleLabel.textContent = 'Title: ';
const titleInput = document.createElement('input');
titleInput.type = 'text';
titleInput.name = 'title';
titleInput.id = 'title'
taskForm.appendChild(titleLabel);
taskForm.appendChild(titleInput);
taskForm.appendChild(document.createElement('br'));

// description
const descriptionLabel = document.createElement('label');
descriptionLabel.textContent = 'Description: ';
const descriptionInput = document.createElement('textarea');
descriptionInput.name = 'description';
descriptionInput.id = 'description'
taskForm.appendChild(descriptionLabel);
taskForm.appendChild(descriptionInput);
taskForm.appendChild(document.createElement('br'));

// due Date
const dueDateLabel = document.createElement('label');
dueDateLabel.textContent = 'Due Date: ';
const dueDateInput = document.createElement('input');
dueDateInput.type = 'date';
dueDateInput.name = 'dueDate';
dueDateInput.id = 'dueDate'
taskForm.appendChild(dueDateLabel);
taskForm.appendChild(dueDateInput);
taskForm.appendChild(document.createElement('br'));

// priority
const priorityLabel = document.createElement('label');
priorityLabel.textContent = 'Priority: ';
const prioritySelect = document.createElement('select');
prioritySelect.name = 'priority';
prioritySelect.id = 'priority';
['High', 'Medium', 'Low'].forEach(level => {
    const option = document.createElement('option');
    option.value = level.toLowerCase();
    option.textContent = level;
    prioritySelect.appendChild(option);
});
taskForm.appendChild(priorityLabel);
taskForm.appendChild(prioritySelect);
taskForm.appendChild(document.createElement('br'));

// project

const projectLabel = document.createElement('label');
projectLabel.textContent = 'Project: ';
const projectSelect = document.createElement('select');
projectSelect.name = 'project';
projectSelect.id = 'project'
allProjects.forEach(project => {
    const option = document.createElement('option');
    option.value = project[0].toLowerCase().replace(/\s+/g, '-');
    option.textContent = project;
    projectSelect.appendChild(option);
});
taskForm.appendChild(projectLabel);
taskForm.appendChild(projectSelect);
taskForm.appendChild(document.createElement('br'));



tasksSection.appendChild(taskForm)



const addTaskButton = document.createElement('button');
addTaskButton.setAttribute('type', 'submit')
addTaskButton.innerText = 'ADD TASK';

taskForm.appendChild(addTaskButton)

taskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let title = document.getElementById('title');
    let titleData = title.value;

    let description = document.getElementById('description');
    let descriptionData = description.value;

    let dueDate = document.getElementById('dueDate');
    let dueDateChosen = new Date(dueDate.value);
    const formattedDate = format(dueDateChosen, 'MM/dd/yyyy');

    let priority = document.getElementById('priority')
    let priorityData = priority.value;

    let project =  document.getElementById('project');
    let projectData = project.value;
    

    const newTask = createTodo(titleData, descriptionData, formattedDate, priorityData, projectData);
   
    const projectIndex = allProjects.findIndex( el => el[0] === projectData);
    newTask.projectSelect(allProjects[projectIndex])
    drawToDo(newTask)
})

function drawToDo(task) {
    
    const card = document.createElement('div');
    card.className = 'todo-card';

    const titleElement = document.createElement('h2');
    titleElement.textContent = task.title;
    card.appendChild(titleElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = task.description;
    card.appendChild(descriptionElement);

    const dueDateElement = document.createElement('p');
    dueDateElement.textContent = `Due Date: ${task.dueDate}`;
    card.appendChild(dueDateElement);

    const priorityElement = document.createElement('p');
    priorityElement.textContent = `Priority: ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}`;
    card.appendChild(priorityElement);

    const projectElement = document.createElement('p');
    projectElement.textContent = `Project: ${task.project.charAt(0).toUpperCase() + task.project.slice(1)}`;
    card.appendChild(projectElement);

    tasksSection.appendChild(card);
}