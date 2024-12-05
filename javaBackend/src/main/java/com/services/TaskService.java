package com.services;

import java.util.ArrayList;

import com.models.Task;

import com.utils.DataHandler;
import com.utils.TimeValidator;

public class TaskService {

    private ArrayList<Task> tasks;

    private DataHandler dataHandler;

    // Constructor initializes the tasks list
    public TaskService() {
        this.tasks = new ArrayList<>();
        this.dataHandler = new DataHandler();
    }

    // Method to add a task
    public void addTask(Task task) {
        tasks.add(task);
    }

    // Method to get all tasks
    public ArrayList<Task> getAllTasks() {
        return tasks;
    }

    // Method to get a specific task by name
    public Task getTaskByName(String name) {
        for (Task task : tasks) {
            if (task.getName().equals(name)) {
                return task;
            }
        }
        return null; // return null if no task is found
    }

    // Method to remove a task by name
    public boolean removeTask(String name) {
        Task taskToRemove = getTaskByName(name);
        if (taskToRemove != null) {
            tasks.remove(taskToRemove);
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
