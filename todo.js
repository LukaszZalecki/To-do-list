window.addEventListener('load', () =>{
    todoLocalStorage = JSON.parse(localStorage.getItem('key')) || []; 
    const todoForm = document.querySelector("#add-task-form");
    const inputForm = document.querySelector("#new-task-input");
    document.getElementById("year").innerHTML = new Date().getFullYear();
    
 
    
        todoForm.addEventListener('submit', e =>{
            e.preventDefault();
            
            const todo={
                content: e.target.elements.content.value,
                done: false
            }
            if(inputForm.value=="" || inputForm.value.trim().length === 0){ 
                alert("Type something.")
            }
            else{
                todoLocalStorage.push(todo);
                localStorage.setItem('key', JSON.stringify(todoLocalStorage));
                e.target.reset();
                
                ShowList();
            }
            
        })

        const leng = todoLocalStorage.length;
        var done = 0;
        var nDone = 0;
        for(let i = 0; i < leng; i++){
            if(todoLocalStorage[i].done ){
                done++;
            }
            else{
                nDone++;
            }
        }
        if(todoLocalStorage.length == 0){
            nDone = 0;
        }
        document.getElementById("span-tasks-to-do").innerHTML = done;
        document.getElementById("span-tasks-done").innerHTML = nDone;
    
        

        
        ShowList();
   
    
})

function ShowList(){
    const list = document.querySelector("#added-tasks");
    list.innerHTML = "";

    todoLocalStorage.forEach(todo =>{
        //Stworzenie diva do przechowywania zadania///////////////////////////////////
        const taskDiv = document.createElement("div");
        taskDiv.className = "task-div";
        list.insertBefore(taskDiv, list.firstChild);

        //Stworzenie diva do przechowywania zawartości zadania////////////////////////
        const taskDivUp = document.createElement("div");
        taskDivUp.className = "task-div-up";
        taskDiv.appendChild(taskDivUp);

        //Stworzenie inputa readonly do wypisania treści zadania /////////////////////
        const taskDivInput = document.createElement("input");
        //taskDivInput.className = "task-div-input";
        taskDivInput.type = "text";
        taskDivInput.setAttribute("readonly", "true");
        taskDivInput.value = todo.content;
        taskDivUp.appendChild(taskDivInput);

        //Stworzenie diva do w którym będą przyciski 'zrobiono', 'edytuj', 'usun'////
        const taskDivDown = document.createElement("div");
        taskDivDown.className = "task-div-down";
        taskDiv.appendChild(taskDivDown);

        //Przycisk ZROBIONE
        const doneButton = document.createElement("button");
        doneButton.className = "done-button";
        doneButton.innerHTML = '<i class="demo-icon icon-ok"></i>';
        taskDivDown.appendChild(doneButton);

        //Przycisk ZROBIONE//////////////////////////////////////////////////////////
        if(todo.done){
            taskDivInput.style.textDecoration ="line-through";
            doneButton.innerHTML = '<i class="demo-icon icon-cancel"></i>';
            doneButton.style.color = "#CC0000";
        }

        //Funkcjonalność przycisku ZROBIONE//////////////////////////////////////////
        doneButton.addEventListener('click', () => {
            todo.done = !todo.done;

            if(todo.done){
                let fromIndex = (todoLocalStorage.indexOf(todo));
                let toIndex = 0;
                let element = todoLocalStorage.splice(fromIndex, 1)[0];
                todoLocalStorage.splice(toIndex, 0, element);
                
            }
            else{
                let fromIndex = (todoLocalStorage.indexOf(todo));
                let toIndex = todoLocalStorage.length - 1;
                let element = todoLocalStorage.splice(fromIndex, 1)[0];
                todoLocalStorage.splice(toIndex, 0, element);
            }
            localStorage.setItem('key', JSON.stringify(todoLocalStorage)); 
            ShowList();
           
        })

        //Przycisk EDYTUJ///////////////////////////////////////////////////////////
        const editButton = document.createElement("button");
        editButton.className = "edit-button";
        editButton.innerHTML = '<i class="demo-icon icon-pencil"></i>';
        taskDivDown.appendChild(editButton);

        //Funkcjonalność przycisku EDYTUJ
        editButton.addEventListener('click', () =>{
            if(taskDivInput.hasAttribute("readonly", "true")){
                taskDivInput.removeAttribute("readonly");
                taskDivInput.focus();
                editButton.style.color = "blue";
            }
            else{
                if(taskDivInput.value == "" || taskDivInput.value.trim().length === 0){
                    alert("Empty task");
                    taskDivInput.focus();
                }
                else{
                    taskDivInput.setAttribute("readonly", "true");
                    todo.content = taskDivInput.value;
                    localStorage.setItem('key', JSON.stringify(todoLocalStorage));
                    ShowList();
                }
            }
            

             
            
        })

        //Przycisk USUŃ/////////////////////////////////////////////////////////////
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button"
        deleteButton.innerHTML = '<i class="demo-icon icon-trash-empty"></i>';
        taskDivDown.appendChild(deleteButton);

        //Funkcjonalność przycisku USUŃ/////////////////////////////////////////////
        deleteButton.addEventListener('click', e => {
            todoLocalStorage = todoLocalStorage.filter(task => task != todo);
            localStorage.setItem('key', JSON.stringify(todoLocalStorage));
            if(todoLocalStorage.length == 0){
                document.getElementById("span-tasks-to-do").innerHTML = 0;
                document.getElementById("span-tasks-done").innerHTML = 0;
            }
            ShowList();
        })

        const leng = todoLocalStorage.length;
        var done = 0;
        var nDone = 0;
        for(let i = 0; i < leng; i++){
            if(todoLocalStorage[i].done ){
                done++;
            }
            else{
                nDone++;
            }
        }
        if(todoLocalStorage.length == 0){
            nDone = 0;
        }
        document.getElementById("span-tasks-to-do").innerHTML = done;
        document.getElementById("span-tasks-done").innerHTML = nDone;
        
    }) 
}
