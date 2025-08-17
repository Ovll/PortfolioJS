// apiService.js
// This file handles all external API calls and data fetching logic.

const GITHUB_API_URL = 'https://api.github.com/users/Ovll/repos';

/**
 * Fetches the public repositories for the specified GitHub user.
 * @returns {Promise<Array>} A promise that resolves to an array of repository objects.
 * @throws {Error} If the network request fails or the API returns an error.
 */
export async function fetchGitHubRepos() {
    try {
        const response = await fetch(GITHUB_API_URL);

        // Check if the request was successful (status code 2xx)
        if (!response.ok) {
            // Handle HTTP errors
            const errorText = await response.text();
            throw new Error(`GitHub API error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch GitHub repositories:", error);
        // Re-throw the error so that the UI layer can handle it.
        throw error;
    }
}
