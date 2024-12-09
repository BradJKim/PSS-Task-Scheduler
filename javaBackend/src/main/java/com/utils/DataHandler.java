package com.utils;

import org.json.JSONObject;

import java.io.IOException;
import java.io.FileWriter;
import java.nio.file.Files;
import java.nio.file.Paths;

import java.util.ArrayList;
import java.util.Iterator;

import com.models.RecurringTask;
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

            Iterator<String> keys = jsonObject.keys();
            while (keys.hasNext()) {
                String id = jsonObject.getString("id");
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
                    task = new RecurringTask(id, name, taskSpecific, date, startTime, endTime, repeatPeriod, endDate, type);
                    taskList.add(task);
                } else if (type.equals("transient")) {
                    task = new TransientTask(id, name, taskSpecific, date, startTime, endTime, type);
                    taskList.add(task);
                }
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
