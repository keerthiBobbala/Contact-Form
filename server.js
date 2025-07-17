const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));  // serve HTML/CSS/JS
app.use(express.json());            // parse JSON body

// POST route for contact form
app.post('/api/contact', (req, res) => {
  const newContact = req.body;

  // Append to JSON file (or DB)
  const filePath = path.join(__dirname, 'contacts.json');
  let contacts = [];
  if (fs.existsSync(filePath)) {
    contacts = JSON.parse(fs.readFileSync(filePath));
  }
  contacts.push(newContact);
  fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));

  res.json({ message: 'Contact saved successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
