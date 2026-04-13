package com.banking.mprbanking.service;

import com.banking.mprbanking.dao.LoginDAO;
import com.banking.mprbanking.dto.LoginRequest;
import com.banking.mprbanking.dto.LoginResponse;
import com.banking.mprbanking.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private LoginDAO loginDAO;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    public LoginResponse authenticate(LoginRequest loginRequest) {
        Optional<Map<String, Object>> login = loginDAO.findByUsername(loginRequest.getUsername());

        if (login.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), (String) login.get().get("password"))) {
            String token = jwtUtils.generateToken(loginRequest.getUsername());
            return new LoginResponse(
                    token,
                    (String) login.get().get("username"),
                    (String) login.get().get("role"),
                    (Integer) login.get().get("customer_id")
            );
        }
        throw new RuntimeException("Invalid credentials");
    }
}
