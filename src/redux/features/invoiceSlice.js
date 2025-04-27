// src/redux/features/invoiceSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchInvoices = createAsyncThunk(
    'invoices/fetchInvoices',
    async () => {
        let params = {
          
            headers: {
                'x-auth-token': localStorage.getItem('token') ? localStorage.getItem('token') : null,
                'Content-Type': 'application/json',
            }
        };
        console.log("listSlicetotken",params)
        const response = await axios.get('http://localhost:5000/api/invoices',params);
        return response.data;
    }
);
export const viewInvoice = createAsyncThunk(
    'invoices/viewInvoice',
    async (id) => {
        let params = {
          
            headers: {
                'x-auth-token': localStorage.getItem('token') ? localStorage.getItem('token') : null,
                'Content-Type': 'application/json',
            }
        };
        console.log("listSlicetotken",params)
        const response = await axios.get(`http://localhost:5000/api/invoices/${id}`,params);
        console.log("listSliceresponse",response)
        return response.data;
    }
);
export const addInvoice = createAsyncThunk(
    'invoices/addInvoice',
    async (newInvoice) => {
        const response = await axios.post('http://localhost:5000/api/invoices', newInvoice);
        return response.data;
    }
);

export const updateInvoice = createAsyncThunk(
    'invoices/updateInvoice',
    async ({ id, updatedInvoice }) => {
        const response = await axios.put(`http://localhost:5000/api/invoices/${id}`, updatedInvoice);
        return response.data;
    }
);

export const deleteInvoice = createAsyncThunk(
    'invoices/deleteInvoice',
    async (id) => {
        let params = {
            headers: {
                'x-auth-token': localStorage.getItem('token') ? localStorage.getItem('token') : null,
                'Content-Type': 'application/json',
            }
        };
        await axios.delete(`http://localhost:5000/api/invoices/${id}`,params);
        return id;
    }
);

const invoiceSlice = createSlice({
    name: 'invoices',
    initialState: {
        invoices: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInvoices.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchInvoices.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.invoices = action.payload;
            })
            .addCase(fetchInvoices.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(viewInvoice.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(viewInvoice.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.invoices = action.payload;
            })
            .addCase(viewInvoice.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addInvoice.fulfilled, (state, action) => {
                state.invoices.push(action.payload);
            })
          
            .addCase(updateInvoice.fulfilled, (state, action) => {
                const index = state.invoices.findIndex(invoice => invoice.id === action.payload.id);
                if (index !== -1) {
                    state.invoices[index] = action.payload;
                }
            })
            .addCase(deleteInvoice.fulfilled, (state, action) => {
                state.invoices = state.invoices.filter(invoice => invoice.id !== action.payload);
            });
    }
});

export default invoiceSlice.reducer;
