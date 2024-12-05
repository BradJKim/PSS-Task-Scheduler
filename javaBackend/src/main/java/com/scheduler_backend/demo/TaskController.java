package com.scheduler_backend.demo;

import java.util.HashMap;
import java.util.ArrayList;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.models.RecurringTask;
import com.models.Task;
import com.models.TransientTask;
import com.services.TaskService;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    TaskService taskService = new TaskService();

    @GetMapping("")
    public ArrayList<Task> getAllTasks() {
        ArrayList<Task> list = taskService.getAllTasks();
        return list;
    }
    
    @GetMapping("/{name}")
    public Task getTask(@PathVariable("name") String name) {
        Task task = taskService.getTaskByName(name);
        return task;
    }

    @PostMapping("/add")
    public Map<String, Object> addTask(@RequestBody Task task) {
        if (task instanceof RecurringTask) {
            taskService.addTask((RecurringTask) task);
        } else if (task instanceof TransientTask) {
            taskService.addTask((TransientTask) task);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Task added successfully");

        taskService.displayTasks();

        return response;
    }

    @DeleteMapping("/remove/{name}")
    public Map<String, Object> removeTask(@PathVariable("name") String name) {
        boolean success = taskService.removeTask(name);

        if (success) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Task removed successfuly");

            taskService.displayTasks();

            return response;
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "fail");
            response.put("message", "failed to delete");
    
            taskService.displayTasks();
    
            return response;
        }

    }
}
