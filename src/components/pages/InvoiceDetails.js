import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useParams,useHistory } from 'react-router-dom';
import { viewInvoice } from '../../redux/features/invoiceSlice';

import styles from './InvoiceDetails.module.css';

const InvoiceDetails = () => {
  const invoiceStatus = useSelector((state) => state.invoices.status);
  const error = useSelector((state) => state.invoices.error);
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices.invoices);
  const invoice = invoices.find((inv) => inv.id === parseInt(id));

  useEffect(() => {
    console.log("*******",invoiceStatus);
    if (invoiceStatus === 'idle') {
    dispatch(viewInvoice());
    }
  }, [id]);

  const handlePrint = () => {
    window.print();
  };
console.log("editinvoice",invoice);

  return (
    <div className={styles.invoiceDetails}>
      {invoice && (
        <>
          <h1>Invoice Details</h1>
          <p><strong>ID:</strong> {invoice.id}</p>
          <p><strong>Description:</strong> {invoice.description}</p>
          <p><strong>Amount:</strong> {invoice.amount}</p>
          <p><strong>Due Date:</strong> {invoice.due_date}</p>
          <button onClick={handlePrint}>Print</button>
        </>
      )}
    </div>
  );
};

export default InvoiceDetails;
