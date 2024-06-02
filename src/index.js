import toDos from './toDos'
import project from './project'
import { compareAsc, format } from "date-fns";
import './style.css';
format(new Date(2014, 1, 11), "MM/dd/yyyy");

const { ToDo, createTodo } = toDos()
let { allProjects, createProject, deleteProject } = project()
const tasksSection = document.getElementById('tasks');
let allTasks = [];
let tasksJson = localStorage.getItem('tasks') || [];
console.log(tasksJson)
function getProjectsLS(){
    let projectsJSON = localStorage.getItem('projects');
    let parsedProjects = JSON.parse(projectsJSON) || [];
    if (parsedProjects.length > 1) {
        parsedProjects.forEach( (project) => {
        allProjects.push(project)
    })
    }
    createNavSection();
    createProjectsOptions();
};




/* TASKS FORM            */
const taskForm = document.createElement('form');
taskForm.classList.add('asd')
// title
const titleLabel = document.createElement('label');
titleLabel.textContent = 'Title: ';
const titleInput = document.createElement('input');
titleInput.type = 'text';
titleInput.name = 'title';
titleInput.id = 'title';
titleInput.required = 'true'
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
dueDateInput.required = true
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
function createProjectsOptions(){
    projectSelect.innerHTML = '';
    allProjects.forEach(project => {
        const option = document.createElement('option');
        option.value = project[0].toLowerCase().replace(/\s+/g, '-');
        if (project[0] === 'DEFAULTPROJECT') {
            option.textContent = 'NONE'
            projectSelect.appendChild(option);
        } else {
            option.textContent = project[0].toUpperCase();
            projectSelect.appendChild(option);
        }
    });
}
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
    let projectData = project.value.toUpperCase();
    
    const newTask = createTodo(titleData, descriptionData, formattedDate, priorityData, projectData);

    const projectIndex = allProjects.findIndex( proyect => proyect[0].toUpperCase() === projectData.toUpperCase());
    
    newTask.projectSelect(allProjects[projectIndex])
    allTasks.push(newTask)

    const taskToLocalStorage = JSON.stringify(allTasks);
    localStorage.setItem('tasks', taskToLocalStorage);
    drawToDos(allProjects[projectIndex]);
})
const cardContainer = document.createElement('div');
tasksSection.appendChild(cardContainer)
if (tasksJson.length > 0) {
    let tasks = JSON.parse(tasksJson);
    let tasksWithFunctions = []
    tasks.map((taskData) => {
        const newTask = createTodo(taskData.title, taskData.description, taskData.dueDate, taskData.priority, taskData.project);
        tasksWithFunctions.push(newTask)
    })
    console.log(tasksWithFunctions)
    tasksWithFunctions.forEach((task) => {
        const projectIndex = allProjects.findIndex( proyect => proyect[0].toUpperCase() === task.project.toUpperCase());
        console.log(projectIndex)
        task.projectSelect(allProjects[projectIndex]);
        
    }); 
    drawToDos(allProjects[0])
}
function drawToDos(project) {
    cardContainer.innerHTML = ''
    project.forEach(task => {
        if (task === project[0]){
            return
        }
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

        const deleteTaskButton = document.createElement('button');
        deleteTaskButton.textContent = "X";
        deleteTaskButton.addEventListener('click', () => {
            const projectIndex = allProjects.findIndex( project => project[0].toUpperCase() === task.project.toUpperCase());
            task.deleteTask(allProjects[projectIndex])
            drawToDos(allProjects[projectIndex]);
            let indexTask = allTasks.findIndex( jsonTask => jsonTask.project === task.project);
            allTasks.splice(indexTask, 1);
            console.log(allTasks)
            localStorage.setItem('tasks', JSON.stringify(allTasks));
        })
        card.appendChild(deleteTaskButton);
        

        cardContainer.appendChild(card);
    }) 
}

// PROJECT section

const sidebar = document.getElementById('sidebar');


const createProjectInput = document.createElement('input');
createProjectInput.type = 'text';
createProjectInput.name = 'newProject';
createProjectInput.id = 'newProject';


const createProjectLabel = document.createElement('label');
createProjectLabel.textContent = 'new project';
createProjectLabel.setAttribute('for', 'newProject')

const createProjectButton = document.createElement('button');
createProjectButton.textContent = 'ADD';

createProjectButton.addEventListener('click', () => {
    let projectName = document.getElementById('newProject');
    let projectNameData = projectName.value;
    createProject(projectNameData)
    console.log(allProjects)
    createProjectsOptions()
    createNavSection()
    console.log(allProjects)
    localStorage.setItem('projects', JSON.stringify(allProjects));
})

sidebar.appendChild(createProjectLabel)
sidebar.appendChild(createProjectInput)
sidebar.appendChild(createProjectButton)

const nav = document.createElement('nav');
sidebar.appendChild(nav)
function createNavSection(){
    nav.innerHTML = ''
    allProjects.forEach(project => {
         const navProjectContainer = document.createElement('div')
         const deleteProjectButton = document.createElement('button');
         const projectNavButton = document.createElement('button');
         projectNavButton.classList.add('projectNavButton');
         navProjectContainer.appendChild(projectNavButton)
         navProjectContainer.appendChild(deleteProjectButton)
         
         deleteProjectButton.addEventListener('click', () => {  
            deleteProject(project[0]);
            localStorage.setItem('projects', JSON.stringify(allProjects));
            navProjectContainer.innerHTML = "";
         })

         if (project[0] === 'DEFAULTPROJECT') {
            projectNavButton.textContent = 'NO PROJECT';
            navProjectContainer.removeChild(deleteProjectButton)
         } else {
            projectNavButton.textContent = project[0];
         }
         projectNavButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (project.length <= 1 ){
                cardContainer.innerHTML = '';
            } else {
                drawToDos(project);
            }
         });

         nav.appendChild(navProjectContainer);
     });
}


getProjectsLS()

