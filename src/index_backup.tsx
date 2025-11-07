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

// Smart Templates - Expanded Library
const templates = {
  // Original 5 Templates
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
  'software-tester': {
    name: 'Software Tester Intern',
    category: 'Technical',
    position: 'Software Testing Intern',
    responsibilities: 'Manual and Automated Testing, Bug Reporting and Tracking, Test Case Design, API Testing, Performance Testing',
    stipend: 4000,
    workLocation: 'Work From Home'
  },
  'content-creator': {
    name: 'Content Creator Intern',
    category: 'Creative',
    position: 'Content Development Intern',
    responsibilities: 'Content Writing and Copywriting, Social Media Content Creation, SEO Optimization, Graphic Design, Video Script Writing',
    stipend: 4500,
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
  
  // New Technical Templates
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
  
  // New Creative Templates
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
  
  // New Business Templates
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

// Database API endpoints (requires D1 setup)
// Save document
app.post('/api/documents', async (c) => {
  try {
    if (!c.env.DB) {
      return c.json({ error: 'Database not configured', demo: true }, 503)
    }
    
    const { type, candidateName, position, documentData } = await c.req.json()
    
    const result = await c.env.DB.prepare(
      'INSERT INTO documents (type, candidate_name, position, document_data) VALUES (?, ?, ?, ?)'
    ).bind(type, candidateName, position, JSON.stringify(documentData)).run()
    
    return c.json({ success: true, id: result.meta.last_row_id })
  } catch (error) {
    return c.json({ error: 'Failed to save document', demo: true }, 500)
  }
})

// Get all documents
app.get('/api/documents', async (c) => {
  try {
    if (!c.env.DB) {
      return c.json({ documents: [], demo: true })
    }
    
    const { results } = await c.env.DB.prepare(
      'SELECT id, type, candidate_name, position, created_at FROM documents ORDER BY created_at DESC LIMIT 50'
    ).all()
    
    return c.json({ documents: results })
  } catch (error) {
    return c.json({ documents: [], error: 'Failed to fetch documents' }, 500)
  }
})

// Get single document
app.get('/api/documents/:id', async (c) => {
  try {
    if (!c.env.DB) {
      return c.json({ error: 'Database not configured' }, 503)
    }
    
    const id = c.req.param('id')
    const result = await c.env.DB.prepare(
      'SELECT * FROM documents WHERE id = ?'
    ).bind(id).first()
    
    if (!result) {
      return c.json({ error: 'Document not found' }, 404)
    }
    
    return c.json({ document: result })
  } catch (error) {
    return c.json({ error: 'Failed to fetch document' }, 500)
  }
})

// Delete document
app.delete('/api/documents/:id', async (c) => {
  try {
    if (!c.env.DB) {
      return c.json({ error: 'Database not configured' }, 503)
    }
    
    const id = c.req.param('id')
    await c.env.DB.prepare('DELETE FROM documents WHERE id = ?').bind(id).run()
    
    return c.json({ success: true })
  } catch (error) {
    return c.json({ error: 'Failed to delete document' }, 500)
  }
})

// API endpoint to get templates
app.get('/api/templates', (c) => {
  return c.json({ templates })
})

// Enhanced AI content generation with real LLM support
app.post('/api/generate-content', async (c) => {
  try {
    const { prompt, type, useRealAI } = await c.req.json()
    
    // Try real AI if API keys are available and useRealAI is true
    if (useRealAI) {
      const groqKey = c.env.GROQ_API_KEY
      const openaiKey = c.env.OPENAI_API_KEY
      
      // Try Groq first (fastest and free)
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
                content: prompt
              }],
              temperature: 0.7,
              max_tokens: 500
            })
          })

          if (response.ok) {
            const data = await response.json() as any
            const content = data.choices?.[0]?.message?.content || 'Unable to generate content'
            return c.json({ content, demo: false, provider: 'groq' })
          }
        } catch (error) {
          console.log('Groq API failed, trying fallback')
        }
      }
      
      // Try OpenAI as fallback
      if (openaiKey) {
        try {
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + openaiKey
            },
            body: JSON.stringify({
              model: 'gpt-3.5-turbo',
              messages: [{
                role: 'user',
                content: prompt
              }],
              temperature: 0.7,
              max_tokens: 500
            })
          })

          if (response.ok) {
            const data = await response.json() as any
            const content = data.choices?.[0]?.message?.content || 'Unable to generate content'
            return c.json({ content, demo: false, provider: 'openai' })
          }
        } catch (error) {
          console.log('OpenAI API failed, using demo mode')
        }
      }
    }
    
    // Demo mode - provide smart suggestions
    const demoResponses: Record<string, any> = {
      'responsibilities': {
        content: "Video Creation and Editing, 3D Modeling and Animation, Content Development, Software and Hardware Testing, Documentation and Reporting, Team Collaboration"
      },
      'achievements': {
        content: "Successfully completed multiple video editing projects with high-quality output, demonstrated proficiency in 3D modeling software, contributed to software quality assurance testing, showed excellent teamwork and communication skills, met all project deadlines with attention to detail"
      },
      'terms': {
        content: "The intern will work on assigned projects including video creation, content development, and software testing. All work products remain company property."
      }
    }
    
    return c.json({ 
      content: demoResponses[type]?.content || 'Generated content based on your input',
      demo: true,
      provider: 'demo'
    })
  } catch (error) {
    return c.json({ error: 'Failed to generate content', demo: true }, 500)
  }
})

// Home page with navigation
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document Generator - Passion 3D World</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            @media print {
                .no-print { display: none !important; }
                .print-content { margin: 0; padding: 20px; }
            }
            body {
                background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0c1629 100%);
            }
        </style>
    </head>
    <body class="min-h-screen">
        <div class="container mx-auto px-4 py-8">
            <div class="text-center mb-12">
                <h1 class="text-5xl font-bold text-white mb-4">
                    <i class="fas fa-robot mr-3 text-blue-400"></i>
                    AI Document Generator
                </h1>
                <p class="text-xl text-gray-300">Passion 3D World - AI-Powered Document Creation</p>
                <div class="mt-4 inline-flex items-center bg-blue-900/30 border border-blue-500 rounded-lg px-4 py-2">
                    <i class="fas fa-sparkles text-yellow-400 mr-2"></i>
                    <span class="text-blue-300 text-sm">Powered by AI - Smart Content Generation</span>
                </div>
            </div>

            <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <!-- Offer Letter Card -->
                <div class="bg-gradient-to-br from-gray-900 to-gray-800 border border-blue-500 rounded-xl shadow-2xl p-8 hover:shadow-blue-500/50 transition-all duration-300 hover:border-blue-400">
                    <div class="text-center mb-6">
                        <div class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/50">
                            <i class="fas fa-briefcase text-4xl text-white"></i>
                        </div>
                        <h2 class="text-2xl font-bold text-white mb-2">Offer Letter</h2>
                        <p class="text-gray-400">AI-powered internship offer letters</p>
                    </div>
                    <ul class="text-sm text-gray-300 mb-6 space-y-2">
                        <li><i class="fas fa-check text-blue-400 mr-2"></i>AI content suggestions</li>
                        <li><i class="fas fa-check text-blue-400 mr-2"></i>Smart auto-fill capabilities</li>
                        <li><i class="fas fa-check text-blue-400 mr-2"></i>PDF export ready</li>
                    </ul>
                    <a href="/offer-letter" class="block w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors duration-200 shadow-lg shadow-blue-600/50">
                        Create Offer Letter <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>

                <!-- Certificate Card -->
                <div class="bg-gradient-to-br from-gray-900 to-gray-800 border border-blue-500 rounded-xl shadow-2xl p-8 hover:shadow-blue-500/50 transition-all duration-300 hover:border-blue-400">
                    <div class="text-center mb-6">
                        <div class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/50">
                            <i class="fas fa-certificate text-4xl text-white"></i>
                        </div>
                        <h2 class="text-2xl font-bold text-white mb-2">Certificate</h2>
                        <p class="text-gray-400">AI-enhanced completion certificates</p>
                    </div>
                    <ul class="text-sm text-gray-300 mb-6 space-y-2">
                        <li><i class="fas fa-check text-blue-400 mr-2"></i>AI-suggested achievements</li>
                        <li><i class="fas fa-check text-blue-400 mr-2"></i>Professional formatting</li>
                        <li><i class="fas fa-check text-blue-400 mr-2"></i>PDF export ready</li>
                    </ul>
                    <a href="/certificate" class="block w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors duration-200 shadow-lg shadow-blue-600/50">
                        Create Certificate <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>

            <div class="mt-12 text-center text-gray-400">
                <p class="mb-2"><i class="fas fa-info-circle mr-2 text-blue-400"></i>All documents can be edited and exported as PDF</p>
                <p class="text-sm text-gray-500">Powered by Passion 3D World + AI</p>
            </div>
        </div>
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
