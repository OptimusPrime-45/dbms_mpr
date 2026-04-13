package com.banking.mprbanking.dao;

import com.banking.mprbanking.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CustomerDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final RowMapper<Customer> customerRowMapper = (rs, rowNum) -> new Customer(
            rs.getInt("customer_id"),
            rs.getString("name"),
            rs.getString("phone"),
            rs.getString("address")
    );

    public List<Customer> findAll() {
        return jdbcTemplate.query("SELECT * FROM customers", customerRowMapper);
    }

    public Customer findById(Integer id) {
        return jdbcTemplate.queryForObject("SELECT * FROM customers WHERE customer_id = ?", customerRowMapper, id);
    }

    public int save(Customer customer) {
        return jdbcTemplate.update("INSERT INTO customers (name, phone, address) VALUES (?, ?, ?)",
                customer.getName(), customer.getPhone(), customer.getAddress());
    }

    public int update(Customer customer) {
        return jdbcTemplate.update("UPDATE customers SET name = ?, phone = ?, address = ? WHERE customer_id = ?",
                customer.getName(), customer.getPhone(), customer.getAddress(), customer.getCustomerId());
    }

    public int delete(Integer id) {
        return jdbcTemplate.update("DELETE FROM customers WHERE customer_id = ?", id);
    }
}
