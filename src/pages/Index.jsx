import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditTask = (task) => {
    setEditTask(task);
    setEditTaskText(task.text);
  };

  const saveEditTask = () => {
    setTasks(tasks.map(task => task.id === editTask.id ? { ...task, text: editTaskText } : task));
    setEditTask(null);
    setEditTaskText('');
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Todo App</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input 
              value={newTask} 
              onChange={(e) => setNewTask(e.target.value)} 
              placeholder="Add a new task" 
              className="flex-1"
            />
            <Button onClick={addTask}>Add</Button>
          </div>
          <ScrollArea className="h-64">
            {tasks.map(task => (
              <div key={task.id} className="flex justify-between items-center mb-2">
                <span>{task.text}</span>
                <div className="flex space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button variant="outline" onClick={() => startEditTask(task)}>Edit</Button>
                      </TooltipTrigger>
                      <TooltipContent>Edit Task</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button variant="destructive" onClick={() => deleteTask(task.id)}>Delete</Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete Task</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter className="text-center">
          <span>Total Tasks: {tasks.length}</span>
        </CardFooter>
      </Card>

      {editTask && (
        <Dialog open={editTask !== null} onOpenChange={() => setEditTask(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>Modify your task below</DialogDescription>
            </DialogHeader>
            <Input 
              value={editTaskText} 
              onChange={(e) => setEditTaskText(e.target.value)} 
              placeholder="Edit task" 
              className="mb-4"
            />
            <Button onClick={saveEditTask}>Save</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Index;