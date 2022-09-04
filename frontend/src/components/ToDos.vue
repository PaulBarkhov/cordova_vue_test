<script setup>
    import { onMounted, ref, watch } from 'vue'
    import axios from 'axios'

    const todos = ref([])

    const input_content = ref('')

    const addTodo = async () => {
        if (input_content.value.trim() === "") return
        
        const todo = {
            todo_content: input_content.value,
            todo_done: false
        }
        
        await axios.post('/todos', todo)
            .then(res => todos.value.push(todo))
            .catch(err => console.log(err))
    }

    // const deleteTodo = (todo) => {
    //     todos.value = todos.value.filter(item => item !== todo)
    // }

    onMounted(async () => {
        await axios.get('/todos')
            .then(res => {
                console.log(res)
                todos.value = res.data.todos
            })
            .catch(err => console.log(err))
    }) 

    watch(todos, (newVal) => {

    }, {deep: true})
</script>

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

<style scoped>
.wrapper {
    padding: 2rem;
}

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
