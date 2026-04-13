package com.banking.mprbanking.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Branch {
    private Integer branchId;
    private String name;
    private String location;
}
