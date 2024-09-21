const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 6000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Function to get public IP address
const getPublicIp = () => {
    const ifaces = os.networkInterfaces();
    for (const iface in ifaces) {
        for (const alias of ifaces[iface]) {
            // Skip over internal (i.e. 127.0.0.1) and non-IPv4 addresses
            if (alias.family === 'IPv4' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return null;
};

// Sample API endpoint to get public IP
app.get('/api/data', (req, res) => {
    const publicIp = getPublicIp();
    res.json({ message: 'Hello from the Node.js server!', publicIp });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
