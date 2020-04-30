import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const filterIncome = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const filterOutcome = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const income = filterIncome.reduce((total, next) => total + next.value, 0);

    const outcome = filterOutcome.reduce(
      (total, next) => total + next.value,
      0,
    );

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
