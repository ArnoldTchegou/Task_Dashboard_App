package Entity;

import Exceptions.InvalidNameLength;
import jakarta.persistence.*;

import java.time.format.DateTimeFormatter;

@Access(AccessType.FIELD)
@Table(name = "Person",
    uniqueConstraints = {
        @UniqueConstraint(
                name = "unique_first_last_names",
                columnNames = {"First_Name", "Last_Name"}
        )
    })
@Entity
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "First_Name", length = 10)
    private String firstName;

    @Column(name = "Last_Name", length = 10)
    private String lastName;

    @OneToOne
    private Task task;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String name) throws InvalidNameLength {
        try{
            this.validateName(name);
            this.lastName = name;
        } catch (InvalidNameLength e) {
            throw new RuntimeException(e);
        }
    }

    public String toString(){
        return id + " " + firstName+" "+ lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String name) throws InvalidNameLength {
        try{
            this.validateName(name);
            this.firstName = name;
        } catch (InvalidNameLength e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Validates if the input Name has correct length.
     * @param Name The date string to validate.
     * @throws InvalidNameLength if the date length is incorrect.
     */
    public void validateName(String Name) throws InvalidNameLength {
        if(Name.length() > 10){
            throw new InvalidNameLength("Invalid Name Length : "+" "+Name);
        }
    }

}
