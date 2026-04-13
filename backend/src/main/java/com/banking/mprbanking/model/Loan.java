package com.banking.mprbanking.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Loan {
    private Integer loanId;
    private Integer customerId;
    private BigDecimal amount;
    private String loanType;
    private String status;
}
