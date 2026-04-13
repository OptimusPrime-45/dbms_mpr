package com.banking.mprbanking.dao;

import com.banking.mprbanking.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class EmployeeDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final RowMapper<Employee> employeeRowMapper = (rs, rowNum) -> new Employee(
            rs.getInt("emp_id"),
            rs.getInt("branch_id"),
            rs.getString("name"),
            rs.getBigDecimal("salary")
    );

    public List<Employee> findAll() {
        return jdbcTemplate.query("SELECT * FROM employees", employeeRowMapper);
    }
}
