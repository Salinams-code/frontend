// src/components/MessageBanner.js
import React from 'react';
import styles from './MessageBanner.module.css';

const MessageBanner = ({ message, type, onClose }) => {
    if (!message) return null;

    return (
        <div className={`${styles.banner} ${styles[type]}`}>
            <span>{message}</span>
            <button onClick={onClose} className={styles.closeButton}>&times;</button>
        </div>
    );
};

export default MessageBanner;