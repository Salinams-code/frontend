// src/components/pages/InvoiceList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchInvoices, deleteInvoice } from '../../redux/features/invoiceSlice';
import styles from './InvoiceList.module.css';
import { generateInvoicePDF } from '../../utils/pdfUtils';

const InvoiceList = (props) => {
    console.log("invoiceprops",props)
    const dispatch = useDispatch();
    const invoices = useSelector((state) => state.invoices.invoices);
    const invoiceStatus = useSelector((state) => state.invoices.status);
    const error = useSelector((state) => state.invoices.error);

    useEffect(() => {
        if (invoiceStatus === 'idle') {
            dispatch(fetchInvoices());
        }
    }, [invoiceStatus, dispatch]);
    const handleDownloadPDF = () => {
        console.log("PDF=>",invoices)
        generateInvoicePDF(invoices);
      };
    const handleDelete = (id) => {
        dispatch(deleteInvoice(id));
    };

    let content;

    if (invoiceStatus === 'loading') {
        content = <p>Loading...</p>;
    } else if (invoiceStatus === 'succeeded') {
        content = (
            <table className={styles.invoiceTable}>
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                            <td>{invoice.client}</td>
                            <td>${invoice.amount}</td>
                            <td>{invoice.due_date}</td>
                            <td>
                                <Link to={`/edit/${invoice.id}`} className={styles.actionButton}>Edit</Link>
                                <Link to={`/invoices/${invoice.id}`} className={styles.actionButton}>View Details</Link>
                                <button onClick={() => handleDelete(invoice.id)} className={styles.actionButton}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    } else if (invoiceStatus === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <div>
            <h2>Invoices</h2>
            <Link to="/add" className={styles.addButton}>Add Invoice</Link>
            <button onClick={handleDownloadPDF} className={styles.addButton}>
        Download PDF
      </button>
            {content}
        </div>
    );
};

export default InvoiceList;
