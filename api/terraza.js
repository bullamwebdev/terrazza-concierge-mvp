const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const PUBLIC_DIR = '/var/task';
  const htmlPath = path.join(PUBLIC_DIR, 'public', 'terraza', 'index.html');
  
  if (fs.existsSync(htmlPath)) {
    res.setHeader('Content-Type', 'text/html');
    res.send(fs.readFileSync(htmlPath));
  } else {
    res.status(404).json({ 
      error: 'TerraZa not found', 
      path: htmlPath, 
      files: fs.readdirSync(PUBLIC_DIR).slice(0, 10),
      public: fs.existsSync(path.join(PUBLIC_DIR, 'public')) ? fs.readdirSync(path.join(PUBLIC_DIR, 'public')).slice(0, 10) : 'NOT_FOUND'
    });
  }
};