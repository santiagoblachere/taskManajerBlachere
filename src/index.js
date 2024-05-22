import toDos from './todo';

const toDoClass = toDos()
const allProjects = {};
const defaultProject = [];
allProjects.defaultProject = defaultProject

const task1 = new toDoClass('Comprar leche', 'Ir al supermercado y comprar leche', '2024-05-22', 'alta');
const task2 = new toDoClass('Comprar leche', 'Ir al supermercado y HAHAHAHAHHAHA comprar leche', '2024-05-22', 'alta');
task1.completeStatus = 'completed';

task1.projectSelect(defaultProject);
task1.project = "defaultProject";

task2.projectSelect(defaultProject);
task2.project = "defaultProject";

console.log(defaultProject)

task1.deleteTask(defaultProject)

console.log(defaultProject)


