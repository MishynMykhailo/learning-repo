export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export const tasks: Task[] = [
  { id: 2, title: "First", completed: true },
  { id: 1, title: "First", completed: true },
  { id: 3, title: "First", completed: true },
];
