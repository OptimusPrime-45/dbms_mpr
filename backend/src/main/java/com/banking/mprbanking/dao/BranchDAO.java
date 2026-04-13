package com.banking.mprbanking.dao;

import com.banking.mprbanking.model.Branch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BranchDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final RowMapper<Branch> branchRowMapper = (rs, rowNum) -> new Branch(
            rs.getInt("branch_id"),
            rs.getString("name"),
            rs.getString("location")
    );

    public List<Branch> findAll() {
        return jdbcTemplate.query("SELECT * FROM branches", branchRowMapper);
    }
}
