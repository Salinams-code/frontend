import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateInvoicePDF = (invoices) => {
  const doc = new jsPDF();
  console.log("generatPDF=>",invoices)
  // Set the title
  doc.text('Invoice List', 14, 20);

  // Define the columns for the table
  const columns = [
    { title: 'ID', dataKey: 'id' },
    { title: 'Client', dataKey: 'client' },
    { title: 'Amount', dataKey: 'amount' },
    { title: 'Due Date', dataKey: 'due_date' },
  ];
  //var columns = ["Name", "Cellphone", "Work Phone"];
  var rows = [];
  for (var i = 0; i < invoices.length; i++) {
      rows.push([ invoices[i].id, invoices[i].client, invoices[i].amount,invoices[i].due_date]);
  }

  //var doc = new jsPDF('p', 'pt');
  doc.autoTable(columns, rows);
  doc.save('jspdf-test312.pdf');
  // Define the rows for the table
//   const rows = invoices.map((invoice) => ({
//     id: invoice.id,
//     client: invoice.client,
//     amount: invoice.amount,
//     due_date: invoice.due_date,
//   }));
// console.log("rows",rows)
//   // Add the table to the document
//   doc.autoTable({
//     head: [columns],
//     body: rows,
//     startY: 30,
//   });

  // Save the PDF
  //doc.save('invoice-list.pdf');
};
