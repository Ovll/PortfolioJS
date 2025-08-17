import { fetchGitHubRepos } from './apiService.js';

document.addEventListener('DOMContentLoaded', () => {
    loadGitHubProjectsDynamically();
});

/**
 * Loads and displays featured GitHub projects as cards by fetching from the API
 * and filtering for specific project names.
 */
async function loadGitHubProjectsDynamically() {
    const githubProjectsContainer = document.getElementById('github-projects-container');

    if (!githubProjectsContainer) {
        console.error("Container 'github-projects-container' not found.");
        return;
    }

    githubProjectsContainer.innerHTML = '<div class="spinner"></div>'; // Show loading spinner

    try {
        const allRepos = await fetchGitHubRepos(); // Fetch all repositories

        // Define the names of the projects you want to feature
        const desiredProjectNames = ['HackerRank', 'Seq-quicksort', 'Wix']; // Use exact repo names from GitHub if possible

        // Filter the fetched repositories to find the desired ones
        const featuredProjects = allRepos.filter(repo =>
            desiredProjectNames.includes(repo.name)
        );

        githubProjectsContainer.innerHTML = ''; // Clear spinner

        if (featuredProjects.length === 0) {
            githubProjectsContainer.innerHTML = '<p>No featured projects found or names did not match API response.</p>';
            return;
        }

        featuredProjects.forEach(project => {
            const projectCardLink = document.createElement('a');
            projectCardLink.classList.add('project-card-link');
            projectCardLink.href = project.html_url;
            projectCardLink.target = '_blank'; // Open in new tab

            projectCardLink.innerHTML = `
                <h3>${project.name}</h3>
                <p>${project.description || 'No description available.'}</p>
                <div class="language">Language: ${project.language || 'N/A'}</div>
            `;
            githubProjectsContainer.appendChild(projectCardLink);
        });

    } catch (error) {
        // Display a user-friendly error message
        githubProjectsContainer.innerHTML = `<p class="error-message">Failed to load projects. Please try again later.</p>`;
        console.error("Error displaying projects:", error);
    }
}
