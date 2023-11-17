import Todos from './todos.model';
import moment from 'moment';

const getAllTodos = async (userId: string) => {
    return Todos.find({ owner: userId }).exec();
}

const addTodo = async (userId: string, title: string, description: string, due: Date) => {
    const created = moment();

    const todo = await Todos.create({
        owner: userId,
        title,
        description,
        created,
        due,
    });

    return todo.toJSON();
}

const editTodo = async (userId: string, id: string, title?: string, description?: string, due?: Date) => {
    const todo = await Todos.findOneAndUpdate({
        _id: id,
        owner: userId,
    }, {
        title,
        description,
        due,
    }).exec();

    if (!todo) {
        throw new Error('Todo item not found');
    }

    return todo.toJSON();
}

const deleteTodo = async (userId: string, id: string) => {
    return Todos.findOneAndDelete({
        _id: id,
        owner: userId,
    }).exec();
}

export default {
    getAllTodos,
    addTodo,
    editTodo,
    deleteTodo,
}
