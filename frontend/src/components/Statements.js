import React from 'react'
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import generatePDF from 'react-to-pdf';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Statements = () => {
    const { state } = useLocation();
    const targetRef = useRef();
    const bankStatements=state.data;
    const userName=state.name;

    const generatePDFBlob = async () => {
        const pdf = new jsPDF();
        const htmlTable = document.getElementById('table');

        // Generate PDF from HTML table
        pdf.autoTable({ html: htmlTable });

        // Convert PDF to base64
        const pdfBase64 = pdf.output('datauristring');
    
        return pdfBase64.split(',')[1];
    };

    const sendEmail = async(data) => {
        const pdf = await generatePDFBlob();
 
        const dataSend = {
            email: data.email,
            subject: 'Request for bank statement',
            message: 'Here is your requested bank statement file',
            attachments: pdf
          };
      
          const res = await fetch(`http://localhost:8000/email/`, {
            method: "POST",
            body: JSON.stringify(dataSend),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
          const result = await res.json();
          console.log(result);
          if(res.ok){
            alert(result.message);
          } else {
            alert("Error");
            console.log(res);
          }
    };

  return (
    <div className='container mt-4'>
        {bankStatements.length === 0 ? (
              <h3 className='mt-3'>No statements</h3>
            ) : (
              <>
                <button onClick={() => generatePDF(targetRef, {filename: 'page.pdf'})} className="btn btn-info px-5 ">
                    Download pdf
                </button>
                <button onClick={() => sendEmail(bankStatements[0])} type="submit" className="btn btn-info px-5 mx-2">
                    Send via email
                </button>
                <p className='mt-3'>
                  {userName}'s Total Transactions: <strong>{bankStatements.length}</strong>
                </p>
                <table className="table table-hover" ref={targetRef} id="table">
                  <thead>
                    <tr className="table-primary">
                      <th scope="col">Date</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bankStatements.map((ele) => (
                      <tr
                        key={ele._id}
                        style={{
                          cursor: "pointer"
                        }}
                      >
                        <th>{ele.date}</th>
                        <td>{ele.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
        </div>
  )
}

export default Statements;