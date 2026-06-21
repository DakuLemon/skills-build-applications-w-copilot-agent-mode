import app from './index';

const PORT = process.env.PORT || 8000;

const codespaceName = process.env.CODESPACE_NAME;
const BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log(`✓ Server running at ${BASE_URL}`);
  console.log(`✓ Codespaces: ${codespaceName ? `yes (${codespaceName})` : 'no (localhost)'}`);
});

export { BASE_URL };
