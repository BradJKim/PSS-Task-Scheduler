package com.utils;

import com.models.Task;
import java.util.ArrayList;
import java.time.LocalDateTime;

public class TimeValidator {

    /**
     * Checks if the new task overlaps with any existing tasks.
     *
     * @param newTask The new task to be validated.
     * @param existingTasks The list of existing tasks.
     * @return true if the task does not overlap, false otherwise.
     */
    public static boolean isValidTask(Task newTask, ArrayList<Task> existingTasks) {
        if (newTask.getDateTimeStart().isAfter(newTask.getDateTimeEnd())) {
            return false;
        }

        for (Task existingTask : existingTasks) {
            if (doTasksOverlap(newTask, existingTask)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Checks if two tasks overlap in time and date.
     *
     * @param task1 The first task.
     * @param task2 The second task.
     * @return true if the tasks overlap, false otherwise.
     */
    private static boolean doTasksOverlap(Task task1, Task task2) {
        LocalDateTime start1 = task1.getDateTimeStart();
        LocalDateTime end1 = task1.getDateTimeEnd();
        LocalDateTime start2 = task2.getDateTimeStart();
        LocalDateTime end2 = task2.getDateTimeEnd();

        boolean isOverlap = start1.isBefore(end2) && end1.isAfter(start2);
        boolean isSameTime = start1.isEqual(start2) || end1.isEqual(end2);
                
        if ( isOverlap || isSameTime ) {
            return true;
        }
        return false;
    }
}