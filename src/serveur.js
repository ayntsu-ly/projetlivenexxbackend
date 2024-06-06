const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

const rubriquesRouter = require('./routes/rubriques');
const sousRubriquesRouter = require('./routes/sousRubriques');

//routes des sous-rubriques 
app.use('/api/rubriques/:rubriqueId/sous-rubriques', sousRubriquesRouter);
//routes des rubriques
app.use('/api/rubriques', rubriquesRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
