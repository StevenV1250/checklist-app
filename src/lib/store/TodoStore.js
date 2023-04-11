import { v4 as uuidv4 } from 'uuid';
import { writeable } from 'svelte/store';
import { browser } from '$app/environment';

const data = browser ? JSON.parse(window.localStorage.getItem('st-todo-list')) ?? [] : [];

export const todos = writeable(data);

//store used to save and retrieve data

todos.subscribe((value) => { //when value changes we are notified
    if (browser) {
        localStorage.setItem('st-todo-list', JSON.stringify(value));
    }
})

export const addTodo = () => { //addTodo function
    todos.update((currentTodos) => { //updates currentTodos
        return [...currentTodos, { id: uuidv4(), text: '', complete: false}];
    });
};

export const deleteTodo = (id) => {
    todos.update((currentTodos) => {
        return currentTodos.filter((todo) => todo.id !== id);
    });
};

export const toggleComplete = (id) => { //function to mark them done/notdone
    todos.update((currentTodos) => {
        return currentTodos.map((todo) => {
            if (todo.id == id) {
                return { ...todo, complete: !todo.complete };
            }
            return todo;
        });
    });
};

export const editTodo = (id, text) => { 
    todos.update((currentTodos) => {
        return currentTodos.map((todo) => {
            if (todo.id == id) {
                return { ...todo, text }; //updates text
            }
            return todo;
        });
    });
};

//functions to update store
