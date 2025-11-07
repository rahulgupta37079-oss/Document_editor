# Cloudflare D1 Database Setup Guide

This guide explains how to set up Cloudflare D1 database for document storage.

## Prerequisites
- Cloudflare account with API token
- Wrangler CLI installed
- Project deployed to Cloudflare Pages

## Step 1: Create D1 Database

```bash
npx wrangler d1 create passion3d-docs-db
```

You'll receive output like:
```
✅ Successfully created DB 'passion3d-docs-db'!

[[d1_databases]]
binding = "DB"
database_name = "passion3d-docs-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

## Step 2: Update wrangler.jsonc

Copy the configuration from Step 1 output and update `wrangler.jsonc`:

```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "passion3d-docs-db",
      "database_id": "YOUR_DATABASE_ID_HERE"
    }
  ]
}
```

## Step 3: Run Migrations

Apply the database schema:

```bash
# For production
npx wrangler d1 migrations apply passion3d-docs-db

# For local development
npx wrangler d1 migrations apply passion3d-docs-db --local
```

## Step 4: Test Database

```bash
# Execute a test query
npx wrangler d1 execute passion3d-docs-db --command="SELECT * FROM documents LIMIT 5"
```

## Step 5: Redeploy

```bash
npm run build
npx wrangler pages deploy dist --project-name passion3d-docs
```

## Database Schema

### documents table
Stores all generated offer letters and certificates.

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| type | TEXT | 'offer_letter' or 'certificate' |
| candidate_name | TEXT | Name of candidate |
| position | TEXT | Job position |
| document_data | TEXT | JSON data of document |
| created_at | DATETIME | Creation timestamp |
| updated_at | DATETIME | Last update timestamp |

### custom_templates table
Stores user-created custom templates.

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| name | TEXT | Template name |
| category | TEXT | Template category |
| position | TEXT | Job position |
| responsibilities | TEXT | Role responsibilities |
| stipend | INTEGER | Monthly stipend |
| work_location | TEXT | Work location type |
| created_at | DATETIME | Creation timestamp |

## API Endpoints

### Save Document
```http
POST /api/documents
Content-Type: application/json

{
  "type": "offer_letter",
  "candidateName": "John Doe",
  "position": "Software Engineer",
  "documentData": { ... }
}
```

### Get All Documents
```http
GET /api/documents
```

### Get Single Document
```http
GET /api/documents/:id
```

### Delete Document
```http
DELETE /api/documents/:id
```

## Local Development

Create `.dev.vars` file:
```
# Add if using D1 locally
```

Run migrations locally:
```bash
npx wrangler d1 migrations apply passion3d-docs-db --local
```

Start local server with D1:
```bash
npx wrangler pages dev dist --d1=passion3d-docs-db --local
```

## Troubleshooting

### "Database not configured" error
- Ensure D1 binding is added to wrangler.jsonc
- Verify database_id is correct
- Redeploy after configuration changes

### Migrations not applying
- Check migration files in `migrations/` directory
- Ensure database name matches in command
- Check Cloudflare dashboard for database status

### API Token Permissions
Your API token needs these permissions:
- D1 Database: Read & Write
- Workers: Edit
- Pages: Edit

## Production Best Practices

1. **Backups**: D1 handles automatic backups
2. **Monitoring**: Check Cloudflare dashboard for query analytics
3. **Limits**: Free tier includes 100,000 reads/day, 50,000 writes/day
4. **Optimization**: Use indexes for frequently queried columns
5. **Security**: Never expose database_id in frontend code

## Next Steps

After D1 setup:
1. ✅ Documents will be saved automatically
2. ✅ View document history in app
3. ✅ Search and retrieve past documents
4. ✅ Export document lists
5. ✅ Analytics on document generation

## Support

- Cloudflare D1 Docs: https://developers.cloudflare.com/d1/
- Wrangler Docs: https://developers.cloudflare.com/workers/wrangler/
- Project Issues: Check README.md
