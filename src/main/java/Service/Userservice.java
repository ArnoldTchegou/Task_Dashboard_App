package Service;

import Entity.AppUser;
import Entity.Task;
import Exceptions.InvalidNameLength;
import jakarta.persistence.*;

import Entity.TaskPrimaryKey;

public class Userservice {

    public EntityManager em;

    public Userservice(EntityManager em) {
        this.em = em;
    }

    //Create operation
    public void createUser() throws InvalidNameLength {
        em.getTransaction().begin();
        AppUser user1 = new AppUser();
        AppUser user2 = new AppUser();
        AppUser user3 = new AppUser();
        user1.setLastName("John");
        user1.setFirstName("Mac");
        user1.setTask(em.find(Task.class, new TaskPrimaryKey(1, "python")));
        user2.setLastName("Kevin");
        user2.setFirstName("Hi");
        user2.setTask(em.find(Task.class, new TaskPrimaryKey(1, "python")));
        user3.setLastName("Arnold");
        user3.setFirstName("Lee");
        user3.setTask(em.find(Task.class, new TaskPrimaryKey(1, "python")));
        em.persist(user1);
        em.persist(user2);
        em.persist(user3);
        em.getTransaction().commit();
    }

    //Retrieve operation
    public AppUser getUser(Long id) {
        try {
            return em.find(AppUser.class, id);

        }
        catch (Exception e) {
            System.out.println("first argument does not denote an entity type or the second argument is is not a valid PK");
            return null;
        }
    }

    //Update operation
    public AppUser updateUser(Long id) {
        try {
            em.getTransaction().begin();
            AppUser user = em.find(AppUser.class, id);
            user.setLastName("Ryan");
            em.getTransaction().commit();
            return user;
        }
        catch (Exception e) {
            System.out.println("first argument does not denote an entity type or the second argument is is not a valid PK");
            return null;
        }
    }

    //Delete operation
    public void deleteUser(Long id) {
        try {
            em.getTransaction().begin();
            AppUser user = em.find(AppUser.class, id);
            em.remove(user);
            em.getTransaction().commit();
        }
        catch (Exception e) {
            System.out.println("first argument does not denote an entity type or the second argument is is not a valid PK");
        }
    }
}
