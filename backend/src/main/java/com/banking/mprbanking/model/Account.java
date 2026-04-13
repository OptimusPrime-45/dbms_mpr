package com.banking.mprbanking.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Account {
    private Integer accountId;
    private Integer customerId;
    private Integer branchId;
    private String accountType; // SAVINGS, CURRENT
    private BigDecimal balance;
    private LocalDateTime createdAt;
    
    // For joined queries
    private Double interestRate;
    private BigDecimal minBalance;
}
