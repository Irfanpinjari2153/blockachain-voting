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
    "1234-5678-9012": "0x30ee6b900938245AC8F61bbA485DE7c7E125A3ca", // Aadhaar/PAN: Ethereum Address
    "9876-5432-1098": "0xB87fC9dae8Eec512008083C4ecCdA690D46ed05c",
    "9855-7604-3058": "0x327B4a8A4BC985083134429C94e78Dfe5CA17bEe",  // Aadhaar/PAN: Ethereum Address
    "7783-6544-4462": "0x6bE153346f03564873fC02f64aa73E21e3994c01",
    "6118-1373-7417": "0x2eB1C487F99832E21A0554E2b8bc1120B6B7F934"
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
