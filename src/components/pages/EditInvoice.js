// src/components/pages/EditInvoice.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { updateInvoice, fetchInvoices } from '../../redux/features/invoiceSlice';
import MessageBanner from '../MessageBanner';
import styles from './AddInvoice.module.css';

const EditInvoice = () => {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const invoices = useSelector((state) => state.invoices.invoices);
    const invoice = invoices.find((inv) => inv.id === parseInt(id));

    const [client, setClient] = useState('');
    const [amount, setAmount] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [date, setDate] = useState(dueDate)

    useEffect(() => {
        if (!invoice) {
            dispatch(fetchInvoices());
        } else {
            console.log(invoice);
            setClient(invoice.client);
            setAmount(invoice.amount);
            setDueDate(invoice.due_date.slice(0, 10)); // Assuming due_date is in YYYY-MM-DD format
        }
    }, [dispatch, invoice]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedInvoice = { client, amount, due_date: dueDate };
        try {
            await dispatch(updateInvoice({ id, updatedInvoice })).unwrap();
            setMessage('Invoice updated successfully!');
            setMessageType('success');
            setTimeout(() => {
                history.push('/');
            }, 2000);
        } catch (err) {
            setMessage('Failed to update invoice. Please try again.');
            setMessageType('error');
        }
    };

    const handleCloseBanner = () => {
        setMessage('');
    };

console.log("**",dueDate.slice(0, 10));
const onSetDate = (event) => {
    setDate(dueDate);
}
    return (
        <div>
            <h2>Edit Invoice</h2>
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
                    <input type="date" id="dt" value={dueDate}  onChange={(e) => setDueDate(e.target.value)} required />
                    
                </div>
                <button type="submit" className={styles.submitButton}>Update Invoice</button>
                <button type="button" onClick={() => history.push('/')} className={styles.submitButton}>Cancel</button>
            </form>
        </div>
    );
};

export default EditInvoice;
function formatTime(time, prefix = "") {
    return typeof time == "object" ? prefix + time.toLocaleDateString() : "";
}
