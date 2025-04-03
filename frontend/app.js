// Import des fichiers js du dossier views
import { renderDashboard } from './views/dashboard.js';
import { renderMealForm } from './views/meals.js';
import { renderGoalsForm } from './views/goal.js';
import { renderGraphsView } from './views/graphs.js';

const state = {
  currentView: 'dashboard',
  meals: [],
  goals: null
};
 // Récupère les éléments HTML
const contentElement = document.getElementById('content');
const navDashboard = document.getElementById('nav-dashboard');
const navMeals = document.getElementById('nav-meals');
const navGoals = document.getElementById('nav-goals');
const navGraphs = document.getElementById('nav-graphs');

const api = {
  // Récupère le repas du serveur
  async fetchMeals() {
    const response = await fetch('/api/meals');
    return response.ok ? await response.json() : [];
  },
  
  // Envoie le repas au serveur
  async addMeal(meal) {
    const response = await fetch('/api/meals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meal)
    });
    return response.ok;
  },
  
  // Récupère les objectifs depuis le serveur
  async fetchGoals() {
    const response = await fetch('/api/goals');
    return response.ok ? await response.json() : {};
  },
  
  // Envoie les objectifs au serveur
  async updateGoals(goals) {
    const response = await fetch('/api/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(goals)
    });
    return response.ok;
  }
};

async function loadData() {
  state.meals = await api.fetchMeals();
  state.goals = await api.fetchGoals(); 
  renderCurrentView();
}

// Affiche les pages choisies

function showDashboard() {
  state.currentView = 'dashboard';
  renderCurrentView();
}

function showMealForm() {
  state.currentView = 'mealForm';
  renderCurrentView();
}

function showGoalsForm() {
  state.currentView = 'goalsForm';
  renderCurrentView();
}

function showGraphsView() {
  state.currentView = 'graphs';
  renderCurrentView();
}

function renderCurrentView() {
  contentElement.innerHTML = '';
  
  // Affiche la bonne page selon mon choix
  switch (state.currentView) {
    case 'mealForm': 
      renderMealForm(contentElement, api, state, showDashboard); 
      break;
    case 'goalsForm': 
      renderGoalsForm(contentElement, api, state, showDashboard); 
      break;
    case 'graphs': 
      renderGraphsView(contentElement, state); 
      break;
    default: 
      renderDashboard(contentElement, state);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  navDashboard.addEventListener('click', showDashboard);
  navMeals.addEventListener('click', showMealForm);
  navGoals.addEventListener('click', showGoalsForm);
  navGraphs.addEventListener('click', showGraphsView);
  
  loadData();
});