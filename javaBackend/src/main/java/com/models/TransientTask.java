package com.models;

public class TransientTask extends Task {
    // Constructor
    public TransientTask(String id, String name, String dateString, String startTimeString, String endTimeString, String taskSpecific) {
        super(id, name, dateString, startTimeString, endTimeString, taskSpecific);
    }
}