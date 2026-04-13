package com.banking.mprbanking.controller;

import com.banking.mprbanking.dto.LoginRequest;
import com.banking.mprbanking.dto.LoginResponse;
import com.banking.mprbanking.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.authenticate(loginRequest));
    }
}
