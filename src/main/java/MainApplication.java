import Exceptions.InvalidDateFormatException;
import Exceptions.InvalidNameLength;
import Service.Taskservice;
import Service.Userservice;
import Util.EntityManagerUtil;
import jakarta.persistence.Persistence;

public class MainApplication {
    public static void main(String[] args) throws InvalidNameLength, InvalidDateFormatException {
        Userservice appservice = new Userservice(EntityManagerUtil.getEntityManager());
        Taskservice taskservice = new Taskservice(EntityManagerUtil.getEntityManager());
        //create new user
        appservice.createUser();

        //create new task
        taskservice.createTask();

        //Get a User by id
        //System.out.println(appservice.getUser(1L).toString());

        //Update User
        //System.out.println(appservice.updateUser(1L).toString());

        //Remove User
        //appservice.deleteUser(1L);

        appservice.em.close();
    }
}
