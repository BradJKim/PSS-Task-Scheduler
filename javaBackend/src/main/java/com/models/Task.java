package com.models;

public abstract class Task {
    private String id; // Unique ID for each task
    private String name; // Name of the task
    private int date; // Date of the task in MMDDYYYY format
    private String startTime; // Start time of the task in HH:mm format
    private double duration; // Duration of the task in minutes
    private String type; // The type/category of the task

    public Task(String id, String name, int date, String startTime, double duration, String type) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.startTime = startTime;
        this.duration = duration;
        this.type = type;
    }

    // Getter for ID
    public String getId() {
        return id;
    }

    // Getter for name
    public String getName() {
        return name;
    }

    // Getter for date
    public int getDate() {
        return date;
    }

    // Getter for start time
    public String getStartTime() {
        return startTime;
    }

    // Getter for duration
    public double getDuration() {
        return duration;
    }

    // Getter for type
    public String getType() {
        return type;
    }
}