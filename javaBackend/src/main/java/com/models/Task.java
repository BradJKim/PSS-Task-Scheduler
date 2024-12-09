package com.models;

import java.time.LocalTime;
import java.time.LocalDate;
import java.time.LocalDateTime;

public abstract class Task {
    private String id; // Unique ID for each task
    private String name; // Name of the task
    private LocalDate date; // Date of the task in yyyy-MM-dd format
    private LocalTime startTime; // Start time of the task in HH:mm format
    private LocalTime endTime; // Start time of the task in HH:mm format
    private LocalDateTime dateTimeStart;
    private LocalDateTime dateTimeEnd;
    private String taskSpecific;
    private String type;

    public Task(String id, String name, String taskSpecific, String dateString, String startTimeString, String endTimeString, String type) {
        this.id = id;
        this.name = name;
        this.taskSpecific = taskSpecific;
        this.date = LocalDate.parse(dateString);
        this.startTime = LocalTime.parse(startTimeString);
        this.endTime = LocalTime.parse(endTimeString);
        this.dateTimeStart = startTime.atDate(date);
        this.dateTimeEnd = endTime.atDate(date);
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
    public LocalDate getDate() {
        return date;
    }

    // Getter for start time
    public LocalTime getStartTime() {
        return startTime;
    }
 
    // Getter for end time
    public LocalTime getEndTime() {
        return endTime;
    }

    // Getter for end time
    public LocalDateTime getDateTimeStart() {
        return dateTimeStart;
    }

    public LocalDateTime getDateTimeEnd() {
        return dateTimeEnd;
    }

    public String getTaskSpecific() {
        return taskSpecific;
    }

    public String getType() {
        return type;
    }
}