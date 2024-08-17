// script.js
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-todo');
    const inputField = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    function parseInput(input) {
        // Regular expression to match time and task
        const timeRegex = /(.+?)\s*(\d{1,2}:\d{2}\s?(am|pm)?)/i;
        const match = input.match(timeRegex);
        if (match) {
            // Match groups: task is in group 1, time is in group 2
            return {
                task: match[1].trim(), // Trim to remove any extra spaces
                time: match[2].trim()  // Trim to remove any extra spaces
            };
        }
        // No time provided, just return the whole input as the task
        return {
            task: input,
            time: null
        };
    }

    function addTodo() {
        const inputText = inputField.value.trim();
        if (inputText) {
            const { task, time } = parseInput(inputText);

            // Debugging logs to check values
            console.log('Parsed Task:', task);
            console.log('Parsed Time:', time);

            const li = document.createElement('li');
            // If there is a time, include it in the HTML
            if (time) {
                li.innerHTML = `${task} <span class="time-highlight">at ${time}</span>`;
            } else {
                li.textContent = task;
            }

            // Create button set
            const buttonSet = document.createElement('div');
            buttonSet.className = 'button-set';

            // Create remove button
            const removeButton = document.createElement('button');
            removeButton.className = 'remove';
            removeButton.innerHTML = '<i class="icon-trash-alt"></i>'; // Font Awesome trash icon
            removeButton.onclick = () => {
                todoList.removeChild(li);
            };

            // Create done button
            const doneButton = document.createElement('button');
            doneButton.className = 'done';
            doneButton.textContent = 'Done';
            doneButton.onclick = () => {
                li.classList.toggle('done');
            };

            // Append buttons to button set
            buttonSet.appendChild(doneButton);
            buttonSet.appendChild(removeButton);
            // Append button set to list item
            li.appendChild(buttonSet);

            // Append list item to the todo list
            todoList.appendChild(li);

            // Clear the input field
            inputField.value = '';
        }
    }

    // Event listeners for adding tasks
    addButton.addEventListener('click', addTodo);
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
});
