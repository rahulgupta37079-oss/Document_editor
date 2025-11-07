import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  DB?: D1Database;
  GROQ_API_KEY?: string;
  OPENAI_API_KEY?: string;
  GEMINI_API_KEY?: string;
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS for API routes
app.use('/api/*', cors())

// Smart Templates - Expanded Library (20 templates)
const templates = {
  // Creative Templates (7)
  'video-editor': {
    name: 'Video Editor Intern',
    category: 'Creative',
    position: 'Video Editing Intern',
    responsibilities: 'Video Editing and Post-Production, Motion Graphics Design, Color Grading, Audio Mixing, Content Creation for Social Media',
    stipend: 5000,
    workLocation: 'Hybrid'
  },
  '3d-artist': {
    name: '3D Artist Intern',
    category: 'Creative',
    position: '3D Modeling and Animation Intern',
    responsibilities: '3D Modeling, Texturing and UV Mapping, Character Animation, Rendering and Lighting, Asset Creation for Games/Films',
    stipend: 6000,
    workLocation: 'Office'
  },
  'graphic-designer': {
    name: 'Graphic Designer',
    category: 'Creative',
    position: 'Graphic Design Intern',
    responsibilities: 'Visual Design, Brand Identity, Adobe Creative Suite, Social Media Graphics, Print Design, Illustration',
    stipend: 4500,
    workLocation: 'Hybrid'
  },
  'ui-ux-designer': {
    name: 'UI/UX Designer',
    category: 'Creative',
    position: 'UI/UX Design Intern',
    responsibilities: 'User Research, Wireframing, Prototyping, Figma/Adobe XD, Usability Testing, Design Systems, User Flows',
    stipend: 6000,
    workLocation: 'Hybrid'
  },
  'animator': {
    name: 'Animator',
    category: 'Creative',
    position: 'Animation Intern',
    responsibilities: '2D/3D Animation, Character Animation, Motion Design, After Effects, Storyboarding, Visual Effects',
    stipend: 5500,
    workLocation: 'Office'
  },
  'photographer': {
    name: 'Photographer',
    category: 'Creative',
    position: 'Photography Intern',
    responsibilities: 'Product Photography, Event Coverage, Photo Editing, Lightroom/Photoshop, Studio Setup, Portfolio Management',
    stipend: 4000,
    workLocation: 'Hybrid'
  },
  'content-creator': {
    name: 'Content Creator Intern',
    category: 'Creative',
    position: 'Content Development Intern',
    responsibilities: 'Content Writing and Copywriting, Social Media Content Creation, SEO Optimization, Graphic Design, Video Script Writing',
    stipend: 4500,
    workLocation: 'Work From Home'
  },
  
  // Technical Templates (9)
  'frontend-dev': {
    name: 'Frontend Developer',
    category: 'Technical',
    position: 'Frontend Development Intern',
    responsibilities: 'React/Vue Development, Responsive Web Design, API Integration, UI/UX Implementation, Performance Optimization, Git Version Control',
    stipend: 7000,
    workLocation: 'Hybrid'
  },
  'backend-dev': {
    name: 'Backend Developer',
    category: 'Technical',
    position: 'Backend Development Intern',
    responsibilities: 'API Development, Database Design, Server Management, Authentication Systems, Performance Optimization, Documentation',
    stipend: 7500,
    workLocation: 'Work From Home'
  },
  'fullstack-dev': {
    name: 'Full Stack Developer',
    category: 'Technical',
    position: 'Full Stack Development Intern',
    responsibilities: 'End-to-End Web Development, Frontend and Backend Integration, Database Management, DevOps Basics, Code Review',
    stipend: 8000,
    workLocation: 'Hybrid'
  },
  'mobile-dev': {
    name: 'Mobile App Developer',
    category: 'Technical',
    position: 'Mobile Development Intern',
    responsibilities: 'iOS/Android Development, React Native/Flutter, API Integration, Mobile UI/UX, App Store Deployment, Testing',
    stipend: 7500,
    workLocation: 'Hybrid'
  },
  'devops': {
    name: 'DevOps Engineer',
    category: 'Technical',
    position: 'DevOps Intern',
    responsibilities: 'CI/CD Pipeline Setup, Docker/Kubernetes, Cloud Deployment, Monitoring, Automation Scripts, Infrastructure as Code',
    stipend: 8000,
    workLocation: 'Work From Home'
  },
  'data-analyst': {
    name: 'Data Analyst',
    category: 'Technical',
    position: 'Data Analytics Intern',
    responsibilities: 'Data Analysis and Visualization, SQL Queries, Python/R Programming, Excel/Tableau, Statistical Analysis, Report Generation',
    stipend: 6500,
    workLocation: 'Hybrid'
  },
  'ml-engineer': {
    name: 'ML Engineer',
    category: 'Technical',
    position: 'Machine Learning Intern',
    responsibilities: 'Machine Learning Model Development, Python/TensorFlow, Data Preprocessing, Model Training, Algorithm Optimization, Research',
    stipend: 9000,
    workLocation: 'Hybrid'
  },
  'software-tester': {
    name: 'Software Tester Intern',
    category: 'Technical',
    position: 'Software Testing Intern',
    responsibilities: 'Manual and Automated Testing, Bug Reporting and Tracking, Test Case Design, API Testing, Performance Testing',
    stipend: 4000,
    workLocation: 'Work From Home'
  },
  'rnd-generalist': {
    name: 'R&D Generalist',
    category: 'Technical',
    position: 'Research and Development Intern',
    responsibilities: 'Video Creation, 3D Modeling, Software Testing, Content Development, Documentation, Research and Innovation',
    stipend: 5500,
    workLocation: 'Hybrid'
  },
  
  // Business Templates (4)
  'digital-marketing': {
    name: 'Digital Marketing',
    category: 'Business',
    position: 'Digital Marketing Intern',
    responsibilities: 'Social Media Marketing, SEO/SEM, Email Campaigns, Google Analytics, Content Strategy, Performance Tracking',
    stipend: 5000,
    workLocation: 'Work From Home'
  },
  'business-analyst': {
    name: 'Business Analyst',
    category: 'Business',
    position: 'Business Analysis Intern',
    responsibilities: 'Market Research, Data Analysis, Business Requirements, Process Improvement, Stakeholder Communication, Reporting',
    stipend: 6000,
    workLocation: 'Hybrid'
  },
  'hr-intern': {
    name: 'HR Specialist',
    category: 'Business',
    position: 'Human Resources Intern',
    responsibilities: 'Recruitment, Employee Onboarding, HR Policies, Performance Management, Training Coordination, Documentation',
    stipend: 4000,
    workLocation: 'Office'
  },
  'sales-intern': {
    name: 'Sales Representative',
    category: 'Business',
    position: 'Sales Intern',
    responsibilities: 'Lead Generation, Client Communication, CRM Management, Sales Presentations, Market Analysis, Customer Support',
    stipend: 4500,
    workLocation: 'Hybrid'
  }
}

// API endpoint to get templates
app.get('/api/templates', (c) => {
  return c.json({ templates })
})

// API endpoint to process uploaded PDF text
app.post('/api/process-pdf', async (c) => {
  try {
    const { text, filename, useRealAI } = await c.req.json()
    
    if (!text || text.length < 10) {
      return c.json({ error: 'Invalid or empty PDF text' }, 400)
    }
    
    // AI extraction prompt
    const extractionPrompt = `Extract information from this document text and return ONLY a JSON object with these fields:
    
Document text:
${text}

Return JSON format:
{
  "type": "offer_letter" or "certificate",
  "candidateName": "full name",
  "position": "job title",
  "date": "YYYY-MM-DD",
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD",
  "stipend": number,
  "workLocation": "Work From Home" or "Office" or "Hybrid",
  "performance": "Excellent" or "Very Good" or "Good",
  "achievements": "text of achievements"
}

Extract as many fields as possible. Use null for missing fields.`

    let extractedData: any = {}
    
    // Try real AI if requested
    if (useRealAI) {
      const groqKey = c.env.GROQ_API_KEY
      
      if (groqKey) {
        try {
          const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + groqKey
            },
            body: JSON.stringify({
              model: 'llama-3.1-8b-instant',
              messages: [{
                role: 'user',
                content: extractionPrompt
              }],
              temperature: 0.3,
              max_tokens: 1000
            })
          })

          if (response.ok) {
            const data = await response.json() as any
            const content = data.choices?.[0]?.message?.content || '{}'
            
            // Try to parse JSON from AI response
            try {
              // Extract JSON from markdown code blocks if present
              const jsonMatch = content.match(/\{[\s\S]*\}/)
              if (jsonMatch) {
                extractedData = JSON.parse(jsonMatch[0])
                extractedData.aiUsed = 'groq'
              }
            } catch (e) {
              console.log('Failed to parse AI JSON response')
            }
          }
        } catch (error) {
          console.log('Groq API failed, using pattern matching')
        }
      }
    }
    
    // Fallback: Smart pattern matching
    if (!extractedData.candidateName) {
      const lines = text.split('\n').filter(l => l.trim())
      
      // Detect document type
      const lowerText = text.toLowerCase()
      extractedData.type = lowerText.includes('certificate') ? 'certificate' : 'offer_letter'
      
      // Extract name (usually after "To," or "This is to certify that")
      const namePatterns = [
        /To,?\s*\n\s*([A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s*\n/,
        /certify that\s+([A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s+has/i,
        /Dear\s+([A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?),/
      ]
      
      for (const pattern of namePatterns) {
        const match = text.match(pattern)
        if (match) {
          extractedData.candidateName = match[1].trim()
          break
        }
      }
      
      // Extract position
      const positionPatterns = [
        /(?:as|position of|role of)\s+"([^"]+)"/i,
        /(?:as|position of|role of)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,4})\s+(?:at|in)/i,
        /(?:selected as|appointed as)\s+"([^"]+)"/i
      ]
      
      for (const pattern of positionPatterns) {
        const match = text.match(pattern)
        if (match) {
          extractedData.position = match[1].trim()
          break
        }
      }
      
      // Extract dates
      const datePattern = /(\d{1,2}(?:st|nd|rd|th)?\s+(?:January|February|March|April|May|June|July|August|September|October|November|December),?\s+\d{4})/gi
      const dates = text.match(datePattern) || []
      
      if (dates.length > 0) {
        extractedData.date = dates[0]
      }
      if (dates.length > 1) {
        extractedData.startDate = dates[0]
        extractedData.endDate = dates[1]
      }
      
      // Extract stipend
      const stipendPattern = /₹\s*(\d+,?\d*)/
      const stipendMatch = text.match(stipendPattern)
      if (stipendMatch) {
        extractedData.stipend = parseInt(stipendMatch[1].replace(',', ''))
      }
      
      // Extract work location
      if (lowerText.includes('work from home') || lowerText.includes('remote')) {
        extractedData.workLocation = 'Work From Home'
      } else if (lowerText.includes('hybrid')) {
        extractedData.workLocation = 'Hybrid'
      } else if (lowerText.includes('office')) {
        extractedData.workLocation = 'Office'
      }
      
      // Extract performance (for certificates)
      if (extractedData.type === 'certificate') {
        if (lowerText.includes('excellent')) extractedData.performance = 'Excellent'
        else if (lowerText.includes('very good')) extractedData.performance = 'Very Good'
        else if (lowerText.includes('good')) extractedData.performance = 'Good'
        else extractedData.performance = 'Satisfactory'
        
        // Try to extract achievements section
        const achievementsPattern = /(?:skills|achievements|contributions)[:\s]+([^\.]+(?:\.[^\.]+){0,3})/i
        const achievementsMatch = text.match(achievementsPattern)
        if (achievementsMatch) {
          extractedData.achievements = achievementsMatch[1].trim()
        }
      }
      
      extractedData.aiUsed = 'pattern_matching'
    }
    
    return c.json({
      success: true,
      data: extractedData,
      filename: filename,
      extractedTextLength: text.length,
      message: extractedData.aiUsed === 'groq' ? 'Extracted with AI Pro' : 'Extracted with Smart Pattern Matching'
    })
    
  } catch (error) {
    console.error('PDF processing error:', error)
    return c.json({ 
      error: 'Failed to process PDF',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// AI content generation
app.post('/api/generate-content', async (c) => {
  try {
    const { prompt, type, useRealAI } = await c.req.json()
    
    // Try real AI if API keys available
    if (useRealAI) {
      const groqKey = c.env.GROQ_API_KEY
      
      if (groqKey) {
        try {
          const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + groqKey
            },
            body: JSON.stringify({
              model: 'llama-3.1-8b-instant',
              messages: [{ role: 'user', content: prompt }],
              temperature: 0.7,
              max_tokens: 500
            })
          })

          if (response.ok) {
            const data = await response.json() as any
            const content = data.choices?.[0]?.message?.content || 'Unable to generate'
            return c.json({ content, demo: false, provider: 'groq' })
          }
        } catch (error) {
          // Fall through to demo mode
        }
      }
    }
    
    // Demo mode responses
    const demoResponses: Record<string, any> = {
      'responsibilities': { content: "Video Creation and Editing, 3D Modeling and Animation, Content Development, Software Testing, Documentation, Team Collaboration" },
      'achievements': { content: "Successfully completed multiple projects with high-quality output, demonstrated proficiency in required tools, contributed to team success, showed excellent communication skills, met all deadlines with attention to detail" }
    }
    
    return c.json({ 
      content: demoResponses[type]?.content || 'Generated content',
      demo: true,
      provider: 'demo'
    })
  } catch (error) {
    return c.json({ error: 'Failed to generate', demo: true }, 500)
  }
})

// Save document with version history
app.post('/api/documents', async (c) => {
  try {
    if (!c.env.DB) {
      return c.json({ error: 'Database not configured - documents will not be saved', demo: true }, 503)
    }
    
    const { type, candidateName, position, documentData, originalPdfText, uploadFilename, extractionMethod } = await c.req.json()
    
    // Save main document
    const result = await c.env.DB.prepare(
      `INSERT INTO documents (type, candidate_name, position, document_data, original_pdf_text, upload_filename, extraction_method) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      type, 
      candidateName, 
      position, 
      JSON.stringify(documentData),
      originalPdfText || null,
      uploadFilename || null,
      extractionMethod || null
    ).run()
    
    const documentId = result.meta.last_row_id
    
    // Create first version entry
    if (documentId) {
      await c.env.DB.prepare(
        'INSERT INTO document_versions (document_id, version_number, document_data, changes_description) VALUES (?, ?, ?, ?)'
      ).bind(documentId, 1, JSON.stringify(documentData), 'Initial version').run()
    }
    
    return c.json({ success: true, id: documentId, message: 'Document saved with version history' })
  } catch (error) {
    console.error('Save document error:', error)
    return c.json({ error: 'Failed to save document', details: error instanceof Error ? error.message : 'Unknown' }, 500)
  }
})

// Get all documents
app.get('/api/documents', async (c) => {
  try {
    if (!c.env.DB) {
      return c.json({ documents: [], demo: true })
    }
    
    const { results } = await c.env.DB.prepare(
      `SELECT id, type, candidate_name, position, upload_filename, extraction_method, created_at 
       FROM documents ORDER BY created_at DESC LIMIT 100`
    ).all()
    
    return c.json({ documents: results, count: results.length })
  } catch (error) {
    return c.json({ documents: [], error: 'Failed to fetch documents' }, 500)
  }
})

// Get single document with versions
app.get('/api/documents/:id', async (c) => {
  try {
    if (!c.env.DB) {
      return c.json({ error: 'Database not configured' }, 503)
    }
    
    const id = c.req.param('id')
    
    // Get document
    const doc = await c.env.DB.prepare('SELECT * FROM documents WHERE id = ?').bind(id).first()
    
    if (!doc) {
      return c.json({ error: 'Document not found' }, 404)
    }
    
    // Get versions
    const { results: versions } = await c.env.DB.prepare(
      'SELECT * FROM document_versions WHERE document_id = ? ORDER BY version_number DESC'
    ).bind(id).all()
    
    return c.json({ document: doc, versions: versions })
  } catch (error) {
    return c.json({ error: 'Failed to fetch document' }, 500)
  }
})

// Compare two documents
app.post('/api/documents/compare', async (c) => {
  try {
    if (!c.env.DB) {
      return c.json({ error: 'Database not configured' }, 503)
    }
    
    const { originalId, modifiedId } = await c.req.json()
    
    // Get both documents
    const original = await c.env.DB.prepare('SELECT * FROM documents WHERE id = ?').bind(originalId).first()
    const modified = await c.env.DB.prepare('SELECT * FROM documents WHERE id = ?').bind(modifiedId).first()
    
    if (!original || !modified) {
      return c.json({ error: 'One or both documents not found' }, 404)
    }
    
    // Parse document data
    const originalData = JSON.parse(original.document_data as string)
    const modifiedData = JSON.parse(modified.document_data as string)
    
    // Compare fields
    const differences: any = {}
    const allKeys = new Set([...Object.keys(originalData), ...Object.keys(modifiedData)])
    
    allKeys.forEach(key => {
      if (originalData[key] !== modifiedData[key]) {
        differences[key] = {
          original: originalData[key],
          modified: modifiedData[key]
        }
      }
    })
    
    // Save comparison
    await c.env.DB.prepare(
      'INSERT INTO document_comparisons (original_document_id, modified_document_id, comparison_data) VALUES (?, ?, ?)'
    ).bind(originalId, modifiedId, JSON.stringify(differences)).run()
    
    return c.json({
      success: true,
      original: { id: originalId, name: original.candidate_name, data: originalData },
      modified: { id: modifiedId, name: modified.candidate_name, data: modifiedData },
      differences: differences,
      differenceCount: Object.keys(differences).length
    })
  } catch (error) {
    return c.json({ error: 'Comparison failed', details: error instanceof Error ? error.message : 'Unknown' }, 500)
  }
})

// Batch upload - create batch
app.post('/api/batch/create', async (c) => {
  try {
    if (!c.env.DB) {
      return c.json({ error: 'Database not configured' }, 503)
    }
    
    const { batchName, totalFiles } = await c.req.json()
    
    const result = await c.env.DB.prepare(
      'INSERT INTO batch_uploads (batch_name, total_files, status) VALUES (?, ?, ?)'
    ).bind(batchName || 'Batch ' + new Date().toISOString(), totalFiles, 'pending').run()
    
    return c.json({ success: true, batchId: result.meta.last_row_id })
  } catch (error) {
    return c.json({ error: 'Failed to create batch' }, 500)
  }
})

// Batch upload - add document to batch
app.post('/api/batch/:batchId/add', async (c) => {
  try {
    if (!c.env.DB) {
      return c.json({ error: 'Database not configured' }, 503)
    }
    
    const batchId = c.req.param('batchId')
    const { documentId, filename, status, errorMessage } = await c.req.json()
    
    await c.env.DB.prepare(
      'INSERT INTO batch_upload_documents (batch_id, document_id, filename, status, error_message) VALUES (?, ?, ?, ?, ?)'
    ).bind(batchId, documentId || null, filename, status || 'completed', errorMessage || null).run()
    
    // Update batch progress
    await c.env.DB.prepare(
      'UPDATE batch_uploads SET processed_files = processed_files + 1 WHERE id = ?'
    ).bind(batchId).run()
    
    return c.json({ success: true })
  } catch (error) {
    return c.json({ error: 'Failed to add to batch' }, 500)
  }
})

// Get batch status
app.get('/api/batch/:batchId', async (c) => {
  try {
    if (!c.env.DB) {
      return c.json({ error: 'Database not configured' }, 503)
    }
    
    const batchId = c.req.param('batchId')
    
    const batch = await c.env.DB.prepare('SELECT * FROM batch_uploads WHERE id = ?').bind(batchId).first()
    
    if (!batch) {
      return c.json({ error: 'Batch not found' }, 404)
    }
    
    const { results: documents } = await c.env.DB.prepare(
      'SELECT * FROM batch_upload_documents WHERE batch_id = ?'
    ).bind(batchId).all()
    
    return c.json({ batch, documents })
  } catch (error) {
    return c.json({ error: 'Failed to fetch batch' }, 500)
  }
})

// Homepage with navigation, hero, features, testimonials
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en" class="scroll-smooth">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Passion3D Docs - AI Document Generator</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            body {
                background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0c1629 100%);
                background-attachment: fixed;
            }
            .nav-link:hover { color: #60a5fa !important; transform: translateY(-2px); transition: all 0.3s; }
            .feature-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3); }
            .testimonial-card { transition: all 0.3s ease; }
            .testimonial-card:hover { transform: scale(1.05); }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            .animate-fadeIn { animation: fadeIn 1s ease-out; }
        </style>
    </head>
    <body class="text-white">
        <!-- Navigation -->
        <nav class="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm z-50 border-b border-blue-500/30">
            <div class="container mx-auto px-4 py-4">
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-file-alt text-blue-400 text-2xl"></i>
                        <span class="text-2xl font-bold">Passion<span class="text-blue-400">3D</span> Docs</span>
                    </div>
                    <div class="hidden md:flex space-x-6">
                        <a href="#home" class="nav-link text-gray-300">Home</a>
                        <a href="#features" class="nav-link text-gray-300">Features</a>
                        <a href="#templates" class="nav-link text-gray-300">Templates</a>
                        <a href="#upload" class="nav-link text-gray-300">Upload & Edit</a>
                        <a href="#testimonials" class="nav-link text-gray-300">Testimonials</a>
                        <a href="#about" class="nav-link text-gray-300">About</a>
                    </div>
                    <div class="flex space-x-3">
                        <a href="/offer-letter" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition">
                            <i class="fas fa-file-contract mr-2"></i>Create Offer Letter
                        </a>
                        <button class="md:hidden text-2xl"><i class="fas fa-bars"></i></button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section id="home" class="pt-32 pb-20 animate-fadeIn">
            <div class="container mx-auto px-4 text-center">
                <div class="max-w-4xl mx-auto">
                    <h1 class="text-6xl font-bold mb-6 leading-tight">
                        AI-Powered Document<br/>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            Generation Platform
                        </span>
                    </h1>
                    <p class="text-xl text-gray-300 mb-8 leading-relaxed">
                        Create professional offer letters and certificates in seconds with AI assistance. 
                        20+ pre-built templates, smart editing, and instant PDF generation.
                    </p>
                    <div class="flex justify-center space-x-4 mb-12">
                        <a href="#upload" class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-blue-500/50 transition-all">
                            <i class="fas fa-upload mr-2"></i>Upload & Edit Document
                        </a>
                        <a href="/offer-letter" class="bg-gray-800 hover:bg-gray-700 px-8 py-4 rounded-xl text-lg font-semibold border border-blue-500/50 transition-all">
                            <i class="fas fa-plus mr-2"></i>Create New
                        </a>
                    </div>
                    
                    <!-- Stats -->
                    <div class="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                        <div class="bg-gray-900/50 border border-blue-500/30 rounded-xl p-4">
                            <div class="text-3xl font-bold text-blue-400">20+</div>
                            <div class="text-sm text-gray-400">Templates</div>
                        </div>
                        <div class="bg-gray-900/50 border border-blue-500/30 rounded-xl p-4">
                            <div class="text-3xl font-bold text-purple-400">AI</div>
                            <div class="text-sm text-gray-400">Powered</div>
                        </div>
                        <div class="bg-gray-900/50 border border-blue-500/30 rounded-xl p-4">
                            <div class="text-3xl font-bold text-green-400">30s</div>
                            <div class="text-sm text-gray-400">Generation</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section id="features" class="py-20 bg-gray-900/30">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold mb-4">Powerful Features</h2>
                    <p class="text-gray-400 text-lg">Everything you need to create professional documents</p>
                </div>
                
                <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <!-- Feature 1 -->
                    <div class="feature-card bg-gradient-to-br from-gray-900 to-gray-800 border border-blue-500/30 rounded-2xl p-8 transition-all">
                        <div class="text-5xl mb-4 text-blue-400">
                            <i class="fas fa-robot"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-3">AI-Powered Generation</h3>
                        <p class="text-gray-400">Smart AI understands your requirements and generates professional content instantly</p>
                    </div>
                    
                    <!-- Feature 2 -->
                    <div class="feature-card bg-gradient-to-br from-gray-900 to-gray-800 border border-purple-500/30 rounded-2xl p-8 transition-all">
                        <div class="text-5xl mb-4 text-purple-400">
                            <i class="fas fa-upload"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-3">Upload & Edit</h3>
                        <p class="text-gray-400">Upload existing PDFs and let AI extract and modify content intelligently</p>
                    </div>
                    
                    <!-- Feature 3 -->
                    <div class="feature-card bg-gradient-to-br from-gray-900 to-gray-800 border border-green-500/30 rounded-2xl p-8 transition-all">
                        <div class="text-5xl mb-4 text-green-400">
                            <i class="fas fa-layer-group"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-3">20+ Templates</h3>
                        <p class="text-gray-400">Pre-built professional templates for Creative, Technical, and Business roles</p>
                    </div>
                    
                    <!-- Feature 4 -->
                    <div class="feature-card bg-gradient-to-br from-gray-900 to-gray-800 border border-yellow-500/30 rounded-2xl p-8 transition-all">
                        <div class="text-5xl mb-4 text-yellow-400">
                            <i class="fas fa-bolt"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-3">Lightning Fast</h3>
                        <p class="text-gray-400">Generate complete documents in under 30 seconds with real-time preview</p>
                    </div>
                    
                    <!-- Feature 5 -->
                    <div class="feature-card bg-gradient-to-br from-gray-900 to-gray-800 border border-red-500/30 rounded-2xl p-8 transition-all">
                        <div class="text-5xl mb-4 text-red-400">
                            <i class="fas fa-file-pdf"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-3">PDF Export</h3>
                        <p class="text-gray-400">One-click PDF export with professional formatting, ready to print or email</p>
                    </div>
                    
                    <!-- Feature 6 -->
                    <div class="feature-card bg-gradient-to-br from-gray-900 to-gray-800 border border-indigo-500/30 rounded-2xl p-8 transition-all">
                        <div class="text-5xl mb-4 text-indigo-400">
                            <i class="fas fa-mobile-alt"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-3">Mobile Friendly</h3>
                        <p class="text-gray-400">Fully responsive design works perfectly on desktop, tablet, and mobile</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Templates Section -->
        <section id="templates" class="py-20">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold mb-4">20+ Professional Templates</h2>
                    <p class="text-gray-400 text-lg">Choose from our curated collection</p>
                </div>
                
                <div class="max-w-4xl mx-auto">
                    <!-- Creative Templates -->
                    <div class="mb-8">
                        <h3 class="text-2xl font-bold mb-4 text-blue-400">
                            <i class="fas fa-palette mr-2"></i>Creative Roles (7 Templates)
                        </h3>
                        <div class="grid md:grid-cols-2 gap-4">
                            <div class="bg-gray-900/50 border border-blue-500/30 rounded-xl p-4 hover:border-blue-400 transition">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <div class="font-semibold">Video Editor</div>
                                        <div class="text-sm text-gray-400">₹5,000 • Hybrid</div>
                                    </div>
                                    <i class="fas fa-video text-blue-400"></i>
                                </div>
                            </div>
                            <div class="bg-gray-900/50 border border-blue-500/30 rounded-xl p-4 hover:border-blue-400 transition">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <div class="font-semibold">3D Artist</div>
                                        <div class="text-sm text-gray-400">₹6,000 • Office</div>
                                    </div>
                                    <i class="fas fa-cube text-purple-400"></i>
                                </div>
                            </div>
                            <div class="bg-gray-900/50 border border-blue-500/30 rounded-xl p-4 hover:border-blue-400 transition">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <div class="font-semibold">UI/UX Designer</div>
                                        <div class="text-sm text-gray-400">₹6,000 • Hybrid</div>
                                    </div>
                                    <i class="fas fa-paint-brush text-pink-400"></i>
                                </div>
                            </div>
                            <div class="bg-gray-900/50 border border-blue-500/30 rounded-xl p-4 hover:border-blue-400 transition">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <div class="font-semibold">+4 More Creative Roles</div>
                                        <div class="text-sm text-gray-400">Animator, Photographer, etc.</div>
                                    </div>
                                    <i class="fas fa-ellipsis-h text-gray-400"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Technical Templates -->
                    <div class="mb-8">
                        <h3 class="text-2xl font-bold mb-4 text-purple-400">
                            <i class="fas fa-code mr-2"></i>Technical Roles (9 Templates)
                        </h3>
                        <div class="grid md:grid-cols-2 gap-4">
                            <div class="bg-gray-900/50 border border-purple-500/30 rounded-xl p-4 hover:border-purple-400 transition">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <div class="font-semibold">Frontend Developer</div>
                                        <div class="text-sm text-gray-400">₹7,000 • Hybrid</div>
                                    </div>
                                    <i class="fas fa-laptop-code text-blue-400"></i>
                                </div>
                            </div>
                            <div class="bg-gray-900/50 border border-purple-500/30 rounded-xl p-4 hover:border-purple-400 transition">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <div class="font-semibold">ML Engineer</div>
                                        <div class="text-sm text-gray-400">₹9,000 • Hybrid (Highest!)</div>
                                    </div>
                                    <i class="fas fa-brain text-green-400"></i>
                                </div>
                            </div>
                            <div class="bg-gray-900/50 border border-purple-500/30 rounded-xl p-4 hover:border-purple-400 transition">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <div class="font-semibold">Full Stack Developer</div>
                                        <div class="text-sm text-gray-400">₹8,000 • Hybrid</div>
                                    </div>
                                    <i class="fas fa-server text-purple-400"></i>
                                </div>
                            </div>
                            <div class="bg-gray-900/50 border border-purple-500/30 rounded-xl p-4 hover:border-purple-400 transition">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <div class="font-semibold">+6 More Technical Roles</div>
                                        <div class="text-sm text-gray-400">Backend, Mobile, DevOps, etc.</div>
                                    </div>
                                    <i class="fas fa-ellipsis-h text-gray-400"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Business Templates -->
                    <div class="mb-8">
                        <h3 class="text-2xl font-bold mb-4 text-green-400">
                            <i class="fas fa-briefcase mr-2"></i>Business Roles (4 Templates)
                        </h3>
                        <div class="grid md:grid-cols-2 gap-4">
                            <div class="bg-gray-900/50 border border-green-500/30 rounded-xl p-4 hover:border-green-400 transition">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <div class="font-semibold">Digital Marketing</div>
                                        <div class="text-sm text-gray-400">₹5,000 • WFH</div>
                                    </div>
                                    <i class="fas fa-bullhorn text-orange-400"></i>
                                </div>
                            </div>
                            <div class="bg-gray-900/50 border border-green-500/30 rounded-xl p-4 hover:border-green-400 transition">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <div class="font-semibold">Business Analyst</div>
                                        <div class="text-sm text-gray-400">₹6,000 • Hybrid</div>
                                    </div>
                                    <i class="fas fa-chart-line text-green-400"></i>
                                </div>
                            </div>
                            <div class="bg-gray-900/50 border border-green-500/30 rounded-xl p-4 hover:border-green-400 transition">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <div class="font-semibold">+2 More Business Roles</div>
                                        <div class="text-sm text-gray-400">HR, Sales</div>
                                    </div>
                                    <i class="fas fa-ellipsis-h text-gray-400"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="text-center mt-8">
                        <a href="/offer-letter" class="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-xl font-semibold shadow-lg transition">
                            <i class="fas fa-arrow-right mr-2"></i>Explore All Templates
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Upload & Edit Section -->
        <section id="upload" class="py-20 bg-gray-900/30">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold mb-4">Upload & Edit Existing Documents</h2>
                    <p class="text-gray-400 text-lg">Let AI extract and modify your existing PDFs intelligently</p>
                </div>
                
                <div class="max-w-4xl mx-auto">
                    <div class="bg-gradient-to-br from-gray-900 to-gray-800 border border-blue-500 rounded-2xl p-8 shadow-2xl">
                        <div class="text-center mb-8">
                            <div class="text-6xl mb-4 text-blue-400">
                                <i class="fas fa-cloud-upload-alt"></i>
                            </div>
                            <h3 class="text-2xl font-bold mb-2">Upload Your PDF Document</h3>
                            <p class="text-gray-400">AI will extract content and let you edit it</p>
                        </div>
                        
                        <div class="space-y-6">
                            <!-- Upload Area -->
                            <div id="uploadArea" class="border-2 border-dashed border-blue-500/50 rounded-xl p-12 text-center hover:border-blue-400 hover:bg-blue-900/10 transition cursor-pointer">
                                <input type="file" id="pdfUpload" accept="application/pdf" class="hidden" />
                                <i class="fas fa-file-upload text-5xl text-blue-400 mb-4"></i>
                                <p class="text-lg mb-2">Click to upload or drag and drop</p>
                                <p class="text-sm text-gray-400">PDF files only • Max 10MB</p>
                            </div>
                            
                            <!-- Upload Status -->
                            <div id="uploadStatus" class="hidden">
                                <div class="bg-blue-900/30 border border-blue-500 rounded-xl p-4">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center space-x-3">
                                            <i class="fas fa-file-pdf text-2xl text-blue-400"></i>
                                            <div>
                                                <div id="fileName" class="font-semibold"></div>
                                                <div id="fileSize" class="text-sm text-gray-400"></div>
                                            </div>
                                        </div>
                                        <button id="removeFile" class="text-red-400 hover:text-red-300">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                    <div class="mt-4">
                                        <div class="bg-gray-700 rounded-full h-2">
                                            <div id="uploadProgress" class="bg-blue-500 h-2 rounded-full transition-all" style="width: 0%"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Instructions -->
                            <div class="bg-purple-900/20 border border-purple-500/30 rounded-xl p-6">
                                <h4 class="font-semibold mb-3 flex items-center">
                                    <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
                                    How it works:
                                </h4>
                                <ol class="space-y-2 text-sm text-gray-300">
                                    <li><span class="text-blue-400 font-bold">1.</span> Upload your existing offer letter or certificate PDF</li>
                                    <li><span class="text-blue-400 font-bold">2.</span> AI extracts all text and data intelligently</li>
                                    <li><span class="text-blue-400 font-bold">3.</span> Edit any field - name, position, dates, amounts</li>
                                    <li><span class="text-blue-400 font-bold">4.</span> Download updated PDF with your changes</li>
                                </ol>
                            </div>
                            
                            <button id="processButton" class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-4 rounded-xl font-semibold shadow-lg transition disabled:opacity-50" disabled>
                                <i class="fas fa-magic mr-2"></i>Process Document with AI
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonials Section -->
        <section id="testimonials" class="py-20">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold mb-4">What Our Users Say</h2>
                    <p class="text-gray-400 text-lg">Trusted by HR teams and companies worldwide</p>
                </div>
                
                <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <!-- Testimonial 1 -->
                    <div class="testimonial-card bg-gradient-to-br from-gray-900 to-gray-800 border border-blue-500/30 rounded-2xl p-6">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold mr-3">
                                A
                            </div>
                            <div>
                                <div class="font-semibold">Ananya Sharma</div>
                                <div class="text-sm text-gray-400">HR Manager, TechCorp</div>
                            </div>
                        </div>
                        <div class="text-yellow-400 mb-3">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <p class="text-gray-300 italic">"Incredible tool! We used to spend hours creating offer letters. Now it takes just 30 seconds. The AI templates are spot-on!"</p>
                    </div>
                    
                    <!-- Testimonial 2 -->
                    <div class="testimonial-card bg-gradient-to-br from-gray-900 to-gray-800 border border-purple-500/30 rounded-2xl p-6">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-xl font-bold mr-3">
                                R
                            </div>
                            <div>
                                <div class="font-semibold">Rajesh Kumar</div>
                                <div class="text-sm text-gray-400">Founder, StartupHub</div>
                            </div>
                        </div>
                        <div class="text-yellow-400 mb-3">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <p class="text-gray-300 italic">"The upload and edit feature is a game-changer! Uploaded our old template and modified it instantly. Saved us days of work!"</p>
                    </div>
                    
                    <!-- Testimonial 3 -->
                    <div class="testimonial-card bg-gradient-to-br from-gray-900 to-gray-800 border border-green-500/30 rounded-2xl p-6">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-xl font-bold mr-3">
                                P
                            </div>
                            <div>
                                <div class="font-semibold">Priya Patel</div>
                                <div class="text-sm text-gray-400">CEO, DesignStudio</div>
                            </div>
                        </div>
                        <div class="text-yellow-400 mb-3">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <p class="text-gray-300 italic">"Professional, fast, and incredibly easy to use. The 20 templates cover all our needs. Highly recommend for any growing company!"</p>
                    </div>
                    
                    <!-- Testimonial 4 -->
                    <div class="testimonial-card bg-gradient-to-br from-gray-900 to-gray-800 border border-yellow-500/30 rounded-2xl p-6">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-xl font-bold mr-3">
                                V
                            </div>
                            <div>
                                <div class="font-semibold">Vikram Singh</div>
                                <div class="text-sm text-gray-400">Operations Lead, MediaCo</div>
                            </div>
                        </div>
                        <div class="text-yellow-400 mb-3">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <p class="text-gray-300 italic">"The AI understands exactly what we need. We create certificates for 50+ interns every quarter. This tool is a lifesaver!"</p>
                    </div>
                    
                    <!-- Testimonial 5 -->
                    <div class="testimonial-card bg-gradient-to-br from-gray-900 to-gray-800 border border-red-500/30 rounded-2xl p-6">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-xl font-bold mr-3">
                                M
                            </div>
                            <div>
                                <div class="font-semibold">Meera Joshi</div>
                                <div class="text-sm text-gray-400">Talent Acquisition, FinTech</div>
                            </div>
                        </div>
                        <div class="text-yellow-400 mb-3">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <p class="text-gray-300 italic">"Clean interface, powerful features. The PDF export is perfect. No more formatting headaches!"</p>
                    </div>
                    
                    <!-- Testimonial 6 -->
                    <div class="testimonial-card bg-gradient-to-br from-gray-900 to-gray-800 border border-indigo-500/30 rounded-2xl p-6">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-xl font-bold mr-3">
                                S
                            </div>
                            <div>
                                <div class="font-semibold">Sahil Mehta</div>
                                <div class="text-sm text-gray-400">Director, EduTech Solutions</div>
                            </div>
                        </div>
                        <div class="text-yellow-400 mb-3">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <p class="text-gray-300 italic">"Best document generator I've used. The mobile app works flawlessly. Create docs on the go!"</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section id="about" class="py-20 bg-gray-900/30">
            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto">
                    <div class="text-center mb-12">
                        <h2 class="text-4xl font-bold mb-4">About Passion 3D World</h2>
                        <p class="text-gray-400 text-lg">Innovation in Document Automation</p>
                    </div>
                    
                    <div class="bg-gradient-to-br from-gray-900 to-gray-800 border border-blue-500 rounded-2xl p-8 mb-8">
                        <div class="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 class="text-2xl font-bold mb-4">Our Mission</h3>
                                <p class="text-gray-300 mb-4">
                                    At Passion 3D World, we believe document creation should be instant, intelligent, and effortless. 
                                    Our AI-powered platform helps companies save time and create professional documents in seconds.
                                </p>
                                <p class="text-gray-300">
                                    Trusted by HR teams, startups, and enterprises worldwide to automate their document workflows.
                                </p>
                            </div>
                            <div class="text-5xl text-blue-400 text-center">
                                <i class="fas fa-award mb-4"></i>
                                <div class="text-lg text-gray-300">ISO Certified</div>
                                <div class="text-sm text-gray-400">Quality Assured</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="grid md:grid-cols-3 gap-6 text-center">
                        <div class="bg-gray-900/50 border border-blue-500/30 rounded-xl p-6">
                            <div class="text-3xl text-blue-400 mb-2">
                                <i class="fas fa-users"></i>
                            </div>
                            <div class="text-2xl font-bold mb-1">1000+</div>
                            <div class="text-gray-400">Active Users</div>
                        </div>
                        <div class="bg-gray-900/50 border border-purple-500/30 rounded-xl p-6">
                            <div class="text-3xl text-purple-400 mb-2">
                                <i class="fas fa-file-alt"></i>
                            </div>
                            <div class="text-2xl font-bold mb-1">50K+</div>
                            <div class="text-gray-400">Documents Created</div>
                        </div>
                        <div class="bg-gray-900/50 border border-green-500/30 rounded-xl p-6">
                            <div class="text-3xl text-green-400 mb-2">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="text-2xl font-bold mb-1">10K+</div>
                            <div class="text-gray-400">Hours Saved</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-950 border-t border-blue-500/30 py-12">
            <div class="container mx-auto px-4">
                <div class="grid md:grid-cols-4 gap-8 mb-8">
                    <!-- Company Info -->
                    <div>
                        <div class="flex items-center space-x-2 mb-4">
                            <i class="fas fa-file-alt text-blue-400 text-2xl"></i>
                            <span class="text-xl font-bold">Passion<span class="text-blue-400">3D</span></span>
                        </div>
                        <p class="text-gray-400 text-sm">
                            AI-powered document generation platform for modern businesses.
                        </p>
                    </div>
                    
                    <!-- Quick Links -->
                    <div>
                        <h4 class="font-bold mb-4">Quick Links</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="#home" class="text-gray-400 hover:text-blue-400">Home</a></li>
                            <li><a href="#features" class="text-gray-400 hover:text-blue-400">Features</a></li>
                            <li><a href="#templates" class="text-gray-400 hover:text-blue-400">Templates</a></li>
                            <li><a href="#upload" class="text-gray-400 hover:text-blue-400">Upload</a></li>
                        </ul>
                    </div>
                    
                    <!-- Resources -->
                    <div>
                        <h4 class="font-bold mb-4">Resources</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="/offer-letter" class="text-gray-400 hover:text-blue-400">Create Offer Letter</a></li>
                            <li><a href="/certificate" class="text-gray-400 hover:text-blue-400">Create Certificate</a></li>
                            <li><a href="#testimonials" class="text-gray-400 hover:text-blue-400">Testimonials</a></li>
                            <li><a href="#about" class="text-gray-400 hover:text-blue-400">About Us</a></li>
                        </ul>
                    </div>
                    
                    <!-- Contact -->
                    <div>
                        <h4 class="font-bold mb-4">Contact</h4>
                        <ul class="space-y-2 text-sm text-gray-400">
                            <li><i class="fas fa-envelope mr-2 text-blue-400"></i>passion3dworld@gmail.com</li>
                            <li><i class="fas fa-phone mr-2 text-blue-400"></i>+91 9137361474</li>
                            <li><i class="fas fa-map-marker-alt mr-2 text-blue-400"></i>Mumbai, India</li>
                        </ul>
                        <div class="flex space-x-4 mt-4">
                            <a href="#" class="text-gray-400 hover:text-blue-400 text-xl"><i class="fab fa-linkedin"></i></a>
                            <a href="#" class="text-gray-400 hover:text-blue-400 text-xl"><i class="fab fa-twitter"></i></a>
                            <a href="#" class="text-gray-400 hover:text-blue-400 text-xl"><i class="fab fa-facebook"></i></a>
                        </div>
                    </div>
                </div>
                
                <div class="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                    <p>&copy; 2025 Passion 3D World. All rights reserved. | Powered by AI</p>
                </div>
            </div>
        </footer>

        <!-- PDF.js Library -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
        <script>
            // Configure PDF.js worker
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            
            const uploadArea = document.getElementById('uploadArea');
            const pdfUpload = document.getElementById('pdfUpload');
            const uploadStatus = document.getElementById('uploadStatus');
            const processButton = document.getElementById('processButton');
            const removeFile = document.getElementById('removeFile');
            
            let currentFile = null;
            let extractedText = '';
            
            // Click to upload
            uploadArea.addEventListener('click', () => pdfUpload.click());
            
            // File selected
            pdfUpload.addEventListener('change', handleFileSelect);
            
            // Drag and drop
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('border-blue-400', 'bg-blue-900/20');
            });
            
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('border-blue-400', 'bg-blue-900/20');
            });
            
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('border-blue-400', 'bg-blue-900/20');
                const file = e.dataTransfer.files[0];
                if (file && file.type === 'application/pdf') {
                    handleFile(file);
                }
            });
            
            function handleFileSelect(e) {
                const file = e.target.files[0];
                if (file) handleFile(file);
            }
            
            async function handleFile(file) {
                if (file.size > 10 * 1024 * 1024) {
                    alert('File too large! Maximum size is 10MB.');
                    return;
                }
                
                currentFile = file;
                document.getElementById('fileName').textContent = file.name;
                document.getElementById('fileSize').textContent = (file.size / 1024 / 1024).toFixed(2) + ' MB';
                uploadStatus.classList.remove('hidden');
                uploadArea.classList.add('hidden');
                
                // Show upload progress
                let progress = 0;
                const interval = setInterval(() => {
                    progress += 20;
                    document.getElementById('uploadProgress').style.width = progress + '%';
                    if (progress >= 100) {
                        clearInterval(interval);
                        extractPDFText(file);
                    }
                }, 200);
            }
            
            async function extractPDFText(file) {
                try {
                    const arrayBuffer = await file.arrayBuffer();
                    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                    
                    let fullText = '';
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        const pageText = textContent.items.map(item => item.str).join(' ');
                        fullText += pageText + '\\n';
                    }
                    
                    extractedText = fullText;
                    processButton.disabled = false;
                    
                    // Update button text to show ready
                    processButton.innerHTML = '<i class="fas fa-check-circle mr-2"></i>PDF Loaded - Process with AI';
                    processButton.classList.add('animate-pulse');
                    
                } catch (error) {
                    console.error('PDF extraction error:', error);
                    alert('Failed to extract text from PDF. Please try another file.');
                    removeFileHandler();
                }
            }
            
            removeFile.addEventListener('click', removeFileHandler);
            
            function removeFileHandler() {
                uploadStatus.classList.add('hidden');
                uploadArea.classList.remove('hidden');
                pdfUpload.value = '';
                processButton.disabled = true;
                processButton.innerHTML = '<i class="fas fa-magic mr-2"></i>Process Document with AI';
                processButton.classList.remove('animate-pulse');
                document.getElementById('uploadProgress').style.width = '0%';
                currentFile = null;
                extractedText = '';
            }
            
            processButton.addEventListener('click', async () => {
                if (!extractedText || !currentFile) {
                    alert('Please upload a PDF first');
                    return;
                }
                
                const originalHTML = processButton.innerHTML;
                processButton.disabled = true;
                processButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>AI Processing...';
                
                try {
                    const response = await fetch('/api/process-pdf', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            text: extractedText,
                            filename: currentFile.name,
                            useRealAI: true // Try AI first, fallback to pattern matching
                        })
                    });
                    
                    const result = await response.json();
                    
                    if (result.success) {
                        // Store extracted data in sessionStorage
                        sessionStorage.setItem('extractedData', JSON.stringify(result.data));
                        sessionStorage.setItem('extractionMessage', result.message);
                        
                        // Redirect to appropriate page based on document type
                        if (result.data.type === 'certificate') {
                            window.location.href = '/certificate?from=upload';
                        } else {
                            window.location.href = '/offer-letter?from=upload';
                        }
                    } else {
                        alert('Failed to process PDF: ' + (result.error || 'Unknown error'));
                        processButton.disabled = false;
                        processButton.innerHTML = originalHTML;
                    }
                } catch (error) {
                    console.error('Processing error:', error);
                    alert('Failed to process document. Please try again.');
                    processButton.disabled = false;
                    processButton.innerHTML = originalHTML;
                }
            });
        </script>
    </body>
    </html>
  `)
})

// Offer Letter Generator Page
app.get('/offer-letter', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Offer Letter Generator</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
        <style>
            @media print {
                .no-print { display: none !important; }
                .print-content { margin: 0; padding: 40px; page-break-inside: avoid; }
                body { background: white; }
            }
            body {
                background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0c1629 100%);
            }
            input, select, textarea {
                background-color: #1e293b;
                color: white;
                border-color: #475569;
            }
            input:focus, select:focus, textarea:focus {
                outline: none;
                border-color: #3b82f6;
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            }
            input::placeholder, textarea::placeholder {
                color: #64748b;
            }
        </style>
    </head>
    <body class="min-h-screen">
        <div class="no-print">
            <div class="bg-black border-b border-blue-500 shadow-lg shadow-blue-500/20 py-4 px-6">
                <div class="container mx-auto flex justify-between items-center">
                    <div>
                        <a href="/" class="text-blue-400 hover:text-blue-300 transition-colors"><i class="fas fa-arrow-left mr-2"></i>Back to Home</a>
                    </div>
                    <h1 class="text-2xl font-bold text-white">
                        <i class="fas fa-robot text-blue-400 mr-2"></i>AI Offer Letter Generator
                    </h1>
                    <div></div>
                </div>
            </div>
        </div>

        <div class="container mx-auto px-4 py-8">
            <div class="grid lg:grid-cols-2 gap-8">
                <!-- Form Section -->
                <div class="no-print bg-gradient-to-br from-gray-900 to-gray-800 border border-blue-500 rounded-lg shadow-2xl shadow-blue-500/20 p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-2xl font-bold text-white"><i class="fas fa-edit mr-2 text-blue-400"></i>Fill Details</h2>
                        <div class="bg-blue-600 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                            <i class="fas fa-sparkles mr-1"></i>AI Powered
                        </div>
                    </div>
                    
                    <form id="offerForm" class="space-y-4">
                        <div class="border-b border-gray-700 pb-4">
                            <h3 class="text-lg font-semibold text-blue-400 mb-3">
                                <i class="fas fa-layer-group mr-1"></i>Smart Templates
                            </h3>
                            <div class="space-y-3">
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-1">
                                        Choose a Pre-built Template
                                    </label>
                                    <select id="templateSelector" onchange="applyTemplate()" class="w-full px-3 py-2 border rounded-lg">
                                        <option value="">-- Select Template (20 Available) --</option>
                                        
                                        <optgroup label="🎨 Creative Roles">
                                            <option value="video-editor">Video Editor (₹5K, Hybrid)</option>
                                            <option value="3d-artist">3D Artist (₹6K, Office)</option>
                                            <option value="content-creator">Content Creator (₹4.5K, WFH)</option>
                                            <option value="graphic-designer">Graphic Designer (₹4.5K, Hybrid)</option>
                                            <option value="ui-ux-designer">UI/UX Designer (₹6K, Hybrid)</option>
                                            <option value="animator">Animator (₹5.5K, Office)</option>
                                            <option value="photographer">Photographer (₹4K, Hybrid)</option>
                                        </optgroup>
                                        
                                        <optgroup label="💻 Technical Roles">
                                            <option value="software-tester">Software Tester (₹4K, WFH)</option>
                                            <option value="rnd-generalist">R&D Generalist (₹5.5K, Hybrid)</option>
                                            <option value="frontend-dev">Frontend Developer (₹7K, Hybrid)</option>
                                            <option value="backend-dev">Backend Developer (₹7.5K, WFH)</option>
                                            <option value="fullstack-dev">Full Stack Developer (₹8K, Hybrid)</option>
                                            <option value="mobile-dev">Mobile App Developer (₹7.5K, Hybrid)</option>
                                            <option value="devops">DevOps Engineer (₹8K, WFH)</option>
                                            <option value="data-analyst">Data Analyst (₹6.5K, Hybrid)</option>
                                            <option value="ml-engineer">ML Engineer (₹9K, Hybrid)</option>
                                        </optgroup>
                                        
                                        <optgroup label="📊 Business Roles">
                                            <option value="digital-marketing">Digital Marketing (₹5K, WFH)</option>
                                            <option value="business-analyst">Business Analyst (₹6K, Hybrid)</option>
                                            <option value="hr-intern">HR Specialist (₹4K, Office)</option>
                                            <option value="sales-intern">Sales Representative (₹4.5K, Hybrid)</option>
                                        </optgroup>
                                    </select>
                                    <p class="mt-1 text-xs text-gray-400">
                                        <i class="fas fa-info-circle mr-1"></i>
                                        Templates auto-fill position, stipend, responsibilities & location
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="border-b border-gray-700 pb-4">
                            <h3 class="text-lg font-semibold text-blue-400 mb-3">
                                <i class="fas fa-robot mr-1"></i>Quick AI Generation
                            </h3>
                            <div class="space-y-3">
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-1">
                                        Describe the Position (AI will auto-fill)
                                    </label>
                                    <textarea id="aiPrompt" class="w-full px-3 py-2 border rounded-lg" rows="2" placeholder="e.g., R&D Intern for video editing, 6 months, ₹5000 stipend, work from home"></textarea>
                                </div>
                                <div class="grid grid-cols-2 gap-2">
                                    <button type="button" onclick="generateWithAI(false)" class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                                        <i class="fas fa-magic mr-2"></i>Smart Auto-Fill
                                    </button>
                                    <button type="button" onclick="generateWithAI(true)" class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                                        <i class="fas fa-brain mr-2"></i>AI Pro Mode
                                    </button>
                                </div>
                                <p class="text-xs text-gray-400 text-center">
                                    <i class="fas fa-info-circle mr-1"></i>
                                    Smart: Fast pattern matching | Pro: Real AI (requires API key)
                                </p>
                            </div>
                        </div>
                        
                        <div class="border-b border-gray-700 pb-4">
                            <h3 class="text-lg font-semibold text-blue-400 mb-3">Document Details</h3>
                            <div class="space-y-3">
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-1">Date</label>
                                    <input type="date" id="date" class="w-full px-3 py-2 border rounded-lg" required>
                                </div>
                            </div>
                        </div>

                        <div class="border-b border-gray-700 pb-4">
                            <h3 class="text-lg font-semibold text-blue-400 mb-3">Candidate Information</h3>
                            <div class="space-y-3">
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                                    <input type="text" id="candidateName" class="w-full px-3 py-2 border rounded-lg" required>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-1">Position</label>
                                    <input type="text" id="position" class="w-full px-3 py-2 border rounded-lg" value="Research and Development Intern" required>
                                </div>
                            </div>
                        </div>

                        <div class="border-b border-gray-700 pb-4">
                            <h3 class="text-lg font-semibold text-blue-400 mb-3">Internship Period</h3>
                            <div class="grid grid-cols-2 gap-3">
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
                                    <input type="date" id="startDate" class="w-full px-3 py-2 border rounded-lg" required>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-1">End Date</label>
                                    <input type="date" id="endDate" class="w-full px-3 py-2 border rounded-lg" required>
                                </div>
                            </div>
                            <div class="mt-3">
                                <label class="block text-sm font-medium text-gray-300 mb-1">Probation Period (months)</label>
                                <input type="number" id="probationMonths" class="w-full px-3 py-2 border rounded-lg" value="3" min="1" required>
                            </div>
                        </div>

                        <div class="border-b border-gray-700 pb-4">
                            <h3 class="text-lg font-semibold text-blue-400 mb-3">Work Details</h3>
                            <div class="space-y-3">
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-1">Work Location</label>
                                    <select id="workLocation" class="w-full px-3 py-2 border rounded-lg">
                                        <option value="Work From Home">Work From Home</option>
                                        <option value="Office">Office</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-1">Working Hours</label>
                                    <input type="text" id="workingHours" class="w-full px-3 py-2 border rounded-lg" value="Flexible and Part-time (8 hrs/day)">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-1">Monthly Stipend (₹)</label>
                                    <input type="number" id="stipend" class="w-full px-3 py-2 border rounded-lg" value="3000" min="0" required>
                                </div>
                            </div>
                        </div>

                        <div class="pt-4">
                            <button type="submit" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg shadow-blue-600/50">
                                <i class="fas fa-sync mr-2"></i>Generate Preview
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Preview Section -->
                <div>
                    <div class="no-print bg-gradient-to-br from-gray-900 to-gray-800 border border-blue-500 rounded-lg shadow-2xl shadow-blue-500/20 p-4 mb-4">
                        <div class="flex gap-3">
                            <button onclick="downloadPDF()" class="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-lg shadow-blue-600/30">
                                <i class="fas fa-download mr-2"></i>Download PDF
                            </button>
                            <button onclick="window.print()" class="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                                <i class="fas fa-print mr-2"></i>Print
                            </button>
                        </div>
                    </div>

                    <div id="documentPreview" class="bg-white rounded-lg shadow-2xl shadow-blue-500/10 p-8 print-content" style="min-height: 600px;">
                        <div class="text-center text-gray-400 py-20">
                            <i class="fas fa-file-alt text-6xl mb-4"></i>
                            <p class="text-xl">Fill the form to generate preview</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script>
            // Set today's date as default
            document.getElementById('date').valueAsDate = new Date();
            document.getElementById('startDate').valueAsDate = new Date();
            
            // Set end date to one year from now
            const endDate = new Date();
            endDate.setFullYear(endDate.getFullYear() + 1);
            document.getElementById('endDate').valueAsDate = endDate;
            
            // Check if coming from PDF upload
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('from') === 'upload') {
                const extractedData = sessionStorage.getItem('extractedData');
                const extractionMessage = sessionStorage.getItem('extractionMessage');
                
                if (extractedData) {
                    try {
                        const data = JSON.parse(extractedData);
                        
                        // Pre-fill form with extracted data
                        if (data.candidateName) document.getElementById('candidateName').value = data.candidateName;
                        if (data.position) document.getElementById('position').value = data.position;
                        if (data.stipend) document.getElementById('stipend').value = data.stipend;
                        if (data.workLocation) document.getElementById('workLocation').value = data.workLocation;
                        
                        // Parse and set dates
                        if (data.date) {
                            try {
                                const parsedDate = new Date(data.date);
                                if (!isNaN(parsedDate.getTime())) {
                                    document.getElementById('date').valueAsDate = parsedDate;
                                }
                            } catch (e) {}
                        }
                        
                        if (data.startDate) {
                            try {
                                const parsedDate = new Date(data.startDate);
                                if (!isNaN(parsedDate.getTime())) {
                                    document.getElementById('startDate').valueAsDate = parsedDate;
                                }
                            } catch (e) {}
                        }
                        
                        if (data.endDate) {
                            try {
                                const parsedDate = new Date(data.endDate);
                                if (!isNaN(parsedDate.getTime())) {
                                    document.getElementById('endDate').valueAsDate = parsedDate;
                                }
                            } catch (e) {}
                        }
                        
                        // Show success message
                        if (extractionMessage) {
                            const banner = document.createElement('div');
                            banner.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse';
                            banner.innerHTML = '<i class="fas fa-check-circle mr-2"></i>' + extractionMessage + ' - Review and edit below';
                            document.body.appendChild(banner);
                            setTimeout(() => banner.remove(), 5000);
                        }
                        
                        // Clear session storage
                        sessionStorage.removeItem('extractedData');
                        sessionStorage.removeItem('extractionMessage');
                        
                        // Auto-generate preview
                        setTimeout(() => {
                            generateDocument();
                        }, 500);
                        
                    } catch (e) {
                        console.error('Failed to parse extracted data:', e);
                    }
                }
            }

            document.getElementById('offerForm').addEventListener('submit', function(e) {
                e.preventDefault();
                generateDocument();
            });

            // Template data - Expanded library with 20 templates
            const templates = {
                // Creative Templates
                'video-editor': { position: 'Video Editing Intern', stipend: 5000, workLocation: 'Hybrid' },
                '3d-artist': { position: '3D Modeling and Animation Intern', stipend: 6000, workLocation: 'Office' },
                'content-creator': { position: 'Content Development Intern', stipend: 4500, workLocation: 'Work From Home' },
                'graphic-designer': { position: 'Graphic Design Intern', stipend: 4500, workLocation: 'Hybrid' },
                'ui-ux-designer': { position: 'UI/UX Design Intern', stipend: 6000, workLocation: 'Hybrid' },
                'animator': { position: 'Animation Intern', stipend: 5500, workLocation: 'Office' },
                'photographer': { position: 'Photography Intern', stipend: 4000, workLocation: 'Hybrid' },
                
                // Technical Templates
                'software-tester': { position: 'Software Testing Intern', stipend: 4000, workLocation: 'Work From Home' },
                'rnd-generalist': { position: 'Research and Development Intern', stipend: 5500, workLocation: 'Hybrid' },
                'frontend-dev': { position: 'Frontend Development Intern', stipend: 7000, workLocation: 'Hybrid' },
                'backend-dev': { position: 'Backend Development Intern', stipend: 7500, workLocation: 'Work From Home' },
                'fullstack-dev': { position: 'Full Stack Development Intern', stipend: 8000, workLocation: 'Hybrid' },
                'mobile-dev': { position: 'Mobile Development Intern', stipend: 7500, workLocation: 'Hybrid' },
                'devops': { position: 'DevOps Intern', stipend: 8000, workLocation: 'Work From Home' },
                'data-analyst': { position: 'Data Analytics Intern', stipend: 6500, workLocation: 'Hybrid' },
                'ml-engineer': { position: 'Machine Learning Intern', stipend: 9000, workLocation: 'Hybrid' },
                
                // Business Templates
                'digital-marketing': { position: 'Digital Marketing Intern', stipend: 5000, workLocation: 'Work From Home' },
                'business-analyst': { position: 'Business Analysis Intern', stipend: 6000, workLocation: 'Hybrid' },
                'hr-intern': { position: 'Human Resources Intern', stipend: 4000, workLocation: 'Office' },
                'sales-intern': { position: 'Sales Intern', stipend: 4500, workLocation: 'Hybrid' }
            };

            // Apply template
            function applyTemplate() {
                const selector = document.getElementById('templateSelector');
                const templateKey = selector.value;
                
                if (!templateKey) return;
                
                const template = templates[templateKey];
                if (template) {
                    document.getElementById('position').value = template.position;
                    document.getElementById('stipend').value = template.stipend;
                    document.getElementById('workLocation').value = template.workLocation;
                    
                    // Show success message
                    const originalText = selector.options[selector.selectedIndex].text;
                    selector.style.borderColor = '#10b981';
                    setTimeout(() => {
                        selector.style.borderColor = '';
                    }, 1000);
                }
            }

            // Enhanced AI Auto-fill function
            async function generateWithAI(useRealAI = false) {
                const prompt = document.getElementById('aiPrompt').value;
                if (!prompt) {
                    alert('Please describe the position');
                    return;
                }

                const btn = event.target;
                const originalHTML = btn.innerHTML;
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>' + (useRealAI ? 'AI Pro thinking...' : 'Processing...');

                try {
                    if (useRealAI) {
                        // Try real AI API
                        const response = await fetch('/api/generate-content', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                prompt: 'Extract job details from: ' + prompt + '. Return JSON with position, stipend, duration_months, location, responsibilities',
                                type: 'auto-fill',
                                useRealAI: true
                            })
                        });

                        const data = await response.json();
                        
                        if (!data.demo) {
                            // Real AI response - try to parse JSON
                            try {
                                const parsed = JSON.parse(data.content);
                                if (parsed.position) document.getElementById('position').value = parsed.position;
                                if (parsed.stipend) document.getElementById('stipend').value = parsed.stipend;
                                if (parsed.location) document.getElementById('workLocation').value = parsed.location;
                                
                                btn.innerHTML = '<i class="fas fa-check mr-2"></i>AI Pro Success!';
                                setTimeout(() => {
                                    btn.disabled = false;
                                    btn.innerHTML = originalHTML;
                                }, 2000);
                                return;
                            } catch (e) {
                                // AI didn't return JSON, fallback to smart mode
                                console.log('AI response not JSON, using smart mode');
                            }
                        }
                    }
                    
                    // Smart extraction mode (always works)
                    const lowerPrompt = prompt.toLowerCase();
                    
                    let position = 'Research and Development Intern';
                    if (lowerPrompt.includes('video') || lowerPrompt.includes('editor')) {
                        position = 'Video Editing Intern';
                    } else if (lowerPrompt.includes('3d') || lowerPrompt.includes('modeling')) {
                        position = '3D Modeling Intern';
                    } else if (lowerPrompt.includes('software') || lowerPrompt.includes('testing')) {
                        position = 'Software Testing Intern';
                    } else if (lowerPrompt.includes('content')) {
                        position = 'Content Development Intern';
                    }

                    const stipendMatch = prompt.match(/₹?(\\d+)/);
                    const stipend = stipendMatch ? stipendMatch[1] : '3000';

                    let months = 12;
                    if (lowerPrompt.includes('6 month')) months = 6;
                    if (lowerPrompt.includes('3 month')) months = 3;

                    let location = 'Work From Home';
                    if (lowerPrompt.includes('office')) location = 'Office';
                    if (lowerPrompt.includes('hybrid')) location = 'Hybrid';

                    document.getElementById('position').value = position;
                    document.getElementById('stipend').value = stipend;
                    document.getElementById('workLocation').value = location;
                    
                    const start = new Date();
                    const end = new Date();
                    end.setMonth(end.getMonth() + months);
                    document.getElementById('endDate').valueAsDate = end;

                    btn.innerHTML = '<i class="fas fa-check mr-2"></i>Filled Successfully!';
                    setTimeout(() => {
                        btn.disabled = false;
                        btn.innerHTML = originalHTML;
                    }, 2000);
                } catch (error) {
                    btn.disabled = false;
                    btn.innerHTML = originalHTML;
                    alert('Generation failed. Please try manual entry.');
                }
            }

            function formatDate(dateString) {
                const date = new Date(dateString);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                return date.toLocaleDateString('en-US', options);
            }

            function generateDocument() {
                const data = {
                    date: document.getElementById('date').value,
                    candidateName: document.getElementById('candidateName').value,
                    position: document.getElementById('position').value,
                    startDate: document.getElementById('startDate').value,
                    endDate: document.getElementById('endDate').value,
                    probationMonths: document.getElementById('probationMonths').value,
                    workLocation: document.getElementById('workLocation').value,
                    workingHours: document.getElementById('workingHours').value,
                    stipend: document.getElementById('stipend').value
                };

                const documentHTML = \`
                <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; line-height: 1.6;">
                    <!-- Header -->
                    <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #1e3a8a; padding-bottom: 20px;">
                        <h1 style="color: #1e3a8a; font-size: 28px; margin: 0 0 10px 0;">PASSION 3D WORLD</h1>
                        <p style="color: #3b82f6; font-style: italic; margin: 0 0 10px 0;">Make your passion a reality!</p>
                        <p style="color: #1f2937; font-size: 14px; margin: 5px 0;">Kashimira, Mira Road (E), Mumbai, Maharashtra, India</p>
                        <p style="color: #1f2937; font-size: 14px; margin: 5px 0;">Contact: +91 9137361474 | passion3dworld@gmail.com</p>
                    </div>

                    <!-- Title -->
                    <h2 style="text-align: center; color: #000000; font-size: 24px; margin: 30px 0;">Internship Offer Letter</h2>

                    <!-- Date -->
                    <p style="text-align: right; color: #1f2937; margin-bottom: 30px;"><strong>Date:</strong> \${formatDate(data.date)}</p>

                    <!-- Content -->
                    <div style="color: #1f2937; font-size: 15px;">
                        <p style="margin-bottom: 20px;">To,<br><strong>\${data.candidateName}</strong></p>

                        <p style="margin-bottom: 20px;">With reference to your interview, we are pleased to inform you that you have been selected as "<strong>\${data.position}</strong>" at PASSION 3D WORLD with the following terms and conditions:</p>

                        <ol style="margin-left: 20px; margin-bottom: 20px;">
                            <li style="margin-bottom: 15px;">You will provide Research and Development services to PASSION 3D WORLD and deliver the required outcomes of the assigned work (including Video Creation, Content Creation, Video Making, Software & Hardware Testing — applicable for R&D Intern role).</li>
                            
                            <li style="margin-bottom: 15px;">The internship period will be from <strong>\${formatDate(data.startDate)}</strong> to <strong>\${formatDate(data.endDate)}</strong>.</li>
                            
                            <li style="margin-bottom: 15px;">You will be under probation up to <strong>\${data.probationMonths} months</strong> from the date of joining. Based on your performance, the company has the full right to decide whether to continue or discontinue your association with the organization.</li>
                            
                            <li style="margin-bottom: 15px;">Your work base will be <strong>\${data.workLocation}</strong> with <strong>\${data.workingHours}</strong> on a five-day working week.</li>
                            
                            <li style="margin-bottom: 15px;">The monthly stipend will be <strong>₹\${data.stipend}</strong>. Additionally, performance-based incentives may be provided based on your contributions.</li>
                            
                            <li style="margin-bottom: 15px;">In case you have to appear for any examination during your internship, you are requested to inform the company at least one week in advance.</li>
                            
                            <li style="margin-bottom: 15px;">You will be entitled to a maximum of 4 sick leaves per month, subject to prior approval from management.</li>
                            
                            <li style="margin-bottom: 15px;">The company will pay necessary travel expenses if applicable and as per company policy.</li>
                            
                            <li style="margin-bottom: 15px;">You are required to maintain confidentiality regarding all company information, projects, and business strategies during and after your internship period.</li>
                            
                            <li style="margin-bottom: 15px;">All software, courses, videos, and data developed during your internship are the intellectual property of PASSION 3D WORLD and protected under applicable laws.</li>
                        </ol>

                        <p style="margin-top: 30px; margin-bottom: 20px;">We look forward to a mutually beneficial association.</p>

                        <p style="margin-bottom: 40px;">Please sign and return a copy of this letter to confirm your acceptance.</p>

                        <!-- Signature Section -->
                        <div style="margin-top: 60px; display: flex; justify-content: space-between;">
                            <div style="width: 45%;">
                                <div style="border-top: 2px solid #000; padding-top: 10px; margin-bottom: 5px;"></div>
                                <p style="margin: 5px 0;"><strong>Candidate Signature</strong></p>
                                <p style="margin: 5px 0; color: #6b7280;">Name: \${data.candidateName}</p>
                                <p style="margin: 5px 0; color: #6b7280;">Date: __________</p>
                            </div>
                            <div style="width: 45%;">
                                <div style="border-top: 2px solid #000; padding-top: 10px; margin-bottom: 5px;"></div>
                                <p style="margin: 5px 0;"><strong>Company Representative</strong></p>
                                <p style="margin: 5px 0; color: #6b7280;">Rahul Gupta</p>
                                <p style="margin: 5px 0; color: #6b7280;">CEO, Passion 3D World</p>
                            </div>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
                        <p>This is a computer-generated document and does not require a physical signature.</p>
                    </div>
                </div>
                \`;

                document.getElementById('documentPreview').innerHTML = documentHTML;
            }

            function downloadPDF() {
                const element = document.getElementById('documentPreview');
                const opt = {
                    margin: 10,
                    filename: 'Offer_Letter_' + document.getElementById('candidateName').value.replace(/\\s+/g, '_') + '.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                };
                html2pdf().set(opt).from(element).save();
            }
        </script>
    </body>
    </html>
  `)
})

// Certificate Generator Page
app.get('/certificate', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Certificate Generator</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
        <style>
            @media print {
                .no-print { display: none !important; }
                .print-content { margin: 0; padding: 0; page-break-inside: avoid; }
                body { background: white; }
            }
            body {
                background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0c1629 100%);
            }
            input, select, textarea {
                background-color: #1e293b;
                color: white;
                border-color: #475569;
            }
            input:focus, select:focus, textarea:focus {
                outline: none;
                border-color: #3b82f6;
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            }
            input::placeholder, textarea::placeholder {
                color: #64748b;
            }
        </style>
    </head>
    <body class="min-h-screen">
        <div class="no-print">
            <div class="bg-black border-b border-blue-500 shadow-lg shadow-blue-500/20 py-4 px-6">
                <div class="container mx-auto flex justify-between items-center">
                    <div>
                        <a href="/" class="text-blue-400 hover:text-blue-300 transition-colors"><i class="fas fa-arrow-left mr-2"></i>Back to Home</a>
                    </div>
                    <h1 class="text-2xl font-bold text-white">
                        <i class="fas fa-robot text-blue-400 mr-2"></i>AI Certificate Generator
                    </h1>
                    <div></div>
                </div>
            </div>
        </div>

        <div class="container mx-auto px-4 py-8">
            <div class="grid lg:grid-cols-2 gap-8">
                <!-- Form Section -->
                <div class="no-print bg-gradient-to-br from-gray-900 to-gray-800 border border-blue-500 rounded-lg shadow-2xl shadow-blue-500/20 p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-2xl font-bold text-white"><i class="fas fa-edit mr-2 text-blue-400"></i>Fill Details</h2>
                        <div class="bg-blue-600 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                            <i class="fas fa-sparkles mr-1"></i>AI Powered
                        </div>
                    </div>
                    
                    <form id="certificateForm" class="space-y-4">
                        <div class="border-b border-gray-700 pb-4">
                            <h3 class="text-lg font-semibold text-blue-400 mb-3">Recipient Information</h3>
                            <div class="space-y-3">
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                                    <input type="text" id="recipientName" class="w-full px-3 py-2 border rounded-lg" required>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-1">Position/Role</label>
                                    <input type="text" id="role" class="w-full px-3 py-2 border rounded-lg" value="Research and Development Intern" required>
                                </div>
                            </div>
                        </div>

                        <div class="border-b border-gray-700 pb-4">
                            <h3 class="text-lg font-semibold text-blue-400 mb-3">Period Details</h3>
                            <div class="grid grid-cols-2 gap-3">
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
                                    <input type="date" id="certStartDate" class="w-full px-3 py-2 border rounded-lg" required>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-1">End Date</label>
                                    <input type="date" id="certEndDate" class="w-full px-3 py-2 border rounded-lg" required>
                                </div>
                            </div>
                        </div>

                        <div class="border-b border-gray-700 pb-4">
                            <h3 class="text-lg font-semibold text-blue-400 mb-3">Performance & Skills</h3>
                            <div class="space-y-3">
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-1">Performance Rating</label>
                                    <select id="performance" class="w-full px-3 py-2 border rounded-lg">
                                        <option value="Excellent">Excellent</option>
                                        <option value="Very Good">Very Good</option>
                                        <option value="Good">Good</option>
                                        <option value="Satisfactory">Satisfactory</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-1">
                                        <i class="fas fa-robot text-blue-400 mr-1"></i>
                                        Key Skills/Achievements
                                    </label>
                                    <textarea id="achievements" class="w-full px-3 py-2 border rounded-lg" rows="3" placeholder="Video Creation, 3D Modeling, Software Testing..."></textarea>
                                    <div class="mt-2 grid grid-cols-2 gap-2">
                                        <button type="button" onclick="generateAchievements(false)" class="text-sm bg-blue-700 hover:bg-blue-600 text-white py-1 px-3 rounded">
                                            <i class="fas fa-sparkles mr-1"></i>Smart Generate
                                        </button>
                                        <button type="button" onclick="generateAchievements(true)" class="text-sm bg-green-700 hover:bg-green-600 text-white py-1 px-3 rounded">
                                            <i class="fas fa-brain mr-1"></i>AI Pro
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="border-b border-gray-700 pb-4">
                            <h3 class="text-lg font-semibold text-blue-400 mb-3">Certificate Details</h3>
                            <div class="space-y-3">
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-1">Certificate ID</label>
                                    <input type="text" id="certificateId" class="w-full px-3 py-2 border rounded-lg" placeholder="P3DW-2025-001" required>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-1">Issue Date</label>
                                    <input type="date" id="issueDate" class="w-full px-3 py-2 border rounded-lg" required>
                                </div>
                            </div>
                        </div>

                        <div class="pt-4">
                            <button type="submit" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg shadow-blue-600/50">
                                <i class="fas fa-sync mr-2"></i>Generate Preview
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Preview Section -->
                <div>
                    <div class="no-print bg-gradient-to-br from-gray-900 to-gray-800 border border-blue-500 rounded-lg shadow-2xl shadow-blue-500/20 p-4 mb-4">
                        <div class="flex gap-3">
                            <button onclick="downloadCertificatePDF()" class="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-lg shadow-blue-600/30">
                                <i class="fas fa-download mr-2"></i>Download PDF
                            </button>
                            <button onclick="window.print()" class="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                                <i class="fas fa-print mr-2"></i>Print
                            </button>
                        </div>
                    </div>

                    <div id="certificatePreview" class="bg-white rounded-lg shadow-2xl shadow-blue-500/10 print-content" style="min-height: 600px;">
                        <div class="text-center text-gray-400 py-20 px-8">
                            <i class="fas fa-certificate text-6xl mb-4"></i>
                            <p class="text-xl">Fill the form to generate preview</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script>
            // Set today's date as default
            document.getElementById('issueDate').valueAsDate = new Date();
            
            const startDate = new Date();
            startDate.setFullYear(startDate.getFullYear() - 1);
            document.getElementById('certStartDate').valueAsDate = startDate;
            document.getElementById('certEndDate').valueAsDate = new Date();
            
            // Check if coming from PDF upload
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('from') === 'upload') {
                const extractedData = sessionStorage.getItem('extractedData');
                const extractionMessage = sessionStorage.getItem('extractionMessage');
                
                if (extractedData) {
                    try {
                        const data = JSON.parse(extractedData);
                        
                        // Pre-fill form with extracted data
                        if (data.candidateName) document.getElementById('recipientName').value = data.candidateName;
                        if (data.position) document.getElementById('role').value = data.position;
                        if (data.performance) document.getElementById('performance').value = data.performance;
                        if (data.achievements) document.getElementById('achievements').value = data.achievements;
                        
                        // Parse and set dates
                        if (data.startDate) {
                            try {
                                const parsedDate = new Date(data.startDate);
                                if (!isNaN(parsedDate.getTime())) {
                                    document.getElementById('certStartDate').valueAsDate = parsedDate;
                                }
                            } catch (e) {}
                        }
                        
                        if (data.endDate) {
                            try {
                                const parsedDate = new Date(data.endDate);
                                if (!isNaN(parsedDate.getTime())) {
                                    document.getElementById('certEndDate').valueAsDate = parsedDate;
                                }
                            } catch (e) {}
                        }
                        
                        // Generate certificate ID if not present
                        const certId = 'P3DW-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 1000)).padStart(3, '0');
                        document.getElementById('certificateId').value = certId;
                        
                        // Show success message
                        if (extractionMessage) {
                            const banner = document.createElement('div');
                            banner.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse';
                            banner.innerHTML = '<i class="fas fa-check-circle mr-2"></i>' + extractionMessage + ' - Review and edit below';
                            document.body.appendChild(banner);
                            setTimeout(() => banner.remove(), 5000);
                        }
                        
                        // Clear session storage
                        sessionStorage.removeItem('extractedData');
                        sessionStorage.removeItem('extractionMessage');
                        
                        // Auto-generate preview
                        setTimeout(() => {
                            generateCertificate();
                        }, 500);
                        
                    } catch (e) {
                        console.error('Failed to parse extracted data:', e);
                    }
                }
            }

            document.getElementById('certificateForm').addEventListener('submit', function(e) {
                e.preventDefault();
                generateCertificate();
            });

            // Enhanced AI Generate Achievements
            async function generateAchievements(useRealAI = false) {
                const role = document.getElementById('role').value;
                const performance = document.getElementById('performance').value;
                const btn = event.target;
                const originalHTML = btn.innerHTML;
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i>' + (useRealAI ? 'AI Pro...' : 'Generating...');

                try {
                    const response = await fetch('/api/generate-content', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            prompt: 'Write 5 professional achievements for a ' + role + ' with ' + performance + ' performance rating at Passion 3D World. Focus on video editing, 3D modeling, and software testing skills. Be specific and impressive.',
                            type: 'achievements',
                            useRealAI: useRealAI
                        })
                    });

                    const data = await response.json();
                    document.getElementById('achievements').value = data.content;
                    
                    const successMsg = data.demo ? 'Generated!' : 'AI Pro Success!';
                    btn.innerHTML = '<i class="fas fa-check mr-1"></i>' + successMsg;
                    setTimeout(() => {
                        btn.disabled = false;
                        btn.innerHTML = originalHTML;
                    }, 2000);
                } catch (error) {
                    const suggestions = 'Successfully completed video editing projects, demonstrated proficiency in 3D modeling, contributed to testing processes, showed excellent collaboration skills';
                    document.getElementById('achievements').value = suggestions;
                    btn.disabled = false;
                    btn.innerHTML = originalHTML;
                }
            }

            function formatDate(dateString) {
                const date = new Date(dateString);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                return date.toLocaleDateString('en-US', options);
            }

            function generateCertificate() {
                const data = {
                    recipientName: document.getElementById('recipientName').value,
                    role: document.getElementById('role').value,
                    certStartDate: document.getElementById('certStartDate').value,
                    certEndDate: document.getElementById('certEndDate').value,
                    performance: document.getElementById('performance').value,
                    achievements: document.getElementById('achievements').value,
                    certificateId: document.getElementById('certificateId').value,
                    issueDate: document.getElementById('issueDate').value
                };

                const certificateHTML = \`
                <div style="font-family: 'Georgia', serif; max-width: 900px; margin: 0 auto; padding: 60px; border: 15px double #1e3a8a; background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);">
                    <!-- Decorative Header Border -->
                    <div style="border-bottom: 3px solid #1e3a8a; margin-bottom: 30px; padding-bottom: 20px;">
                        <div style="text-align: center;">
                            <h1 style="color: #1e3a8a; font-size: 42px; margin: 0 0 10px 0; letter-spacing: 2px; text-transform: uppercase;">Certificate of Completion</h1>
                            <div style="width: 100px; height: 3px; background: linear-gradient(to right, #1e3a8a, #3b82f6); margin: 15px auto;"></div>
                        </div>
                    </div>

                    <!-- Company Header -->
                    <div style="text-align: center; margin-bottom: 40px;">
                        <h2 style="color: #000000; font-size: 32px; margin: 0 0 10px 0; font-weight: bold;">PASSION 3D WORLD</h2>
                        <p style="color: #3b82f6; font-style: italic; font-size: 16px; margin: 5px 0;">Make your passion a reality!</p>
                        <p style="color: #1f2937; font-size: 14px; margin: 10px 0;">Kashimira, Mira Road (E), Mumbai, Maharashtra, India</p>
                    </div>

                    <!-- Certificate Body -->
                    <div style="text-align: center; margin: 40px 0; padding: 30px; background-color: rgba(30, 58, 138, 0.03); border-radius: 10px;">
                        <p style="color: #1f2937; font-size: 18px; margin-bottom: 30px; line-height: 1.6;">This is to certify that</p>
                        
                        <h3 style="color: #1e3a8a; font-size: 36px; margin: 20px 0; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">\${data.recipientName}</h3>
                        
                        <p style="color: #1f2937; font-size: 18px; margin: 25px 0; line-height: 1.8;">
                            has successfully completed the internship program as<br>
                            <strong style="color: #000000; font-size: 20px;">\${data.role}</strong><br>
                            from <strong>\${formatDate(data.certStartDate)}</strong> to <strong>\${formatDate(data.certEndDate)}</strong>
                        </p>

                        <div style="margin: 30px 0; padding: 20px; background-color: white; border-left: 4px solid #3b82f6; border-radius: 5px;">
                            <p style="color: #1f2937; font-size: 16px; margin: 10px 0;">
                                <strong style="color: #000000;">Performance Rating:</strong> <span style="color: #3b82f6; font-weight: bold;">\${data.performance}</span>
                            </p>
                            \${data.achievements ? \`
                            <p style="color: #1f2937; font-size: 16px; margin: 15px 0; line-height: 1.6;">
                                <strong style="color: #000000;">Key Contributions:</strong><br>
                                <span style="color: #4b5563;">\${data.achievements}</span>
                            </p>
                            \` : ''}
                        </div>

                        <p style="color: #1f2937; font-size: 16px; margin-top: 30px; line-height: 1.6;">
                            We appreciate the dedication, hard work, and valuable contributions<br>
                            made during the internship period at Passion 3D World.
                        </p>
                    </div>

                    <!-- Certificate Details -->
                    <div style="margin: 40px 0 30px 0; text-align: center;">
                        <p style="color: #4b5563; font-size: 14px; margin: 5px 0;">Certificate ID: <strong>\${data.certificateId}</strong></p>
                        <p style="color: #4b5563; font-size: 14px; margin: 5px 0;">Issue Date: <strong>\${formatDate(data.issueDate)}</strong></p>
                    </div>

                    <!-- Signatures -->
                    <div style="display: flex; justify-content: space-around; margin-top: 60px; padding-top: 20px;">
                        <div style="text-align: center; width: 40%;">
                            <div style="border-top: 2px solid #000; margin-bottom: 10px;"></div>
                            <p style="margin: 8px 0; font-size: 16px; font-weight: bold; color: #000000;">Rahul Gupta</p>
                            <p style="margin: 5px 0; font-size: 14px; color: #4b5563;">CEO</p>
                            <p style="margin: 5px 0; font-size: 14px; color: #4b5563;">Passion 3D World</p>
                        </div>
                        <div style="text-align: center; width: 40%;">
                            <div style="border-top: 2px solid #000; margin-bottom: 10px;"></div>
                            <p style="margin: 8px 0; font-size: 16px; font-weight: bold; color: #000000;">Company Seal</p>
                            <p style="margin: 5px 0; font-size: 14px; color: #4b5563;">Official Seal</p>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div style="margin-top: 40px; text-align: center; padding-top: 20px; border-top: 2px solid #e5e7eb;">
                        <p style="color: #6b7280; font-size: 11px; line-height: 1.5;">
                            Contact: +91 9137361474 | passion3dworld@gmail.com<br>
                            This certificate is issued electronically and is valid without physical signature.
                        </p>
                    </div>
                </div>
                \`;

                document.getElementById('certificatePreview').innerHTML = certificateHTML;
            }

            function downloadCertificatePDF() {
                const element = document.getElementById('certificatePreview');
                const opt = {
                    margin: 5,
                    filename: 'Certificate_' + document.getElementById('recipientName').value.replace(/\\s+/g, '_') + '.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
                };
                html2pdf().set(opt).from(element).save();
            }
        </script>
    </body>
    </html>
  `)
})


export default app
