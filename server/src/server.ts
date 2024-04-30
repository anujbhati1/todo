import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());
const port: number = Number(process.env.PORT) || 3000;
const prisma = new PrismaClient();

app.post('/api/todos', async (req: Request, res: Response) => {
  try {
    const { todo, userId } = req.body;
    const newTodo = await prisma.todo.create({
      data: {
        todo,
        userId,
      },
    });
    res.status(200).json({ message: 'Success', data: newTodo });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/todos/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const allTodos = await prisma.todo.findMany({
      where: {
        userId,
      },
    });
    res.status(200).json({ message: 'Success', data: allTodos });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTodo = await prisma.todo.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: 'Success', data: deletedTodo });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.patch('/api/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isDone, todo } = req.body;

    const updateData: any = {};
    if (isDone !== undefined) {
      updateData.isDone = isDone;
    }
    if (todo !== undefined) {
      updateData.todo = todo;
    }

    const updatedTodo = await prisma.todo.update({
      data: updateData,
      where: {
        id,
      },
    });

    res.status(200).json({ message: 'Success', data: updatedTodo });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email,
        password,
      },
    });
    res.status(200).json({ message: 'Success', data: user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/signup', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    res.status(200).json({ message: 'Success', data: newUser });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
