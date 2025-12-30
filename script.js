document.addEventListener('DOMContentLoaded', () => {
    fetchRepos();
});

const featuredRepos = [
    'seismic-iot-alert-system',
    'banking-infra-compliance',
    'construction-cost-estimator'
];

async function fetchRepos() {
    const container = document.getElementById('repo-container');
    const username = 'jorgeahmed';

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await response.json();

        // Filter only the strategic repositories
        const strategicRepos = repos.filter(repo => featuredRepos.includes(repo.name));

        container.innerHTML = ''; // Clear loading state

        if (strategicRepos.length === 0) {
            container.innerHTML = '<p>Repositories not found. Please check GitHub profile.</p>';
            return;
        }

        strategicRepos.forEach(repo => {
            const card = document.createElement('a');
            card.href = repo.html_url;
            card.target = "_blank";
            card.className = 'repo-card';

            // Map repo name to business context (hardcoded for cleaner display)
            let businessContext = "";
            if (repo.name.includes('seismic')) businessContext = "SeismicAI / BBVA Integration";
            if (repo.name.includes('banking')) businessContext = "Santander / Banxico Audit";
            if (repo.name.includes('construction')) businessContext = "Sinai / Pretencreto ROI";

            card.innerHTML = `
                <div class="repo-header">
                    <span class="repo-name">${formatRepoName(repo.name)}</span>
                    <i class="fas fa-external-link-alt" style="color: var(--text-secondary)"></i>
                </div>
                <div style="font-size: 0.8rem; color: var(--accent); margin-bottom: 0.5rem; font-weight: 600;">
                    ${businessContext}
                </div>
                <p class="repo-desc">${repo.description || "No description available."}</p>
                <div class="repo-stats">
                    <div class="stat">
                        <span class="lang-circle"></span>
                        ${repo.language || 'Code'}
                    </div>
                    <div class="stat">
                        <i class="far fa-star"></i> ${repo.stargazers_count}
                    </div>
                    <div class="stat">
                        <i class="fas fa-code-branch"></i> ${repo.forks_count}
                    </div>
                </div>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error('Error fetching repos:', error);
        container.innerHTML = '<p>Failed to load projects. View on GitHub.</p>';
    }
}

function formatRepoName(name) {
    return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
