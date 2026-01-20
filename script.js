// Το username σου στο GitHub
const username = 'Gh0sttakhs';
// Το σημείο στο HTML που θα μπούνε τα projects
const repoContainer = document.getElementById('repo-container');

// Κύρια συνάρτηση που τραβάει τα δεδομένα
async function getRepos() {
    try {
        // Ζητάμε από το GitHub API τα repos του χρήστη
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`);
        const data = await response.json();

        // Καθαρίζουμε το εικονίδιο φόρτωσης (spinner)
        repoContainer.innerHTML = '';

        // Φιλτράρουμε τα repos: Κρατάμε μόνο αυτά που ΔΕΝ είναι forks (δηλαδή τα δικά σου έργα)
        const myRepos = data.filter(repo => !repo.fork);

        // Αν δεν βρεθούν projects
        if (myRepos.length === 0) {
             repoContainer.innerHTML = '<p>No public repositories found.</p>';
             return;
        }

        // Για κάθε repository που βρέθηκε, φτιάχνουμε μια "κάρτα" HTML
        myRepos.forEach(repo => {
            // Αν δεν υπάρχει περιγραφή, βάλε ένα κενό κείμενο
            const description = repo.description ? repo.description : 'No description provided.';
            // Αν δεν υπάρχει κύρια γλώσσα, βάλε 'N/A'
            const language = repo.language ? repo.language : 'Code';

            // Δημιουργία του HTML για την κάρτα
            const repoCard = `
                <div class="repo-card">
                    <h4>
                        <i class="fas fa-book-bookmark accent"></i>
                        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    </h4>
                    <p class="repo-description">${description}</p>
                    <div class="repo-stats">
                        <span class="repo-language">
                            <i class="fas fa-code"></i> ${language}
                        </span>
                        <span class="repo-stars">
                            <i class="fas fa-star accent"></i> ${repo.stargazers_count}
                        </span>
                    </div>
                </div>
            `;

            // Προσθήκη της κάρτας στο container
            repoContainer.innerHTML += repoCard;
        });

    } catch (error) {
        // Αν κάτι πάει στραβά (π.χ. πέσει το API)
        console.error('Error fetching repos:', error);
        repoContainer.innerHTML = '<p class="accent">Error loading repositories. Please try again later.</p>';
    }
}

// Καλλούμε τη συνάρτηση όταν φορτώσει η σελίδα
getRepos();
