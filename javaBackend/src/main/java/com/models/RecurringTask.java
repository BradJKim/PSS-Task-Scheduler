package com.models;

public class RecurringTask extends Task{
    
    public int endDate = 0;
    public int repeatPeriod = 0; // in every num days

    public RecurringTask(String id, String name, int date, String startTime, double duration, String type, int repeatPeriod, int endDate) {
        super(id, name, date, startTime, duration, type);
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