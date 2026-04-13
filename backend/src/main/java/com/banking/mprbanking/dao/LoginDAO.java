package com.banking.mprbanking.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.Optional;

@Repository
public class LoginDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Optional<Map<String, Object>> findByUsername(String username) {
        String sql = "SELECT * FROM logins WHERE username = ?";
        return jdbcTemplate.queryForList(sql, username).stream().findFirst();
    }

    public int save(Integer customerId, String username, String password, String role) {
        return jdbcTemplate.update("INSERT INTO logins (customer_id, username, password, role) VALUES (?, ?, ?, ?)",
                customerId, username, password, role);
    }
}
