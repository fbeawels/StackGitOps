export function renderGraphsView(contentElement, state) {
    // HTML du graphique
    contentElement.innerHTML = `
      <h2>Visualisation des nutriments</h2>
      <div class="graph-card">
        <canvas id="macros-chart"></canvas>
      </div>
    `;
    
    // Calcule pour le graphique
    const totalProteins = R.sum(R.pluck('proteins', state.meals));
    const totalCarbs = R.sum(R.pluck('carbs', state.meals));
    const totalFats = R.sum(R.pluck('fats', state.meals));
    
    const macrosCtx = document.getElementById('macros-chart').getContext('2d');
    new Chart(macrosCtx, {
      type: 'pie',
      data: {
        labels: ['Protéines', 'Glucides', 'Lipides'],
        datasets: [{
          data: [totalProteins, totalCarbs, totalFats],
          backgroundColor: [
            'rgba(93, 54, 235, 0.7)',
            'rgba(86, 137, 255, 0.7)',
            'rgba(122, 99, 255, 0.7)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }