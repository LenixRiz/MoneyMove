import { ref, get, set, update, remove } from 'firebase/database';
import { db } from '../db/firebaseConfig';

export const fetchTransactions = async () => {
    const transactionsRef = ref(db, 'transactions');
    const snapshot = await get(transactionsRef);
    if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
    }
    return [];
};

export const addTransaction = async (transaction) => {
    const transactionRef = ref(db, `transactions/${transaction.id}`);
    await set(transactionRef, transaction);
};

export const editTransaction = async (id, updatedTransaction) => {
    const transactionRef = ref(db, `transactions/${id}`);
    await update(transactionRef, updatedTransaction);
};

export const deleteTransaction = async (id) => {
    const transactionRef = ref(db, `transactions/${id}`);
    await remove(transactionRef);
};

export const fetchMoney = async () => {
    const moneyRef = ref(db, 'money');
    const snapshot = await get(moneyRef);
    return snapshot.exists() ? snapshot.val() : 0;
};

export const updateMoney = async (newMoney) => {
    const moneyRef = ref(db, 'money');
    await set(moneyRef, newMoney);
};
