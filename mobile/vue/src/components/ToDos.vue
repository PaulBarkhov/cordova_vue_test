<template>
    <div class="wrapper">
        <form @submit.prevent="addTodo">
            <input type="text" v-model="input_content" placeholder="Enter what you need to do">
            <input type="submit" value="Add To Do">
        </form>

        <ul>
            <li v-for="todo in todos">
                <label>
                    <div>
                        <input type="checkbox" v-model="todo.todo_done">
                        <span :class="todo.todo_done && 'done'">{{ todo.todo_content }}</span>
                    </div>
                    <!-- <button @click="deleteTodo(todo)">Delete</button> -->
                </label>
            </li>
        </ul>
    </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'

export default {
    props: {
        modelValue: {
            type: String,
        },
    },
    data() {
        return {
            todos: JSON.parse(localStorage.getItem('todos')) || [],
            input_content: '',
            timeout: () => { }
        }
    },
    methods: {
        setCustomTimeout(message) {
            console.log(this.timeout)
            clearTimeout(this.timeout)
            this.setNotificationContent(message)
            this.timeout = setTimeout(() => {
                this.setNotificationContent('')
            }, 5000);
        },
        async fetchTodos() {
            await axios.get('http://192.168.223.150/todos')
                .then(res => {
                    localStorage.setItem('todos', JSON.stringify(res.data.todos))
                    this.setCustomTimeout('Todos loaded from the server')
                    this.todos = res.data.todos
                })
                .catch(err => {
                    console.error(err)
                    this.setCustomTimeout('loading from the server failed. Loading from local storage')
                })
        },
        async addTodo() {
            if (this.input_content.trim() === "") return

            const todo = {
                todo_content: this.input_content,
                todo_done: false
            }

            this.todos.push(todo)

            localStorage.setItem('todos', JSON.stringify(this.todos))
            this.setCustomTimeout('Todo saved in local storage')

            await axios.post('http://192.168.223.150/todos', todo)
                .then(res => {
                    this.setCustomTimeout(this.modelValue + ' and sent to the server')
                })
                .catch(err => {
                    this.setCustomTimeout(this.modelValue + '. Failed to sent to the server')

                })
        },
        setNotificationContent(value) {
            this.$emit('update:modelValue', value)
        },

    },
    mounted() {
        this.fetchTodos()
    }
}

</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
}

input {
    border-radius: 5px;
    height: 2rem;

}

input:focus {
    outline: 1px solid hsla(160, 100%, 37%, 1);
    ;
}

input[type=text] {
    padding-left: 1em;
    font-size: 1em;
    border: 1px solid rgb(224, 224, 224);
}

input[type=submit] {
    border: none;
    background-color: hsla(160, 100%, 37%, 1);
    color: white;
    font-weight: 600;
    font-size: 1em;
    height: 2rem;
    box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.8), 5px 5px 10px rgba(0, 0, 0, 0, 25);
}

input[type=checkbox] {
    outline: none;
}

ul {
    list-style: none;
    padding-inline-start: 0;
}

li {
    width: 100%;
    border: 1px solid rgb(224, 224, 224);
    border-radius: 5px;
    background-color: white;
    padding: 5px 10px;
    margin-bottom: 5px;
}

label {
    display: flex;
    justify-content: space-between;
}

label div {
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 1.4em;
    text-overflow: clip;
}

button {
    border: none;
    background: none;
    color: rgb(214, 28, 28);
}

.done {
    text-decoration: line-through;
}
</style>
