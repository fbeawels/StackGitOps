const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

const dbPath = path.join(__dirname, 'db.json');

if (!fs.existsSync(dbPath)) {
  const initialData = {
    meals: [],
    goals: null
  };
  fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
}

const readDB = () => {
  try {
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    
    if (!data.meals) data.meals = [];
    if (!data.goals) data.goals = null;
    
    return data;
  } catch (error) {
    console.error("Erreur:", error);
    return { meals: [], goals: null };
  }
};

const writeDB = (data) => {
  if (!data.meals) data.meals = [];
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

app.get('/api/meals', (req, res) => {
  const db = readDB();
  res.json(db.meals || []);
});

app.post('/api/meals', (req, res) => {
  try {
    const meal = req.body;
    meal.id = uuidv4();
    
    const db = readDB();
    if (!Array.isArray(db.meals)) {
      db.meals = [];
    }
    
    db.meals.push(meal);
    writeDB(db);
    
    res.status(201).json(meal);
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un repas:", error);
    res.status(500).json({ error: "Erreur serveur lors de l'ajout du repas" });
  }
});

app.get('/api/goals', (req, res) => {
  const db = readDB();
  res.json(db.goals || {});
});

app.post('/api/goals', (req, res) => {
  try {
    const goals = req.body;
    
    const db = readDB();
    db.goals = goals;
    writeDB(db);
    
    res.status(201).json(goals);
  } catch (error) {
    console.error("Erreur lors de la mise à jour des objectifs:", error);
    res.status(500).json({ error: "Erreur serveur lors de la mise à jour des objectifs" });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});


