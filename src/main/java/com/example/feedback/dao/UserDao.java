package com.example.feedback.dao;

import com.example.feedback.model.User;
import java.util.List;

public interface UserDao {
    int createUser(User user);
    User getUserById(int id);
    User getUserByEmail(String email);
    List<User> getAllUsers();
    int updateUser(User user);
    int deleteUser(int id);
}
