const express = require('express');
const axios = require('axios');
const path = require('path');
const { Octokit } = require('@octokit/rest');
const session = require('express-session');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build'))); // Serve static files from React frontend

// Configure express-session middleware
app.use(
  session({
    secret: 'your-secret-key', // Replace with a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set `true` if using HTTPS
  })
);

const clientID = 'Ov23liT7U9majuZ1XYCf'; // Your GitHub Client ID
const clientSecret = 'b4e5d02bf106f2aeaa1920c3dbda5e040d2ac003'; // Your GitHub Client Secret

// Check authentication status
app.get('/check-auth', (req, res) => {
  res.json({ isAuthenticated: !!req.session.accessToken });
});

// Redirect the user to GitHub OAuth URL
app.get('/auth/github', (req, res) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientID}`;
  res.redirect(githubAuthUrl);
});

// Handle GitHub OAuth Callback and Exchange Code for Access Token
app.get('/auth/github/callback', async (req, res) => {
  const requestToken = req.query.code;

  try {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: clientID,
        client_secret: clientSecret,
        code: requestToken,
      },
      { headers: { accept: 'application/json' } }
    );

    const accessToken = response.data.access_token;

    // Store the access token in the session
    req.session.accessToken = accessToken;

    // Redirect to the homepage after storing the token
    res.redirect('http://localhost:3001/create-repo'); // Redirect to create repo page
  } catch (error) {
    console.error('Error during token exchange:', error);
    res.status(500).send('Failed to exchange code for token.');
  }
});

// Create a repository and commit a file using the access token
app.post('/create-repo', async (req, res) => {
  const { repoName, fileName, fileContent } = req.body;
  const accessToken = req.session.accessToken; // Retrieve token from session

  if (!accessToken) {
    return res.status(401).send('Access token not found. Please log in again.');
  }

  if (!repoName || !fileName || !fileContent) {
    return res.status(400).send('Missing repository name, file name, or file content.');
  }

  try {
    const octokit = new Octokit({ auth: accessToken });

    // Create a new repository
    const createRepoResponse = await octokit.repos.createForAuthenticatedUser({
      name: repoName,
      description: 'Repository created via OAuth app',
      private: false,
    });

    const repoUrl = createRepoResponse.data.html_url;

    // Commit a file to the new repository
    await octokit.repos.createOrUpdateFileContents({
      owner: createRepoResponse.data.owner.login,
      repo: repoName,
      path: fileName,
      message: 'Initial commit via API',
      content: Buffer.from(fileContent).toString('base64'),
    });

    res.json({ repoUrl });
  } catch (error) {
    console.error('Error creating repo or committing file:', error);
    res.status(500).send('Failed to create repo or commit file.');
  }
});


// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
