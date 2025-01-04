import axios from "axios";

const CreditCard = () => {
    const generatePdf = async () => {
        const response = await axios.get( "http://127.0.0.1:8000/financial_report/general_ledger/pdf/", {
            responseType: "blob",
            // headers: {
            //     Authorization: `Bearer ${localStorage.getItem( "token" )}`,
            // },
        } );
        const blob = new Blob( [ response.data ], { type: "application/pdf" } );
        const url = window.URL.createObjectURL( blob );
        const link = document.createElement( "a" );
        link.href = url;
        link.setAttribute( "download", "credit-card.pdf" );
        document.body.appendChild( link );
        link.download = "credit-card3.pdf";
        link.click();
        link.parentNode?.removeChild( link );
    };
    return (
        <div>
            <h1>Generate PDF Report</h1>
            <button onClick={ generatePdf }>Download PDF</button>
        </div>
    );
};
export default CreditCard;