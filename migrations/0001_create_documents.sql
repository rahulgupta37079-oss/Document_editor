-- Create documents table for storing generated offer letters and certificates
CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL CHECK(type IN ('offer_letter', 'certificate')),
    candidate_name TEXT NOT NULL,
    position TEXT NOT NULL,
    document_data TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index on candidate name for faster lookups
CREATE INDEX IF NOT EXISTS idx_documents_candidate ON documents(candidate_name);

-- Create index on type for filtering
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(type);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_documents_created ON documents(created_at DESC);

-- Create templates table for custom user templates
CREATE TABLE IF NOT EXISTS custom_templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    position TEXT NOT NULL,
    responsibilities TEXT NOT NULL,
    stipend INTEGER NOT NULL,
    work_location TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index on template category
CREATE INDEX IF NOT EXISTS idx_templates_category ON custom_templates(category);
