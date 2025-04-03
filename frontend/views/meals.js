export function renderMealForm(contentElement, api, state, showDashboard) {
    contentElement.innerHTML = `
      <h2>Ajouter un repas</h2>
      
      <form id="meal-form">
        <div class="form-group">
          <label for="name">Nom du repas</label>
          <input type="text" id="name" required>
        </div>
        
        <div class="form-group">
          <label for="calories">Calories (kcal)</label>
          <input type="number" id="calories" min="0" required>
        </div>
        
        <div class="form-group">
          <label for="proteins">Protéines (g)</label>
          <input type="number" id="proteins" min="0" required>
        </div>
        
        <div class="form-group">
          <label for="carbs">Glucides (g)</label>
          <input type="number" id="carbs" min="0" required>
        </div>
        
        <div class="form-group">
          <label for="fats">Lipides (g)</label>
          <input type="number" id="fats" min="0" required>
        </div>
        
        <button type="submit">Ajouter ce repas</button>
      </form>
    `;
    
    // Regarde les evenements du formulaire
    document.getElementById('meal-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Récupère les valeurs saisies du formulaire
      const mealData = {
        name: document.getElementById('name').value,
        calories: Number(document.getElementById('calories').value),
        proteins: Number(document.getElementById('proteins').value),
        carbs: Number(document.getElementById('carbs').value),
        fats: Number(document.getElementById('fats').value)
      };
      
      // Envoie au serveurle repas
      if (await api.addMeal(mealData)) {
        state.meals = await api.fetchMeals();
        showDashboard();
      }
    });
  }