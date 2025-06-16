const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let units = [
  { id: 1, name: "Unit 1", status: "Available" },
  { id: 2, name: "Unit 2", status: "Busy" }
];

// Get unit statuses
app.get('/api/units', (req, res) => {
  res.json(units);
});

// Update unit status
app.post('/api/units/:id/status', (req, res) => {
  const unit = units.find(u => u.id === Number(req.params.id));
  if (!unit) return res.status(404).send('Unit not found');
  unit.status = req.body.status;
  res.json(unit);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
