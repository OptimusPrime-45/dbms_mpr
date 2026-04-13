package com.banking.mprbanking.dao;

import com.banking.mprbanking.model.Loan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LoanDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final RowMapper<Loan> loanRowMapper = (rs, rowNum) -> new Loan(
            rs.getInt("loan_id"),
            rs.getInt("customer_id"),
            rs.getBigDecimal("amount"),
            rs.getString("loan_type"),
            rs.getString("status")
    );

    public List<Loan> findAll() {
        return jdbcTemplate.query("SELECT * FROM loans", loanRowMapper);
    }
    
    public List<Loan> findByCustomerId(Integer customerId) {
        return jdbcTemplate.query("SELECT * FROM loans WHERE customer_id = ?", loanRowMapper, customerId);
    }

    public int save(Loan loan) {
        return jdbcTemplate.update("INSERT INTO loans (customer_id, amount, loan_type, status) VALUES (?, ?, ?, ?)",
                loan.getCustomerId(), loan.getAmount(), loan.getLoanType(), "PENDING");
    }

    public int updateStatus(Integer loanId, String status) {
        return jdbcTemplate.update("UPDATE loans SET status = ? WHERE loan_id = ?", status, loanId);
    }
}
