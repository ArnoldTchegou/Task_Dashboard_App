package Util;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class EntityManagerUtil {

    // Singleton instance of EntityManagerFactory
    private static EntityManagerFactory entityManagerFactory;

    // Singleton instance of EntityManager
    private static EntityManager entityManager;

    // Private constructor to prevent instantiation
    private EntityManagerUtil() {}

    // Thread-safe method to get EntityManager instance
    public static synchronized EntityManager getEntityManager() {
        if (entityManagerFactory == null) {
            entityManagerFactory = Persistence.createEntityManagerFactory("Entity.AppUser");
        }

        if (entityManager == null || !entityManager.isOpen()) {
            entityManager = entityManagerFactory.createEntityManager();
        }

        return entityManager;
    }

    // Method to close the EntityManager and factory when application shuts down
    public static synchronized void close() {
        if (entityManager != null && entityManager.isOpen()) {
            entityManager.close();
        }
        if (entityManagerFactory != null && entityManagerFactory.isOpen()) {
            entityManagerFactory.close();
        }
    }
}

