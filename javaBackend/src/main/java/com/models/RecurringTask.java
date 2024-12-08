package com.models;

public class RecurringTask extends Task{
    
    public int endDate = 0;
    public int repeatPeriod = 0; // in every num days
    
    public RecurringTask(String id, String name, String taskSpecific, String dateString, String startTimeString, String endTimeString, int repeatPeriod, int endDate) {
        super(id, name, taskSpecific, dateString, startTimeString, endTimeString);
        this.repeatPeriod = repeatPeriod;
        this.endDate = endDate;
    }

    public void setEndDate(int endDate) {
        this.endDate = endDate;
    }

    public void setRepeatPeriod(int repeatPeriod) {
        this.repeatPeriod = repeatPeriod;
    }

    public int getRepeatPeriod() {
        return endDate;
    }
}