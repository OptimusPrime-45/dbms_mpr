package com.banking.mprbanking.dao;

import com.banking.mprbanking.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TransactionDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final RowMapper<Transaction> transactionRowMapper = (rs, rowNum) -> new Transaction(
            rs.getInt("transaction_id"),
            rs.getObject("from_account_id", Integer.class),
            rs.getObject("to_account_id", Integer.class),
            rs.getBigDecimal("amount"),
            rs.getString("transaction_type"),
            rs.getString("description"),
            rs.getTimestamp("timestamp").toLocalDateTime()
    );

    public List<Transaction> findAll() {
        return jdbcTemplate.query("SELECT * FROM transactions ORDER BY timestamp DESC", transactionRowMapper);
    }

    public List<Transaction> findByAccountId(Integer accountId) {
        return jdbcTemplate.query("SELECT * FROM transactions WHERE from_account_id = ? OR to_account_id = ? ORDER BY timestamp DESC",
                transactionRowMapper, accountId, accountId);
    }

    public int save(Transaction transaction) {
        return jdbcTemplate.update("INSERT INTO transactions (from_account_id, to_account_id, amount, transaction_type, description) VALUES (?, ?, ?, ?, ?)",
                transaction.getFromAccountId(), transaction.getToAccountId(), transaction.getAmount(),
                transaction.getTransactionType(), transaction.getDescription());
    }
}
