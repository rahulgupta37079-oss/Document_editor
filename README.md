# Document Generator - Passion 3D World

## Project Overview
- **Name**: Document Generator for Offer Letters & Certificates
- **Goal**: Automated document generation system for Passion 3D World to create customizable offer letters and certificates with ease
- **Features**: 
  - Interactive form-based document generation
  - Real-time document preview
  - PDF export functionality
  - Customizable fields for candidate details, dates, stipend, and more
  - Professional formatting for both offer letters and certificates
  - Print support

## URLs
- **Development**: https://3000-i8k1j0dusjnrkrmd40c5e-2e1b9533.sandbox.novita.ai
- **Home**: `/` - Main landing page with navigation
- **Offer Letter Generator**: `/offer-letter` - Create customized internship offer letters
- **Certificate Generator**: `/certificate` - Create professional completion certificates

## Currently Completed Features

### ✅ Offer Letter Generator
- Customizable candidate information (name, position)
- Flexible date selection (document date, start date, end date)
- Probation period configuration
- Work location options (Work From Home, Office, Hybrid)
- Working hours customization
- Monthly stipend configuration
- Automated terms and conditions
- Real-time document preview
- PDF export functionality
- Print support

### ✅ Certificate Generator
- Recipient information customization
- Role/position specification
- Period details (start and end dates)
- Performance rating selection
- Key skills and achievements section
- Certificate ID generation
- Issue date configuration
- Professional landscape certificate design
- Real-time preview
- PDF export functionality
- Print support

### ✅ Technical Features
- Built with Hono framework for lightweight performance
- Responsive design using TailwindCSS
- FontAwesome icons for enhanced UI
- html2pdf.js integration for PDF generation
- Clean, modern interface
- Mobile-friendly responsive design

## Features Not Yet Implemented
- ❌ Database storage for generated documents
- ❌ Template management system for multiple document types
- ❌ User authentication and access control
- ❌ Document history and tracking
- ❌ Email delivery of generated documents
- ❌ Digital signature integration
- ❌ Bulk document generation
- ❌ Custom branding/logo upload
- ❌ Advanced template customization editor
- ❌ Document versioning

## Recommended Next Steps for Development

### Phase 1: Data Persistence (High Priority)
1. **Add Cloudflare D1 Database**
   - Store generated documents
   - Track document history
   - Enable document retrieval and regeneration
   - Create migrations for documents table

2. **Implement Document Management**
   - List all generated documents
   - Search and filter capabilities
   - Edit and regenerate existing documents
   - Delete unwanted documents

### Phase 2: Enhanced Features (Medium Priority)
3. **Template System**
   - Multiple offer letter templates
   - Multiple certificate templates
   - Custom template creation
   - Template preview gallery

4. **User Management**
   - Authentication system
   - Role-based access control
   - User profiles
   - Activity logging

### Phase 3: Advanced Features (Low Priority)
5. **Email Integration**
   - Send documents via email
   - Email templates
   - Delivery tracking
   - Automated reminders

6. **Bulk Operations**
   - Batch document generation
   - CSV import for candidate data
   - Bulk PDF export
   - Batch email sending

7. **Advanced Customization**
   - Company logo upload
   - Custom color schemes
   - Font selection
   - Layout customization

## Data Architecture
- **Data Models**: 
  - Offer Letter: Document metadata, candidate info, position details, dates, compensation
  - Certificate: Recipient info, performance data, issue details
  
- **Storage Services**: 
  - Currently: In-memory (not persistent)
  - Recommended: Cloudflare D1 for document storage, Cloudflare R2 for PDF file storage
  
- **Data Flow**: 
  1. User fills form with document details
  2. Frontend generates HTML preview in real-time
  3. User can export to PDF using html2pdf.js
  4. User can print document directly
  5. (Future) Save to D1 database and store PDF in R2 bucket

## User Guide

### Creating an Offer Letter
1. Navigate to the home page and click "Create Offer Letter"
2. Fill in the form with:
   - Document date
   - Candidate's full name
   - Position/role
   - Internship start and end dates
   - Probation period (in months)
   - Work location (WFH, Office, or Hybrid)
   - Working hours details
   - Monthly stipend amount
3. Click "Generate Preview" to see the document
4. Review the generated offer letter in the preview pane
5. Click "Download PDF" to export as PDF or "Print" to print directly

### Creating a Certificate
1. Navigate to the home page and click "Create Certificate"
2. Fill in the form with:
   - Recipient's full name
   - Role/position during internship
   - Start and end dates of the period
   - Performance rating (Excellent, Very Good, Good, Satisfactory)
   - Key skills and achievements (optional)
   - Certificate ID
   - Issue date
3. Click "Generate Preview" to see the certificate
4. Review the generated certificate in the preview pane
5. Click "Download PDF" to export as PDF or "Print" to print directly

### Tips
- All dates can be selected using the date picker
- The preview updates when you click "Generate Preview"
- PDF downloads are automatically named with the candidate/recipient name
- Certificates are generated in landscape orientation for better presentation
- Offer letters are in portrait orientation following standard document format

## Deployment
- **Platform**: Cloudflare Pages (ready for deployment)
- **Status**: ✅ Active (Development)
- **Tech Stack**: 
  - Backend: Hono Framework (v4.10.4)
  - Frontend: TailwindCSS + FontAwesome + html2pdf.js
  - Runtime: Cloudflare Workers
  - Build Tool: Vite (v6.3.5)
  - Package Manager: npm
- **Last Updated**: 2025-11-07

## Development Commands

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start development server (sandbox)
npm run dev:sandbox

# Start with PM2
pm2 start ecosystem.config.cjs

# Check service status
pm2 list

# View logs (non-blocking)
pm2 logs webapp --nostream

# Stop service
pm2 stop webapp

# Clean port 3000
npm run clean-port

# Deploy to Cloudflare Pages (production)
npm run deploy:prod
```

## Project Structure
```
webapp/
├── src/
│   └── index.tsx          # Main Hono application with all routes
├── public/
│   └── static/
│       └── style.css      # Custom styles (if needed)
├── dist/                  # Build output
├── ecosystem.config.cjs   # PM2 configuration
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── wrangler.jsonc         # Cloudflare configuration
└── README.md             # This file
```

## Technologies Used
- **Backend Framework**: Hono - Lightweight web framework for edge computing
- **Frontend Styling**: TailwindCSS (CDN)
- **Icons**: FontAwesome (v6.4.0)
- **PDF Generation**: html2pdf.js (v0.10.1)
- **Build Tool**: Vite
- **Deployment**: Cloudflare Pages
- **Process Manager**: PM2 (for development)

## License
Proprietary - Passion 3D World

## Contact
- **Email**: passion3dworld@gmail.com
- **Phone**: +91 9137361474
- **Address**: Kashimira, Mira Road (E), Mumbai, Maharashtra, India

---

**Note**: This application is currently in development. For production deployment, it's recommended to add database persistence, user authentication, and additional security measures.
