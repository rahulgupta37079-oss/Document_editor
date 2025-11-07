-- Add columns for uploaded PDF tracking
ALTER TABLE documents ADD COLUMN original_pdf_text TEXT;
ALTER TABLE documents ADD COLUMN upload_filename TEXT;
ALTER TABLE documents ADD COLUMN extraction_method TEXT; -- 'pattern_matching' or 'groq'

-- Create document_versions table for version history
CREATE TABLE IF NOT EXISTS document_versions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    document_id INTEGER NOT NULL,
    version_number INTEGER NOT NULL,
    document_data TEXT NOT NULL,
    changes_description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
);

-- Create index on document_id for faster version lookups
CREATE INDEX IF NOT EXISTS idx_versions_document ON document_versions(document_id);
CREATE INDEX IF NOT EXISTS idx_versions_created ON document_versions(created_at DESC);

-- Create document_comparisons table for tracking comparisons
CREATE TABLE IF NOT EXISTS document_comparisons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    original_document_id INTEGER,
    modified_document_id INTEGER,
    comparison_data TEXT, -- JSON with field-by-field differences
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (original_document_id) REFERENCES documents(id),
    FOREIGN KEY (modified_document_id) REFERENCES documents(id)
);

-- Create batch_uploads table for tracking batch processing
CREATE TABLE IF NOT EXISTS batch_uploads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    batch_name TEXT,
    total_files INTEGER NOT NULL,
    processed_files INTEGER DEFAULT 0,
    failed_files INTEGER DEFAULT 0,
    status TEXT CHECK(status IN ('pending', 'processing', 'completed', 'failed')) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME
);

-- Create batch_upload_documents junction table
CREATE TABLE IF NOT EXISTS batch_upload_documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    batch_id INTEGER NOT NULL,
    document_id INTEGER NOT NULL,
    filename TEXT NOT NULL,
    status TEXT CHECK(status IN ('pending', 'processing', 'completed', 'failed')) DEFAULT 'pending',
    error_message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (batch_id) REFERENCES batch_uploads(id) ON DELETE CASCADE,
    FOREIGN KEY (document_id) REFERENCES documents(id)
);

-- Create index for batch lookups
CREATE INDEX IF NOT EXISTS idx_batch_docs_batch ON batch_upload_documents(batch_id);
CREATE INDEX IF NOT EXISTS idx_batch_docs_status ON batch_upload_documents(status);

-- Create email_logs table for email integration
CREATE TABLE IF NOT EXISTS email_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    document_id INTEGER NOT NULL,
    recipient_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    status TEXT CHECK(status IN ('pending', 'sent', 'failed')) DEFAULT 'pending',
    error_message TEXT,
    sent_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES documents(id)
);

-- Create index on email status
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_document ON email_logs(document_id);

-- Create learned_templates table for AI template learning
CREATE TABLE IF NOT EXISTS learned_templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pattern_name TEXT NOT NULL,
    field_patterns TEXT NOT NULL, -- JSON with extraction patterns
    usage_count INTEGER DEFAULT 1,
    success_rate REAL DEFAULT 1.0,
    last_used DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index on pattern usage
CREATE INDEX IF NOT EXISTS idx_learned_patterns_usage ON learned_templates(usage_count DESC);
CREATE INDEX IF NOT EXISTS idx_learned_patterns_success ON learned_templates(success_rate DESC);
