import { Router } from 'express';
import userService from '../user/user.service';
import todosService from './todos.service';

const router = Router();

const userWrapper = (id: string, callback: (userId: string) => Promise<void>, errorCallback: (err: unknown) => void) => {
    userService.getById(id)
        .then(async user => {
            if (!user) {
                throw new Error('Unknown error');
            } else {
                await callback(user.id);
            }
        })
        .catch(err => errorCallback(err));
}

router.get('/', (req, res, next) => {
    userWrapper(
        req.auth.sub,
        async userId => {
            const todos = await todosService.getAllTodos(userId);
            res.json({ result: todos });
        },
        err => next(err),
    );
});
router.post('/', (req, res, next) => {
    const { title, description, due } = req.body;

    userWrapper(
        req.auth.sub,
        async userId => {
            const todo = await todosService.addTodo(userId, title, description, due);

            res.json(todo);
        },
        err => next(err),
    );
});
router.put('/:id', (req, res, next) => {
    const { title, description, due } = req.body;
    const id = req.params.id;

    userWrapper(
        req.auth.sub,
        async userId => {
            const todo = await todosService.editTodo(userId, id, title, description, due);

            res.json(todo);
        },
        err => next(err),
    );
});
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;

    userWrapper(
        req.auth.sub,
        async userId => {
            await todosService.deleteTodo(userId, id);

            res.json({});
        },
        err => next(err),
    );
});

export default router;
