package com.banking.mprbanking.service;

import com.banking.mprbanking.dao.*;
import com.banking.mprbanking.model.Account;
import com.banking.mprbanking.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class BankingService {

    @Autowired
    private AccountDAO accountDAO;

    @Autowired
    private TransactionDAO transactionDAO;

    @Autowired
    private CustomerDAO customerDAO;

    @Autowired
    private LoanDAO loanDAO;

    @Transactional
    public void deposit(Integer accountId, BigDecimal amount) {
        Account account = accountDAO.findById(accountId);
        BigDecimal newBalance = account.getBalance().add(amount);
        accountDAO.updateBalance(accountId, newBalance);

        Transaction transaction = new Transaction();
        transaction.setToAccountId(accountId);
        transaction.setAmount(amount);
        transaction.setTransactionType("DEPOSIT");
        transaction.setDescription("Deposit to account " + accountId);
        transactionDAO.save(transaction);
    }

    @Transactional
    public void withdraw(Integer accountId, BigDecimal amount) {
        Account account = accountDAO.findById(accountId);
        
        if ("CURRENT".equals(account.getAccountType()) && account.getBalance().subtract(amount).compareTo(account.getMinBalance()) < 0) {
            throw new RuntimeException("Insufficient funds. Minimum balance would be breached.");
        } else if (account.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("Insufficient funds.");
        }

        BigDecimal newBalance = account.getBalance().subtract(amount);
        accountDAO.updateBalance(accountId, newBalance);

        Transaction transaction = new Transaction();
        transaction.setFromAccountId(accountId);
        transaction.setAmount(amount);
        transaction.setTransactionType("WITHDRAWAL");
        transaction.setDescription("Withdrawal from account " + accountId);
        transactionDAO.save(transaction);
    }

    @Transactional
    public void transfer(Integer fromAccountId, Integer toAccountId, BigDecimal amount) {
        withdraw(fromAccountId, amount);
        deposit(toAccountId, amount);
        
        // Log as simple transfer
        Transaction transaction = new Transaction();
        transaction.setFromAccountId(fromAccountId);
        transaction.setToAccountId(toAccountId);
        transaction.setAmount(amount);
        transaction.setTransactionType("TRANSFER");
        transaction.setDescription("Transfer from " + fromAccountId + " to " + toAccountId);
        transactionDAO.save(transaction);
    }
}
