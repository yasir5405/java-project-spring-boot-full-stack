package com.example.feedback.controller;

import com.example.feedback.model.User;
import com.example.feedback.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody User user) {
        int result = userService.createUser(user);
        return ResponseEntity.ok(result > 0 ? "User created successfully" : "Failed to create user");
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable int id) {
        User user = userService.getUserById(id);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable int id, @RequestBody User user) {
        user.setId(id);
        int result = userService.updateUser(user);
        return ResponseEntity.ok(result > 0 ? "User updated successfully" : "Failed to update user");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        int result = userService.deleteUser(id);
        return ResponseEntity.ok(result > 0 ? "User deleted successfully" : "Failed to delete user");
    }
}
