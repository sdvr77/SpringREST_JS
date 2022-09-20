package ru.kata.spring.boot_security.demo.dao;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserDao {
    List<User> getAllUsers();
    void save(User user);
    void deleteById(int id);
    User getUserById(int id);
    User getUserByUsername(String username);
}
