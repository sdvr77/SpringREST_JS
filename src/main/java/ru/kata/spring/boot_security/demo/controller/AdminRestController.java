package ru.kata.spring.boot_security.demo.controller;

import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;


@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminRestController {
    private final UserService userService;
    public AdminRestController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping("/users")
    public List<User> showAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public User showUser(@PathVariable int id) {
        return userService.getUserById(id);
    }


    @PostMapping("/users")
    public User addUser(@RequestBody User user) {
         userService.save(user);
         return user;
    }

    @PutMapping("/users")
    public User updateUser(@RequestBody User user) {
        System.out.println(user);
        userService.save(user);
        System.out.println(user);
        return user;
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable int id) {
         userService.deleteById(id);
    }
}
