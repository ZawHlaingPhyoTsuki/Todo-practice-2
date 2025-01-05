export interface Task {
    id: number;
    task: string;
    completed: boolean;
}

export interface TaskStore {
    tasks: Task[];
    addTask: (task: Task) => void;
    removeTask: (id: number) => void;
    doneTask: (id: number) => void;
    updateTask: (id: number, task: string) => void;
}