package Entity;

import jakarta.persistence.Embeddable;

@Embeddable
public class TaskPrimaryKey {
    int taskid;
    String taskName;
    public TaskPrimaryKey() {
    }
    public TaskPrimaryKey(int taskid, String taskName) {
        this.taskid = taskid;
        this.taskName = taskName;
    }
}
