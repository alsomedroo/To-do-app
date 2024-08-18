// script.js
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-todo');
    const inputField = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    function parseInput(input) {
        const timeRegex = /(.+?)\s*(\d{1,2}:\d{2}\s?(am|pm)?)/i;
        const match = input.match(timeRegex);
        if (match) {
            return {
                task: match[1].trim(),
                time: match[2].trim()  
            };
        }
        return {
            task: input,
            time: null
        };
    }

    function addTodo() {
        const inputText = inputField.value.trim();
        if (inputText) {
            const { task, time } = parseInput(inputText);
            console.log('Parsed Task:', task);
            console.log('Parsed Time:', time);
            const li = document.createElement('li');
            if (time) {
                li.innerHTML = `${task} <span class="time-highlight">at ${time}</span>`;
            } else {
                li.textContent = task;
            }
            const buttonSet = document.createElement('div');
            buttonSet.className = 'button-set';
            const removeButton = document.createElement('button');
            removeButton.className = 'remove';
            removeButton.innerHTML = '<i class="icon-trash-alt"></i>'; 
            removeButton.onclick = () => {
                todoList.removeChild(li);
            };
            const doneButton = document.createElement('button');
            doneButton.className = 'done';
            doneButton.textContent = 'Done';
            doneButton.onclick = () => {
                li.classList.toggle('done');
            };
            buttonSet.appendChild(doneButton);
            buttonSet.appendChild(removeButton);
            li.appendChild(buttonSet);
            todoList.appendChild(li);
            inputField.value = '';
        }
    }
    addButton.addEventListener('click', addTodo);
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
});
