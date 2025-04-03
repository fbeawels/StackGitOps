export function renderGoalsForm(contentElement, api, state, showDashboard) {
    // HTML des objectifs
    contentElement.innerHTML = `
      <h2>Définir mes objectifs nutritionnels</h2>
      
      <form id="goals-form">
        <div class="form-group">
          <label for="calories-goal">Objectif de calories quotidien (kcal)</label>
          <input type="number" id="calories-goal" min="0" value="${state.goals?.calories || ''}" required>
        </div>
        
        <div class="form-group">
          <label for="proteins-goal">Objectif de protéines quotidien (g)</label>
          <input type="number" id="proteins-goal" min="0" value="${state.goals?.proteins || ''}" required>
        </div>
        
        <div class="form-group">
          <label for="carbs-goal">Objectif de glucides quotidien (g)</label>
          <input type="number" id="carbs-goal" min="0" value="${state.goals?.carbs || ''}" required>
        </div>
        
        <div class="form-group">
          <label for="fats-goal">Objectif de lipides quotidien (g)</label>
          <input type="number" id="fats-goal" min="0" value="${state.goals?.fats || ''}" required>
        </div>
        
        <button type="submit">Enregistrer mes objectifs</button>
      </form>
    `;
    
    // Regarde les evenements du formulaire
    document.getElementById('goals-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Récupère les valeurs saisies du formulaire
      const goalsData = {
        calories: Number(document.getElementById('calories-goal').value),
        proteins: Number(document.getElementById('proteins-goal').value),
        carbs: Number(document.getElementById('carbs-goal').value),
        fats: Number(document.getElementById('fats-goal').value)
      };
      
      // Envoie les objectifs au serveur
      if (await api.updateGoals(goalsData)) {
        state.goals = await api.fetchGoals();
        showDashboard();
      }
    });
  }