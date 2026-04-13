package com.banking.mprbanking.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {
    private Integer transactionId;
    private Integer fromAccountId;
    private Integer toAccountId;
    private BigDecimal amount;
    private String transactionType; // DEPOSIT, WITHDRAWAL, TRANSFER
    private String description;
    private LocalDateTime timestamp;
}
