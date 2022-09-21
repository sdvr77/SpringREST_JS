package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;

@Controller
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping()
    public String adminPage(@ModelAttribute("user") User user, Model model, Principal principal) {
        model.addAttribute("enterUser", userService.getUserByUsername(principal.getName()));
        if (userService.getUserByUsername(principal.getName()).getRoles().contains(roleService.getRoleByName("ROLE_USER"))) {
            model.addAttribute("userRole", "userRole");
        } else model.addAttribute("userRole", null);
        return "AdminPageJS";
    }
}
