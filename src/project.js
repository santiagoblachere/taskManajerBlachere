
export default function project(){
    const allProjects = [];
    function createDefaultProject(){
        
        const defaultProject = ['defaultProject'];
        allProjects.push(defaultProject)
        return allProjects 
    }
    

    function createProject(name) {
        if (typeof name === 'string') {
            const project = [];
            project.push(name.toUpperCase());
            allProjects.push(project)
        } else {
            console.log('error')
        }  
    }
    function deleteProject(name) {
        const projectToDeleteIndex = allProjects.findIndex((project) => {
            return project[0] === name;
            
        })
        allProjects.splice(projectToDeleteIndex, 1)
    }

    return { allProjects, createDefaultProject, createProject, deleteProject }

}
