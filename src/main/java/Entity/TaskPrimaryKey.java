package Entity;

import jakarta.persistence.Embeddable;

@Embeddable
public class TaskPrimaryKey {
    int taskid;
    String taskName;
}
