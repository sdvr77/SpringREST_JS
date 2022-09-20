package ru.kata.spring.boot_security.demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.Role;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class RoleDaoImp implements RoleDao {

    @Autowired
    private EntityManager entityManager;

    @Override
    public Role getRoleByName(String name) {
        return entityManager
                .createQuery("from Role where name = :name", Role.class)
                .setParameter("name", name)
                .getSingleResult();
    }

    @Override
    public void save(Role role) {
        entityManager.merge(role);
    }

    @Override
    public List<Role> getAllRoles() {
        return entityManager.createQuery("from Role", Role.class).getResultList();
    }
}
