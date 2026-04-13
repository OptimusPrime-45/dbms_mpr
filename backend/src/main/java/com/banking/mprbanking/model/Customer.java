package com.banking.mprbanking.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer {
    private Integer customerId;
    private String name;
    private String phone;
    private String address;
}
