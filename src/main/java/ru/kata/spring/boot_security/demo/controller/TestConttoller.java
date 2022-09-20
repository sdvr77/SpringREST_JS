package ru.kata.spring.boot_security.demo.controller;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/test")
public class TestConttoller {

    //*************************************************************************************************************
    @GetMapping()
    public String startPage() {

        return "testapp";
    }
}
