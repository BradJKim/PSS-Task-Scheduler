package com.scheduler_backend.demo;

import java.util.HashMap;
import java.util.ArrayList;
import java.util.Map;
import java.util.UUID;

import org.json.JSONObject;
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
import com.utils.TimeValidator;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    TaskService taskService = new TaskService();

    @PostMapping("/load")
    public Map<String, Object> loadTasks(@RequestBody String data) {
        Map<String, Object> response = new HashMap<>();
        
        ArrayList<Task> currentTasks = taskService.getAllTasks();
        for(Task task: currentTasks) {
            taskService.removeTask(task.getId());
        }
        
        JSONObject jsonObject = new JSONObject(data);
        for (String key : jsonObject.keySet()) {
            JSONObject taskJson = jsonObject.getJSONObject(key);
    
            UUID uuid = UUID.randomUUID();
            String id = uuid.toString();
            String name = taskJson.getString("name");
            String date = taskJson.getString("dateString");
            String startTime = taskJson.getString("startTimeString");
            String endTime = taskJson.getString("endTimeString");
            String type = taskJson.getString("type");
            String taskSpecific = taskJson.getString("taskSpecific");

            int repeatPeriod = taskJson.has("repeatPeriod") ? taskJson.getInt("repeatPeriod") : 0;
            int endDate = taskJson.has("endDate") ? taskJson.getInt("endDate") : 0;

            Task task;
            if (type.equals("recurring")) {
                task = new RecurringTask(id, name, taskSpecific, date, startTime, endTime, repeatPeriod, endDate);
            } else if (type.equals("transient")) {
                task = new TransientTask(id, name, taskSpecific, date, startTime, endTime);
            } else {
                response.put("status", "error");
                response.put("message", "Invalid task type");
                return response;
            }
    
            // Add the task to the service
            taskService.addTask(task);
        }

        response.put("status", "success");
        response.put("message", "Task added successfully");
        return response;
    }

    @GetMapping("")
    public ArrayList<Task> getAllTasks() {
        ArrayList<Task> list = taskService.getAllTasks();
        return list;
    }
    
    @GetMapping("/{id}")
    public Task getTask(@PathVariable("id") String id) {
        Task task = taskService.getTaskById(id);
        return task;
    }

    @PostMapping("/add")
    public Map<String, Object> addTask(@RequestBody String data) {
        Map<String, Object> response = new HashMap<>();
        
        JSONObject jsonObject = new JSONObject(data);
        
        UUID uuid = UUID.randomUUID();
        String id = uuid.toString();
        String name = jsonObject.getString("name");
        String date = jsonObject.getString("dateString");
        String startTime = jsonObject.getString("startTimeString");
        String endTime = jsonObject.getString("endTimeString");
        String type = jsonObject.getString("type");
        String taskSpecific = jsonObject.getString("taskSpecific");

        int repeatPeriod = jsonObject.has("repeatPeriod") ? jsonObject.getInt("repeatPeriod") : 0;
        int endDate = jsonObject.has("endDate") ? jsonObject.getInt("endDate") : 0;

        Task task;
        if (type.equals("recurring")) {
            task = new RecurringTask(id, name, taskSpecific, date, startTime, endTime, repeatPeriod, endDate);
        } else if (type.equals("transient")) {
            task = new TransientTask(id, name, taskSpecific, date, startTime, endTime);
        } else {
            response.put("status", "error");
            response.put("message", "Invalid task type");
            return response;
        }

        boolean isValid = TimeValidator.isValidTask(task, getAllTasks());
        if(!isValid) {
            response.put("status", "error");
            response.put("message", "Invalid task detected");
            return response;
        }

        taskService.addTask(task);
        taskService.displayTasks();

        response.put("status", "success");
        response.put("message", "Task added successfully");
        return response;
    }

    @DeleteMapping("/remove/{id}")
    public Map<String, Object> removeTask(@PathVariable("id") String id) {
        boolean success = taskService.removeTask(id);
        taskService.displayTasks();

        if (success) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Task removed successfuly");

            return response;
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", "failed to delete");
        
            return response;
        }

    }
}
