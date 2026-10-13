const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = path.resolve(__dirname);
const GALLERY_DIR = path.join(ROOT, 'assets', 'images', 'gallery');
const DOCS_DIR = path.join(ROOT, 'assets', 'docs');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.pdf': 'application/pdf',
  '.json': 'application/json'
};

const ALLOWED_IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.svg', '.webp', '.gif']);
const ALLOWED_DOC_EXTS = new Set(['.pdf', '.docx', '.doc', '.xlsx', '.xls', '.zip', '.txt']);

// Helper to convert filename/foldername to readable title
function formatTitle(name) {
  const nameWithoutExt = path.parse(name).name;
  return nameWithoutExt
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());
}

// Fallback category heuristic based on filename when placed in root gallery directory
function determineCategoryFromFilename(filename) {
  const lower = filename.toLowerCase();
  if (lower.includes('excavation') || lower.includes('trench') || lower.includes('dig')) {
    return 'Field Excavation';
  }
  if (lower.includes('auditorium') || lower.includes('seminar') || lower.includes('colloquium') || lower.includes('lecture') || lower.includes('boardroom')) {
    return 'National Seminar';
  }
  if (lower.includes('pavilion') || lower.includes('heritage') || lower.includes('monument') || lower.includes('conservation') || lower.includes('lab')) {
    return 'Heritage Conservation';
  }
  if (lower.includes('aerial') || lower.includes('arial') || lower.includes('campus') || lower.includes('convocation') || lower.includes('facade') || lower.includes('plaza')) {
    return 'Campus Convocation';
  }
  return 'Campus Archives';
}

// Format bytes into readable string
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Recursive directory scanner for gallery
function scanGallery(dir, relativeDir = '') {
  let results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const subRel = relativeDir ? `${relativeDir}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      results = results.concat(scanGallery(fullPath, subRel));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (ALLOWED_IMAGE_EXTS.has(ext)) {
        const stats = fs.statSync(fullPath);
        
        let category = '';
        if (relativeDir) {
          const topFolder = relativeDir.split('/')[0];
          category = formatTitle(topFolder);
        } else {
          category = determineCategoryFromFilename(entry.name);
        }

        const title = formatTitle(entry.name);

        results.push({
          filename: entry.name,
          relativePath: subRel,
          src: `/assets/images/gallery/${subRel}`,
          title: title,
          category: category,
          subfolder: relativeDir || null,
          date: stats.mtime.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }),
          mtime: stats.mtimeMs
        });
      }
    }
  }

  return results;
}

// Scanner for docs folder
function scanDocs(category) {
  let targetDir = DOCS_DIR;
  if (category) {
    targetDir = path.join(DOCS_DIR, category);
  }

  let results = [];
  if (!fs.existsSync(targetDir)) return results;

  const entries = fs.readdirSync(targetDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (ALLOWED_DOC_EXTS.has(ext)) {
        const fullPath = path.join(targetDir, entry.name);
        const stats = fs.statSync(fullPath);
        const relUrl = category ? `/assets/docs/${category}/${entry.name}` : `/assets/docs/${entry.name}`;

        results.push({
          filename: entry.name,
          title: formatTitle(entry.name),
          category: category || 'general',
          url: relUrl,
          ext: ext.replace('.', '').toUpperCase(),
          size: formatBytes(stats.size),
          date: stats.mtime.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }),
          mtime: stats.mtimeMs
        });
      }
    }
  }

  return results.sort((a, b) => b.mtime - a.mtime);
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Dynamic API endpoint: /api/gallery
  if (pathname === '/api/gallery') {
    if (!fs.existsSync(GALLERY_DIR)) {
      fs.mkdirSync(GALLERY_DIR, { recursive: true });
    }

    try {
      const images = scanGallery(GALLERY_DIR);
      images.sort((a, b) => b.mtime - a.mtime);

      res.writeHead(200, {
        'Content-Type': 'application/json; charset=UTF-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify(images));
      return;
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({ error: err.message }));
      return;
    }
  }

  // Dynamic API endpoint: /api/docs?category=admissions (or notifications-tenders, research-excavation)
  if (pathname === '/api/docs') {
    const category = parsedUrl.searchParams.get('category') || '';
    try {
      const docs = scanDocs(category);
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=UTF-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify(docs));
      return;
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({ error: err.message }));
      return;
    }
  }

  // Static file serving
  if (pathname === '/') pathname = '/index.html';

  let filePath = path.join(ROOT, pathname);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, {
    'Content-Type': contentType,
    'Access-Control-Allow-Origin': '*'
  });

  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});