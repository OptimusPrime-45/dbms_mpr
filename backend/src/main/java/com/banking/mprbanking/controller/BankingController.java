package com.banking.mprbanking.controller;

import com.banking.mprbanking.dao.*;
import com.banking.mprbanking.model.*;
import com.banking.mprbanking.service.BankingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class BankingController {

    @Autowired private CustomerDAO customerDAO;
    @Autowired private AccountDAO accountDAO;
    @Autowired private TransactionDAO transactionDAO;
    @Autowired private LoanDAO loanDAO;
    @Autowired private BranchDAO branchDAO;
    @Autowired private EmployeeDAO employeeDAO;
    @Autowired private BankingService bankingService;

    // --- Customer Endpoints ---
    @GetMapping("/customers")
    public List<Customer> getAllCustomers() { return customerDAO.findAll(); }

    @PostMapping("/customers")
    public void createCustomer(@RequestBody Customer customer) { customerDAO.save(customer); }

    // --- Account Endpoints ---
    @GetMapping("/accounts")
    public List<Account> getAllAccounts() { return accountDAO.findAll(); }
    
    @GetMapping("/accounts/{id}")
    public Account getAccount(@PathVariable Integer id) { return accountDAO.findById(id); }

    @PostMapping("/accounts")
    public void createAccount(@RequestBody Account account) { accountDAO.save(account); }

    // --- Transaction Endpoints ---
    @PostMapping("/transactions/deposit")
    public void deposit(@RequestBody Map<String, Object> req) {
        bankingService.deposit((Integer) req.get("accountId"), new BigDecimal(req.get("amount").toString()));
    }

    @PostMapping("/transactions/withdraw")
    public void withdraw(@RequestBody Map<String, Object> req) {
        bankingService.withdraw((Integer) req.get("accountId"), new BigDecimal(req.get("amount").toString()));
    }

    @PostMapping("/transactions/transfer")
    public void transfer(@RequestBody Map<String, Object> req) {
        bankingService.transfer((Integer) req.get("fromAccountId"), (Integer) req.get("toAccountId"), new BigDecimal(req.get("amount").toString()));
    }

    @GetMapping("/transactions")
    public List<Transaction> getAllTransactions() { return transactionDAO.findAll(); }

    // --- Loan Endpoints ---
    @GetMapping("/loans")
    public List<Loan> getAllLoans() { return loanDAO.findAll(); }

    @PostMapping("/loans")
    public void applyLoan(@RequestBody Loan loan) { loanDAO.save(loan); }

    // --- Branch & Employee ---
    @GetMapping("/branches")
    public List<Branch> getBranches() { return branchDAO.findAll(); }

    @GetMapping("/employees")
    public List<Employee> getEmployees() { return employeeDAO.findAll(); }
}
