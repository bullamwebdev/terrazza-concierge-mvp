const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const PUBLIC_DIR = '/var/task';
  const htmlPath = path.join(PUBLIC_DIR, 'public', 'terraza', 'index.html');
  
  // Debug info
  const debug = {
    path: htmlPath,
    exists: fs.existsSync(htmlPath),
    cwd: process.cwd(),
    publicDir: path.join(PUBLIC_DIR, 'public'),
    publicExists: fs.existsSync(path.join(PUBLIC_DIR, 'public')),
  };
  
  if (debug.publicExists) {
    debug.publicFiles = fs.readdirSync(path.join(PUBLIC_DIR, 'public'));
  }
  
  if (fs.existsSync(htmlPath)) {
    res.setHeader('Content-Type', 'text/html');
    res.send(fs.readFileSync(htmlPath));
  } else {
    res.status(404).json({ error: 'TerraZa not found', debug });
  }
};