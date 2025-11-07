# Database Features Documentation

## Overview
This document describes all the advanced database features implemented in Passion3D Docs.

## Prerequisites
Before using these features, you must set up the D1 database:

```bash
# Create D1 database
npx wrangler d1 create passion3d-docs-db

# Update wrangler.jsonc with the database_id from above

# Run migrations
npx wrangler d1 migrations apply passion3d-docs-db --local  # For local dev
npx wrangler d1 migrations apply passion3d-docs-db          # For production
```

## Features Implemented

### 1. Document Storage with Metadata ✅

**Database Schema:**
```sql
CREATE TABLE documents (
    id INTEGER PRIMARY KEY,
    type TEXT,                    -- 'offer_letter' or 'certificate'
    candidate_name TEXT,
    position TEXT,
    document_data TEXT,           -- JSON with all document fields
    original_pdf_text TEXT,       -- Original uploaded PDF text
    upload_filename TEXT,         -- Original filename
    extraction_method TEXT,       -- 'pattern_matching' or 'groq'
    created_at DATETIME,
    updated_at DATETIME
);
```

**API Endpoint:**
```http
POST /api/documents
Content-Type: application/json

{
  "type": "offer_letter",
  "candidateName": "John Doe",
  "position": "Software Engineer",
  "documentData": { ... },
  "originalPdfText": "Full PDF text...",
  "uploadFilename": "john_offer.pdf",
  "extractionMethod": "groq"
}
```

**Response:**
```json
{
  "success": true,
  "id": 123,
  "message": "Document saved with version history"
}
```

---

### 2. Version History ✅

**Database Schema:**
```sql
CREATE TABLE document_versions (
    id INTEGER PRIMARY KEY,
    document_id INTEGER,
    version_number INTEGER,
    document_data TEXT,           -- JSON snapshot
    changes_description TEXT,
    created_at DATETIME
);
```

**Features:**
- Automatic version creation on document save
- Complete change history
- Version number tracking
- Change descriptions

**API Endpoint:**
```http
GET /api/documents/:id

Response:
{
  "document": { ... },
  "versions": [
    {
      "id": 1,
      "version_number": 1,
      "document_data": "...",
      "changes_description": "Initial version",
      "created_at": "2025-11-07T..."
    }
  ]
}
```

---

### 3. Document Comparison ✅

**Database Schema:**
```sql
CREATE TABLE document_comparisons (
    id INTEGER PRIMARY KEY,
    original_document_id INTEGER,
    modified_document_id INTEGER,
    comparison_data TEXT,         -- JSON with field differences
    created_at DATETIME
);
```

**API Endpoint:**
```http
POST /api/documents/compare
Content-Type: application/json

{
  "originalId": 123,
  "modifiedId": 124
}
```

**Response:**
```json
{
  "success": true,
  "original": {
    "id": 123,
    "name": "John Doe",
    "data": { "stipend": 5000, "position": "Video Editor" }
  },
  "modified": {
    "id": 124,
    "name": "John Doe",
    "data": { "stipend": 6000, "position": "Senior Video Editor" }
  },
  "differences": {
    "stipend": {
      "original": 5000,
      "modified": 6000
    },
    "position": {
      "original": "Video Editor",
      "modified": "Senior Video Editor"
    }
  },
  "differenceCount": 2
}
```

---

### 4. Batch Upload Processing ✅

**Database Schema:**
```sql
CREATE TABLE batch_uploads (
    id INTEGER PRIMARY KEY,
    batch_name TEXT,
    total_files INTEGER,
    processed_files INTEGER,
    failed_files INTEGER,
    status TEXT,                  -- 'pending', 'processing', 'completed', 'failed'
    created_at DATETIME,
    completed_at DATETIME
);

CREATE TABLE batch_upload_documents (
    id INTEGER PRIMARY KEY,
    batch_id INTEGER,
    document_id INTEGER,
    filename TEXT,
    status TEXT,
    error_message TEXT,
    created_at DATETIME
);
```

**Workflow:**

**Step 1: Create Batch**
```http
POST /api/batch/create
Content-Type: application/json

{
  "batchName": "January 2025 Offers",
  "totalFiles": 10
}

Response:
{
  "success": true,
  "batchId": 456
}
```

**Step 2: Add Documents to Batch**
```http
POST /api/batch/:batchId/add
Content-Type: application/json

{
  "documentId": 123,
  "filename": "john_offer.pdf",
  "status": "completed"
}

Response:
{
  "success": true
}
```

**Step 3: Check Batch Status**
```http
GET /api/batch/:batchId

Response:
{
  "batch": {
    "id": 456,
    "batch_name": "January 2025 Offers",
    "total_files": 10,
    "processed_files": 7,
    "failed_files": 1,
    "status": "processing"
  },
  "documents": [
    {
      "id": 1,
      "filename": "john_offer.pdf",
      "status": "completed"
    },
    {
      "id": 2,
      "filename": "jane_offer.pdf",
      "status": "failed",
      "error_message": "Invalid PDF format"
    }
  ]
}
```

---

### 5. Template Learning (Database Ready) 🔜

**Database Schema:**
```sql
CREATE TABLE learned_templates (
    id INTEGER PRIMARY KEY,
    pattern_name TEXT,
    field_patterns TEXT,          -- JSON with extraction patterns
    usage_count INTEGER,
    success_rate REAL,
    last_used DATETIME,
    created_at DATETIME
);
```

**Purpose:**
- AI learns from successful extractions
- Improves pattern matching over time
- Company-specific pattern recognition
- Higher accuracy with usage

---

### 6. Email Logs (Database Ready) 🔜

**Database Schema:**
```sql
CREATE TABLE email_logs (
    id INTEGER PRIMARY KEY,
    document_id INTEGER,
    recipient_email TEXT,
    subject TEXT,
    status TEXT,                  -- 'pending', 'sent', 'failed'
    error_message TEXT,
    sent_at DATETIME,
    created_at DATETIME
);
```

**Purpose:**
- Track all email deliveries
- Retry failed sends
- Email delivery history
- Audit trail

---

## Usage Examples

### Example 1: Save Document After PDF Upload

```javascript
// In offer-letter or certificate page
async function saveGeneratedDocument() {
  const documentData = {
    candidateName: document.getElementById('candidateName').value,
    position: document.getElementById('position').value,
    stipend: document.getElementById('stipend').value,
    // ... other fields
  };
  
  const response = await fetch('/api/documents', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'offer_letter',
      candidateName: documentData.candidateName,
      position: documentData.position,
      documentData: documentData,
      originalPdfText: sessionStorage.getItem('pdfText'),
      uploadFilename: sessionStorage.getItem('filename'),
      extractionMethod: 'groq'
    })
  });
  
  const result = await response.json();
  console.log('Document saved with ID:', result.id);
}
```

### Example 2: Compare Two Documents

```javascript
async function compareDocuments(originalId, modifiedId) {
  const response = await fetch('/api/documents/compare', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ originalId, modifiedId })
  });
  
  const result = await response.json();
  
  // Display differences
  Object.keys(result.differences).forEach(field => {
    console.log(`${field}: ${result.differences[field].original} → ${result.differences[field].modified}`);
  });
}
```

### Example 3: Batch Upload Multiple PDFs

```javascript
async function processBatchUpload(files) {
  // Create batch
  const batchResponse = await fetch('/api/batch/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      batchName: 'Batch ' + new Date().toISOString(),
      totalFiles: files.length
    })
  });
  
  const { batchId } = await batchResponse.json();
  
  // Process each file
  for (const file of files) {
    try {
      // Extract text from PDF
      const text = await extractPDFText(file);
      
      // Process with AI
      const processResponse = await fetch('/api/process-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, filename: file.name, useRealAI: true })
      });
      
      const { data } = await processResponse.json();
      
      // Save document
      const saveResponse = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: data.type,
          candidateName: data.candidateName,
          position: data.position,
          documentData: data
        })
      });
      
      const { id: documentId } = await saveResponse.json();
      
      // Add to batch
      await fetch(`/api/batch/${batchId}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentId,
          filename: file.name,
          status: 'completed'
        })
      });
      
    } catch (error) {
      // Add failed file to batch
      await fetch(`/api/batch/${batchId}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          status: 'failed',
          errorMessage: error.message
        })
      });
    }
  }
  
  console.log('Batch processing complete. Batch ID:', batchId);
}
```

---

## Database Setup Instructions

### Local Development

```bash
# 1. Create database
npx wrangler d1 create passion3d-docs-db

# 2. Run both migrations
npx wrangler d1 migrations apply passion3d-docs-db --local

# 3. Verify tables
npx wrangler d1 execute passion3d-docs-db --local --command="SELECT name FROM sqlite_master WHERE type='table'"

# 4. Start dev server with D1
npx wrangler pages dev dist --d1=passion3d-docs-db --local --ip 0.0.0.0 --port 3000
```

### Production

```bash
# 1. Apply migrations to production
npx wrangler d1 migrations apply passion3d-docs-db

# 2. Update wrangler.jsonc with database_id

# 3. Deploy
npm run build
npx wrangler pages deploy dist --project-name passion3d-docs
```

---

## Error Handling

All API endpoints return appropriate HTTP status codes:

- `200` - Success
- `404` - Resource not found
- `500` - Server error
- `503` - Database not configured (falls back to demo mode)

Example error response:
```json
{
  "error": "Failed to save document",
  "details": "Database connection failed"
}
```

---

## Performance Considerations

1. **Indexes:** All tables have appropriate indexes for fast lookups
2. **Limits:** GET endpoints limited to 100 most recent records
3. **JSON Storage:** Document data stored as JSON TEXT for flexibility
4. **Batch Processing:** Async processing recommended for large batches

---

## Security Best Practices

1. **Input Validation:** Always validate user input before database operations
2. **SQL Injection:** Using prepared statements with parameterized queries
3. **Access Control:** Add authentication before production use
4. **Data Privacy:** Sensitive data should be encrypted
5. **Rate Limiting:** Implement rate limits on API endpoints

---

## Next Steps

To complete the full feature set, implement frontend UI for:

1. **Document History Page** - View all saved documents
2. **Comparison UI** - Side-by-side comparison view
3. **Batch Upload Interface** - Drag-drop multiple PDFs
4. **Version History Viewer** - Timeline of document changes

---

## Support

For issues or questions:
- Check migrations in `/migrations/` directory
- Review D1_SETUP.md for basic setup
- See API responses for error details
- Enable database logging in wrangler.jsonc
