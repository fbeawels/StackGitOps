export function renderDashboard(contentElement, state) {
    // Calcule les totaux nutritionnels
    const totalCalories = R.sum(R.pluck('calories', state.meals));
    const totalProteins = R.sum(R.pluck('proteins', state.meals));
    const totalCarbs = R.sum(R.pluck('carbs', state.meals));
    const totalFats = R.sum(R.pluck('fats', state.meals));
    
    // HTML du tableau de bord
    contentElement.innerHTML = `
      <h2>Tableau de bord</h2>
      
      <div class="stats">
        <div class="stat">
          <h3>Calories</h3>
          <p>${totalCalories} / ${state.goals?.calories || '?'} kcal</p>
          <div class="progress-bar">
            <div class="progress" style="width: ${state.goals?.calories ? Math.min(100, (totalCalories / state.goals.calories) * 100) : 0}%"></div>
          </div>
        </div>
        <div class="stat">
          <h3>Protéines</h3>
          <p>${totalProteins} / ${state.goals?.proteins || '?'} g</p>
          <div class="progress-bar">
            <div class="progress" style="width: ${state.goals?.proteins ? Math.min(100, (totalProteins / state.goals.proteins) * 100) : 0}%"></div>
          </div>
        </div>
        <div class="stat">
          <h3>Glucides</h3>
          <p>${totalCarbs} / ${state.goals?.carbs || '?'} g</p>
          <div class="progress-bar">
            <div class="progress" style="width: ${state.goals?.carbs ? Math.min(100, (totalCarbs / state.goals.carbs) * 100) : 0}%"></div>
          </div>
        </div>
        <div class="stat">
          <h3>Lipides</h3>
          <p>${totalFats} / ${state.goals?.fats || '?'} g</p>
          <div class="progress-bar">
            <div class="progress" style="width: ${state.goals?.fats ? Math.min(100, (totalFats / state.goals.fats) * 100) : 0}%"></div>
          </div>
        </div>
      </div>
      
      <h3>Mes repas d'aujourd'hui</h3>
      <ul class="meal-list">
        ${state.meals.length > 0 
          ? state.meals.map(meal => `
              <li class="meal-item">
                <strong>${meal.name}</strong> - ${meal.calories} kcal, 
                ${meal.proteins}g protéines, ${meal.carbs}g glucides, ${meal.fats}g lipides
              </li>
            `).join('')
          : '<li>Aucun repas ajouté aujourd\'hui</li>'
        }
      </ul>
    `;
  }