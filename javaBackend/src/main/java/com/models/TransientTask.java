package com.models;

public class TransientTask extends Task {
    // Constructor
    public TransientTask(String id, String name, String taskSpecific, String dateString, String startTimeString, String endTimeString) {
        super(id, name, taskSpecific, dateString, startTimeString, endTimeString);
    }
}