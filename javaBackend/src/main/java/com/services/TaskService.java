package com.services;

import java.util.ArrayList;

import com.models.Task;
import com.utils.DataHandler;

public class TaskService {

    private ArrayList<Task> tasks;

    // Constructor initializes the tasks list
    public TaskService() {
        this.tasks = new ArrayList<>();
        tasks = DataHandler.getTasks();
    }

    // Method to add a task
    public void addTask(Task task) {
        tasks.add(task);
        DataHandler.addTask(task);
    }

    // Method to get all tasks
    public ArrayList<Task> getAllTasks() {
        return tasks;
    }

    // Method to get a specific task by name
    public Task getTaskById(String id) {
        for (Task task : tasks) {
            if (task.getId().equals(id)) {
                return task;
            }
        }
        return null; // return null if no task is found
    }

    // Method to remove a task by name
    public boolean removeTask(String id) {
        Task taskToRemove = getTaskById(id);
        if (taskToRemove != null) {
            tasks.remove(taskToRemove);
            DataHandler.removeTask(id);
            return true;
        }
        return false; // task not found
    }

    // Method to display all tasks (for debugging or UI)
    public void displayTasks() {
        for (Task task : tasks) {
            System.out.println(task);
        }
    }
}
