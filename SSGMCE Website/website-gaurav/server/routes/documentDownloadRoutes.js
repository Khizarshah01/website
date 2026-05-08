const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Serve document by filename (supports nested paths like institution/administration/file.pdf)
router.get('/download/*', (req, res) => {
  try {
    // Get the filename from params (params[0] contains the * match)
    const filename = req.params[0];
    
    if (!filename) {
      return res.status(400).json({ error: 'Filename is required' });
    }
    
    // Sanitize to prevent directory traversal attacks
    const safePath = path.normalize(filename).replace(/^(\.\.(\/|\\))+/, '');
    const filePath = path.join(__dirname, '../uploads/documents', safePath);

    // Verify file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Set proper headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${path.basename(filePath)}"`);
    
    // Send file
    res.sendFile(filePath);
  } catch (error) {
    console.error('Document download error:', error);
    res.status(500).json({ error: 'Failed to download document' });
  }
});

// List documents in a category
router.get('/list/*', (req, res) => {
  try {
    const category = req.params[0] || '';
    const dirPath = path.join(__dirname, '../uploads/documents', category);

    if (!fs.existsSync(dirPath)) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.pdf'));
    res.json({ files, category });
  } catch (error) {
    console.error('List documents error:', error);
    res.status(500).json({ error: 'Failed to list documents' });
  }
});

module.exports = router;
