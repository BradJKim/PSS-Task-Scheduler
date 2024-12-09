package com.utils;

import org.json.JSONObject;

import java.io.IOException;
import java.io.FileWriter;
import java.nio.file.Files;
import java.nio.file.Paths;

import java.util.ArrayList;
import java.util.Iterator;

import com.models.Task;
import com.models.TransientTask;


// use org.json
public class DataHandler {
    public static final String FILEPATH = "src/main/java/com/tasks.json";

    public static ArrayList<Task> getTasks() {
        ArrayList<Task> taskList = new ArrayList<>();

        try {
            String content = new String(Files.readAllBytes(Paths.get(FILEPATH)));
            JSONObject jsonObject = new JSONObject(content);
            JSONObject tasks = jsonObject.getJSONObject("tasks");

            Iterator<String> keys = tasks.keys();
            while (keys.hasNext()) {
                String key = keys.next();
                JSONObject jsonTask = tasks.getJSONObject(key);

                String id = jsonTask.getString("id");
                String name = jsonTask.getString("name");
                String date = jsonTask.getString("date");
                String startTime = jsonTask.getString("startTime");
                String endTime = jsonTask.getString("endTime");
                String taskSpecific = jsonTask.getString("taskSpecific");

                Task task = new TransientTask(id, name, taskSpecific, date, startTime, endTime);
                taskList.add(task);
            }

            return taskList;
        } catch (IOException e) {
            return taskList;
        }
    }

    public static void addTask(Task task) {
        try {
            String content = new String(Files.readAllBytes(Paths.get(FILEPATH)));
            JSONObject jsonObject;

            if (content.trim().isEmpty()) {
                jsonObject = new JSONObject();
                jsonObject.put("tasks", new JSONObject());
            } else {
                jsonObject = new JSONObject(content);
            }

            JSONObject tasks = jsonObject.optJSONObject("tasks");
            if (tasks == null) {
                tasks = new JSONObject();
                jsonObject.put("tasks", tasks);
            }

            JSONObject newTask = new JSONObject();
            newTask.put("id", task.getId());
            newTask.put("name", task.getName());
            newTask.put("date", task.getDate());
            newTask.put("startTime", task.getStartTime());
            newTask.put("endTime", task.getEndTime());
            newTask.put("taskSpecific", task.getTaskSpecific());

            tasks.put(String.valueOf(task.getId()), newTask);

            try (FileWriter file = new FileWriter(FILEPATH)) {
                file.write(jsonObject.toString(4));
            }

            System.out.println("Task added successfully.");
        } catch (IOException e) {
            System.out.println("Error: Could not write to file");
            e.printStackTrace();
        }
    }

    public static void removeTask(String id) {
        try {
            String content = new String(Files.readAllBytes(Paths.get(FILEPATH)));
            JSONObject jsonObject;
    
            if (content.trim().isEmpty()) {
                jsonObject = new JSONObject();
                jsonObject.put("tasks", new JSONObject());
            } else {
                jsonObject = new JSONObject(content);
            }
    
            JSONObject tasks = jsonObject.optJSONObject("tasks");
            if (tasks == null) {
                tasks = new JSONObject();
                jsonObject.put("tasks", tasks);
            }
    
            if (tasks.has(id)) {
                tasks.remove(id);
    
                try (FileWriter file = new FileWriter(FILEPATH)) {
                    file.write(jsonObject.toString(4));  // Pretty print with indentation
                }
    
                System.out.println("Task with id " + id + " removed successfully.");
            } else {
                System.out.println("Task with id " + id + " not found.");
            }
    
        } catch (IOException e) {
            System.out.println("Error: Could not read/write to file");
            e.printStackTrace();
        }
    }
}
