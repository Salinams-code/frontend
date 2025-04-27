// src/components/pages/AddInvoice.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addInvoice } from '../../redux/features/invoiceSlice';
import MessageBanner from '../MessageBanner';
import styles from './AddInvoice.module.css';

const AddInvoice = () => {
    const [client, setClient] = useState('');
    const [amount, setAmount] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newInvoice = { client, amount, due_date: dueDate };
        try {
            await dispatch(addInvoice(newInvoice)).unwrap();
            setMessage('Invoice added successfully!');
            setMessageType('success');
            setClient('');
            setAmount('');
            setDueDate('');
        } catch (err) {
            setMessage('Failed to add invoice. Please try again.');
            setMessageType('error');
        }
    };

    const handleCloseBanner = () => {
        setMessage('');
    };

    return (
        <div>
            <h2>Add Invoice</h2>
            <MessageBanner message={message} type={messageType} onClose={handleCloseBanner} />
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <div className={styles.formGroup}>
                    <label>Client:</label>
                    <input type="text" value={client} onChange={(e) => setClient(e.target.value)} required />
                </div>
                <div className={styles.formGroup}>
                    <label>Amount:</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </div>
                <div className={styles.formGroup}>
                    <label>Due Date:</label>
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
                </div>
                <button type="submit" className={styles.submitButton}>Add Invoice</button>
                <button type="button" onClick={() => history.push('/')} className={styles.submitButton}>Cancel</button>
            </form>
        </div>
    );
};

export default AddInvoice;