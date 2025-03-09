package Service;

import Entity.AppUser;
import Entity.Task;
import Exceptions.InvalidDateFormatException;
import Exceptions.InvalidNameLength;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Query;

import java.time.LocalDate;

public class Taskservice {
    public EntityManager em;

    public Taskservice(EntityManager em) {
        this.em = em;
    }

    //Create Task
    public void createTask() throws InvalidNameLength, InvalidDateFormatException {
        em.getTransaction().begin();
        Task task1 = new Task();
        task1.setTaskName("python");
        task1.setTaskDescription("reading java");
        task1.setTaskStatus(1);
        task1.setTaskstartDate(LocalDate.now());
        task1.setTaskendDate(task1.getTaskstartDate().plusDays(7));
        em.persist(task1);
        em.getTransaction().commit();
    }
}
