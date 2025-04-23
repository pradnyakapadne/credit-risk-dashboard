const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/customers.json');

router.post('/status', (req, res) => {
  const { customerId, status } = req.body;

  const customers = JSON.parse(fs.readFileSync(dataPath));
  const index = customers.findIndex(c => c.customerId === customerId);

  if (index === -1) return res.status(404).json({ message: 'Customer not found' });

  customers[index].status = status;
  fs.writeFileSync(dataPath, JSON.stringify(customers, null, 2));
  res.json({ message: 'Status updated' });
});

router.post('/alerts', (req, res) => {
  const { customerId } = req.body;
  console.log(`🚨 Alert: High risk customer - ${customerId}`);
  res.json({ message: 'Alert received' });
});

router.get('/customers', (req, res) => {
  const customers = JSON.parse(fs.readFileSync(dataPath));
  res.json(customers);
});

module.exports = router;
