package com.banking.mprbanking.dao;

import com.banking.mprbanking.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class AccountDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final RowMapper<Account> accountRowMapper = (rs, rowNum) -> {
        Account account = new Account();
        account.setAccountId(rs.getInt("account_id"));
        account.setCustomerId(rs.getInt("customer_id"));
        account.setBranchId(rs.getInt("branch_id"));
        account.setAccountType(rs.getString("account_type"));
        account.setBalance(rs.getBigDecimal("balance"));
        account.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        if (account.getAccountType().equals("SAVINGS")) {
            account.setInterestRate(rs.getDouble("interest_rate"));
        } else {
            account.setMinBalance(rs.getBigDecimal("min_balance"));
        }
        return account;
    };

    public List<Account> findAll() {
        String sql = "SELECT a.*, s.interest_rate, c.min_balance FROM accounts a " +
                     "LEFT JOIN savings_accounts s ON a.account_id = s.account_id " +
                     "LEFT JOIN current_accounts c ON a.account_id = c.account_id";
        return jdbcTemplate.query(sql, accountRowMapper);
    }

    public Account findById(Integer id) {
        String sql = "SELECT a.*, s.interest_rate, c.min_balance FROM accounts a " +
                     "LEFT JOIN savings_accounts s ON a.account_id = s.account_id " +
                     "LEFT JOIN current_accounts c ON a.account_id = c.account_id " +
                     "WHERE a.account_id = ?";
        return jdbcTemplate.queryForObject(sql, accountRowMapper, id);
    }
    
    public List<Account> findByCustomerId(Integer customerId) {
        String sql = "SELECT a.*, s.interest_rate, c.min_balance FROM accounts a " +
                     "LEFT JOIN savings_accounts s ON a.account_id = s.account_id " +
                     "LEFT JOIN current_accounts c ON a.account_id = c.account_id " +
                     "WHERE a.customer_id = ?";
        return jdbcTemplate.query(sql, accountRowMapper, customerId);
    }

    @Transactional
    public void save(Account account) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(
                "INSERT INTO accounts (customer_id, branch_id, account_type, balance) VALUES (?, ?, ?, ?)",
                Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, account.getCustomerId());
            ps.setInt(2, account.getBranchId());
            ps.setString(3, account.getAccountType());
            ps.setBigDecimal(4, account.getBalance());
            return ps;
        }, keyHolder);

        int accountId = keyHolder.getKey().intValue();

        if ("SAVINGS".equals(account.getAccountType())) {
            jdbcTemplate.update("INSERT INTO savings_accounts (account_id, interest_rate) VALUES (?, ?)",
                    accountId, account.getInterestRate());
        } else {
            jdbcTemplate.update("INSERT INTO current_accounts (account_id, min_balance) VALUES (?, ?)",
                    accountId, account.getMinBalance());
        }
    }

    public int updateBalance(Integer accountId, java.math.BigDecimal newBalance) {
        return jdbcTemplate.update("UPDATE accounts SET balance = ? WHERE account_id = ?", newBalance, accountId);
    }

    public int delete(Integer id) {
        return jdbcTemplate.update("DELETE FROM accounts WHERE account_id = ?", id);
    }
}
