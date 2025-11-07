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
- **🌐 Production**: https://passion3d-docs.pages.dev (Cloudflare Pages)
- **📦 Branch Deployments**: https://ebb90f45.passion3d-docs.pages.dev
- **Development**: https://3000-i8k1j0dusjnrkrmd40c5e-2e1b9533.sandbox.novita.ai
- **Home**: `/` - Main landing page with navigation
- **Offer Letter Generator**: `/offer-letter` - Create customized internship offer letters
- **Certificate Generator**: `/certificate` - Create professional completion certificates
- **Templates API**: `/api/templates` - Get all pre-built templates
- **AI Generate API**: `/api/generate-content` - AI-powered content generation

## Currently Completed Features

### 🤖 AI-Powered Features
- **Smart Templates**: 5 pre-built templates (Video Editor, 3D Artist, Software Tester, Content Creator, R&D Generalist)
- **One-Click Template Application**: Instantly fill forms with professional pre-configured values
- **Dual AI Modes**: 
  - **Smart Mode**: Fast pattern matching (always available)
  - **AI Pro Mode**: Real LLM integration (Groq/OpenAI - requires API key)
- **Smart Auto-Fill**: Describe the position in natural language and AI extracts key details
- **Intelligent Content Generation**: AI-powered suggestions for responsibilities and achievements
- **Natural Language Processing**: Understands descriptions like "R&D Intern for video editing, 6 months, ₹5000, WFH"
- **Demo Mode**: Works without API keys using smart pattern matching
- **Real-time Generation**: Instant AI-powered content suggestions

### ✅ Offer Letter Generator
- **AI Auto-Fill**: Describe position and AI fills the entire form automatically
- **Smart Extraction**: AI extracts position, stipend, duration, location from text
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
- **AI-Generated Achievements**: One-click AI generation of professional achievements
- **Performance-Based Content**: AI adapts content based on performance rating
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
- **AI-Powered Backend**: API endpoint for content generation
- **Smart NLP Processing**: Natural language understanding for form auto-fill
- **Demo Mode**: Works without external API keys
- Built with Hono framework for lightweight performance
- Responsive design using TailwindCSS
- FontAwesome icons for enhanced UI
- html2pdf.js integration for PDF generation
- Clean, modern dark theme interface
- Mobile-friendly responsive design

## Features Not Yet Implemented
- ❌ Database storage for generated documents (can be added with Cloudflare D1)
- ❌ User authentication and access control
- ❌ Document history and tracking
- ❌ Email delivery of generated documents
- ❌ Digital signature integration
- ❌ Bulk document generation (CSV import)
- ❌ Custom branding/logo upload
- ❌ Advanced template customization editor (currently 5 pre-built templates)
- ❌ Document versioning
- ❌ AI training on company-specific documents
- ❌ Multi-language support

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

### Creating an Offer Letter (with AI & Templates)
1. Navigate to the home page and click "Create Offer Letter"

**Option A: Use Smart Templates (Fastest)**
1. In the "Smart Templates" section, select a pre-built template:
   - Video Editor Intern (₹5000, Hybrid)
   - 3D Artist Intern (₹6000, Office)
   - Software Tester Intern (₹4000, WFH)
   - Content Creator Intern (₹4500, WFH)
   - R&D Generalist (₹5500, Hybrid)
2. Template auto-fills position, stipend, and work location
3. Add candidate name and adjust dates
4. Click "Generate Preview"

**Option B: Use AI Auto-Fill (Flexible)**
1. In the "Quick AI Generation" section, describe the position in natural language
   - Example: "R&D Intern for video editing and 3D modeling, 6 months, ₹5000 stipend, work from home"
2. Choose your AI mode:
   - **"Smart Auto-Fill"**: Fast pattern matching (no API key needed)
   - **"AI Pro Mode"**: Real LLM generation (requires Groq/OpenAI API key)
3. Click the button and watch the AI fill the form automatically
4. Review and adjust the generated values if needed
5. Click "Generate Preview"

**Option B: Manual Fill**
2. Fill in the form manually with:
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

### Creating a Certificate (with AI)
1. Navigate to the home page and click "Create Certificate"
2. Fill in the form with:
   - Recipient's full name
   - Role/position during internship
   - Start and end dates of the period
   - Performance rating (Excellent, Very Good, Good, Satisfactory)
   - Key skills and achievements
     - **AI Tip**: Click "AI Generate Achievements" for professional AI-generated content!
   - Certificate ID
   - Issue date
3. Click "Generate Preview" to see the certificate
4. Review the generated certificate in the preview pane
5. Click "Download PDF" to export as PDF or "Print" to print directly

### Tips
- **Use AI for faster document creation**: The AI can understand natural language descriptions
- **AI works in demo mode**: No API keys needed, uses smart pattern matching
- All dates can be selected using the date picker
- The preview updates when you click "Generate Preview"
- PDF downloads are automatically named with the candidate/recipient name
- Certificates are generated in landscape orientation for better presentation
- Offer letters are in portrait orientation following standard document format
- AI-generated content can be edited before generating the final document

## Deployment
- **Platform**: Cloudflare Pages ✅ **DEPLOYED**
- **Status**: 🌐 Live in Production
- **Production URL**: https://passion3d-docs.pages.dev
- **Project Name**: passion3d-docs
- **Tech Stack**: 
  - Backend: Hono Framework (v4.10.4)
  - Frontend: TailwindCSS + FontAwesome + html2pdf.js
  - Runtime: Cloudflare Workers (Edge Computing)
  - Build Tool: Vite (v6.3.5)
  - Package Manager: npm
  - AI Support: Groq API (Llama 3.1), OpenAI API (optional)
- **Last Updated**: 2025-11-07
- **Deployment Date**: 2025-11-07

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

# Or deploy manually
npx wrangler pages deploy dist --project-name passion3d-docs
```

## Setting Up AI Pro Mode (Optional)

To enable AI Pro Mode with real LLM integration:

### Option 1: Groq API (Recommended - Free & Fast)
1. Get a free API key from https://console.groq.com
2. In Cloudflare Pages dashboard, add secret:
   ```bash
   npx wrangler pages secret put GROQ_API_KEY --project-name passion3d-docs
   ```
3. Enter your API key when prompted

### Option 2: OpenAI API
1. Get API key from https://platform.openai.com
2. Add secret:
   ```bash
   npx wrangler pages secret put OPENAI_API_KEY --project-name passion3d-docs
   ```

### For Local Development
Create `.dev.vars` file in project root:
```
GROQ_API_KEY=your-api-key-here
OPENAI_API_KEY=your-openai-key-here
```

**Note**: Smart Mode works perfectly without any API keys!

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
- **AI Integration**: Smart NLP-based content generation (demo mode, extendable to real LLMs)
- **Backend Framework**: Hono - Lightweight web framework for edge computing
- **Frontend Styling**: TailwindCSS (CDN) with custom dark blue, white, and black theme
- **Icons**: FontAwesome (v6.4.0)
- **PDF Generation**: html2pdf.js (v0.10.1)
- **Build Tool**: Vite
- **Deployment**: Cloudflare Pages
- **Process Manager**: PM2 (for development)
- **Design Theme**: Dark mode with navy blue gradients, white text, and black accents
- **AI API**: RESTful endpoint for content generation (`/api/generate-content`)

## License
Proprietary - Passion 3D World

## Contact
- **Email**: passion3dworld@gmail.com
- **Phone**: +91 9137361474
- **Address**: Kashimira, Mira Road (E), Mumbai, Maharashtra, India

---

**Note**: This application is currently in development. For production deployment, it's recommended to add database persistence, user authentication, and additional security measures.
