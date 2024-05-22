import toDos from './todo';

const toDoClass = toDos()
const allProjects = [];
const defaultProject = ['DEFAULT'];
allProjects.push(defaultProject)

const task1 = new toDoClass('Comprar leche', 'Ir al supermercado y comprar leche', '2024-05-22', 'alta');
const task2 = new toDoClass('Comprar leche', 'Ir al supermercado y HAHAHAHAHHAHA comprar leche', '2024-05-22', 'alta');
task1.completeStatus = 'completed';


console.log(task1)

function createProject(name) {
    if (typeof name === 'string') {
        const project = [];
        project.push(name.toUpperCase());
        allProjects.push(project)
    } else {
        throw ERROR = 'NO ES UN NOMBRE VALIDO PA'
    }  
}
function deleteProject(name) {
    const asdasdad = allProjects.findIndex((project) => {
        return project[0] === name;
        
    })
    allProjects.splice(asdasdad, 1)

}




console.log(allProjects)

/* allprojects = [[todo = {project: x}], [todo = {project: y}], [todo = {project: z}] ]

como hago para que cada project tenga su identificador?

elemento en indice 0 siempre = nombre del proyecto?*/

