import fs from "fs";
import path from "path";
import fetch from "node-fetch";

// Where to send document chunks
const UPLOAD_URL = "http://127.0.0.1:8788/upload"; // ← Cloudflare Pages dev URL

// Folder containing your docs
const DOCS_DIR = "./documents";

// Chunk size for embeddings
const CHUNK_SIZE = 800;

function chunkText(text, size = CHUNK_SIZE) {
  const chunks = [];
  let start = 0;

  while (start < text.length) {
    chunks.push(text.slice(start, start + size));
    start += size;
  }
  return chunks;
}

// Extract text depending on file type
async function extractText(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".txt" || ext === ".md") {
    return fs.readFileSync(filePath, "utf8");
  }

  if (ext === ".pdf") {
    const data = fs.readFileSync(filePath);
    const pdf = await pdfParse(data);
    return pdf.text;
  }

  console.warn(`Skipping unsupported file: ${filePath}`);
  return "";
}

// Upload one chunk
async function uploadChunk(text, source) {
  const res = await fetch(UPLOAD_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      source,
    }),
  });

  if (!res.ok) {
    console.error(`❌ Upload failed for ${source}`, await res.text());
  } else {
    console.log(`✅ Uploaded chunk (${text.length} chars) from ${source}`);
  }
}

async function ingestFile(filePath) {
  const source = path.basename(filePath);
  console.log(`\n📄 Processing: ${source}`);

  const text = await extractText(filePath);
  if (!text) {
    console.warn(`⚠️ No text extracted from ${source}`);
    return;
  }

  const chunks = chunkText(text);
  console.log(`✂️ Chunked into ${chunks.length} segments`);

  for (const chunk of chunks) {
    await uploadChunk(chunk, source);
  }
}

async function main() {
  const files = fs.readdirSync(DOCS_DIR);

  for (const file of files) {
    const fullPath = path.join(DOCS_DIR, file);
    await ingestFile(fullPath);
  }

  console.log("\n🎉 DONE! All documents ingested into Vectorize.");
}

main();
