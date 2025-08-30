       // --- HEADER DOWNLOAD BUTTON HANDLER ---
                $(document).on('click', '#header-download-pdf-btn', function() {
// 1. Find the element to print. This selector targets the main container of the currently active page.
const elementToPrint = document.querySelector('#page-content .container, #page-content .a4-page');

// 2. Check if there is content to print.
if (!elementToPrint) {
    alert("Could not find any content to download.");
    return;
}

// 3. Get the proposal title from the header input for the filename.
const proposalTitle = document.getElementById('header-document-title').value || 'Untitled Proposal';
const filename = proposalTitle + '.pdf';

// 4. Define the options for html2pdf.js for better quality and formatting.
const options = {
    margin: 5, // Margin in mm
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
        scale: 2, // Increases the resolution
        useCORS: true // Important for loading external images
    },
    jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
    }
};

// 5. Run the PDF generation and save the file.
html2pdf().from(elementToPrint).set(options).save();
                });
// ****** [F-033] ****** Draw Canvas Image ***********************************
