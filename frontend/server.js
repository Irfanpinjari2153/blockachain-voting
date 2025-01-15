const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS middleware

const app = express();
const PORT = 5000;

// Allow CORS for specific origin
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your frontend
}));

// Middleware for parsing JSON
app.use(bodyParser.json());

// Mock database for Aadhaar/PAN validation
const validDocuments = {
    "1234-5678-9012": "0xB24b58540efF614e06B26A331BEC5ffbdD1C072a", // Aadhaar/PAN: Ethereum Address
    "9876-5432-1098": "0xc96729536e1dc2AA08FD045652092b770F2adDC8",
    "9855-7604-3058": "0x8671f030D261d08CCBFfB4CE3afD797A59f9f967",  // Aadhaar/PAN: Ethereum Address
    "7783-6544-4462": "0x90805C3Cec8025c29307bCF6fFd56F6Fd0Fe6f2d",
    "6118-1373-7417": "0x24D8C25B0f5184A9Be2962E96305e271Fe2A13b9"
};

// API to verify document
app.post('/verify-document', (req, res) => {
    const { docNumber } = req.body;

    if (!docNumber) {
        return res.status(400).json({ success: false, message: "Document number is required." });
    }

    const address = validDocuments[docNumber];
    if (address) {
        return res.json({ success: true, address });
    } else {
        return res.status(404).json({ success: false, message: "Document not found." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
