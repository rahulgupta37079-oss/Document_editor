import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

// Enable CORS for API routes
app.use('/api/*', cors())

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
        </style>
    </head>
    <body class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div class="container mx-auto px-4 py-8">
            <div class="text-center mb-12">
                <h1 class="text-5xl font-bold text-indigo-900 mb-4">
                    <i class="fas fa-file-alt mr-3"></i>
                    Document Generator
                </h1>
                <p class="text-xl text-gray-700">Passion 3D World - Automated Document Creation</p>
            </div>

            <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <!-- Offer Letter Card -->
                <div class="bg-white rounded-xl shadow-2xl p-8 hover:shadow-3xl transition-shadow duration-300">
                    <div class="text-center mb-6">
                        <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-briefcase text-4xl text-blue-600"></i>
                        </div>
                        <h2 class="text-2xl font-bold text-gray-800 mb-2">Offer Letter</h2>
                        <p class="text-gray-600">Generate customized internship offer letters</p>
                    </div>
                    <ul class="text-sm text-gray-600 mb-6 space-y-2">
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Customizable candidate details</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Flexible terms & conditions</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>PDF export ready</li>
                    </ul>
                    <a href="/offer-letter" class="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors duration-200">
                        Create Offer Letter <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>

                <!-- Certificate Card -->
                <div class="bg-white rounded-xl shadow-2xl p-8 hover:shadow-3xl transition-shadow duration-300">
                    <div class="text-center mb-6">
                        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-certificate text-4xl text-green-600"></i>
                        </div>
                        <h2 class="text-2xl font-bold text-gray-800 mb-2">Certificate</h2>
                        <p class="text-gray-600">Generate professional completion certificates</p>
                    </div>
                    <ul class="text-sm text-gray-600 mb-6 space-y-2">
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Customizable recipient details</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Professional formatting</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>PDF export ready</li>
                    </ul>
                    <a href="/certificate" class="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors duration-200">
                        Create Certificate <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>

            <div class="mt-12 text-center text-gray-600">
                <p class="mb-2"><i class="fas fa-info-circle mr-2"></i>All documents can be edited and exported as PDF</p>
                <p class="text-sm">Powered by Passion 3D World</p>
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
        <title>Offer Letter Generator</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
        <style>
            @media print {
                .no-print { display: none !important; }
                .print-content { margin: 0; padding: 40px; page-break-inside: avoid; }
                body { background: white; }
            }
        </style>
    </head>
    <body class="bg-gray-50">
        <div class="no-print">
            <div class="bg-indigo-900 text-white py-4 px-6 shadow-lg">
                <div class="container mx-auto flex justify-between items-center">
                    <div>
                        <a href="/" class="text-white hover:text-indigo-200"><i class="fas fa-arrow-left mr-2"></i>Back to Home</a>
                    </div>
                    <h1 class="text-2xl font-bold">Offer Letter Generator</h1>
                    <div></div>
                </div>
            </div>
        </div>

        <div class="container mx-auto px-4 py-8">
            <div class="grid lg:grid-cols-2 gap-8">
                <!-- Form Section -->
                <div class="no-print bg-white rounded-lg shadow-lg p-6">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6"><i class="fas fa-edit mr-2"></i>Fill Details</h2>
                    
                    <form id="offerForm" class="space-y-4">
                        <div class="border-b pb-4">
                            <h3 class="text-lg font-semibold text-gray-700 mb-3">Document Details</h3>
                            <div class="space-y-3">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                    <input type="date" id="date" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" required>
                                </div>
                            </div>
                        </div>

                        <div class="border-b pb-4">
                            <h3 class="text-lg font-semibold text-gray-700 mb-3">Candidate Information</h3>
                            <div class="space-y-3">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input type="text" id="candidateName" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" required>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Position</label>
                                    <input type="text" id="position" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" value="Research and Development Intern" required>
                                </div>
                            </div>
                        </div>

                        <div class="border-b pb-4">
                            <h3 class="text-lg font-semibold text-gray-700 mb-3">Internship Period</h3>
                            <div class="grid grid-cols-2 gap-3">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                    <input type="date" id="startDate" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" required>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                    <input type="date" id="endDate" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" required>
                                </div>
                            </div>
                            <div class="mt-3">
                                <label class="block text-sm font-medium text-gray-700 mb-1">Probation Period (months)</label>
                                <input type="number" id="probationMonths" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" value="3" min="1" required>
                            </div>
                        </div>

                        <div class="border-b pb-4">
                            <h3 class="text-lg font-semibold text-gray-700 mb-3">Work Details</h3>
                            <div class="space-y-3">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Work Location</label>
                                    <select id="workLocation" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                                        <option value="Work From Home">Work From Home</option>
                                        <option value="Office">Office</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Working Hours</label>
                                    <input type="text" id="workingHours" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" value="Flexible and Part-time (8 hrs/day)">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Monthly Stipend (₹)</label>
                                    <input type="number" id="stipend" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" value="3000" min="0" required>
                                </div>
                            </div>
                        </div>

                        <div class="pt-4">
                            <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                                <i class="fas fa-sync mr-2"></i>Generate Preview
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Preview Section -->
                <div>
                    <div class="no-print bg-white rounded-lg shadow-lg p-4 mb-4">
                        <div class="flex gap-3">
                            <button onclick="downloadPDF()" class="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                                <i class="fas fa-download mr-2"></i>Download PDF
                            </button>
                            <button onclick="window.print()" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                                <i class="fas fa-print mr-2"></i>Print
                            </button>
                        </div>
                    </div>

                    <div id="documentPreview" class="bg-white rounded-lg shadow-lg p-8 print-content" style="min-height: 600px;">
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
                    <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #4F46E5; padding-bottom: 20px;">
                        <h1 style="color: #4F46E5; font-size: 28px; margin: 0 0 10px 0;">PASSION 3D WORLD</h1>
                        <p style="color: #6B7280; font-style: italic; margin: 0 0 10px 0;">Make your passion a reality!</p>
                        <p style="color: #374151; font-size: 14px; margin: 5px 0;">Kashimira, Mira Road (E), Mumbai, Maharashtra, India</p>
                        <p style="color: #374151; font-size: 14px; margin: 5px 0;">Contact: +91 9137361474 | passion3dworld@gmail.com</p>
                    </div>

                    <!-- Title -->
                    <h2 style="text-align: center; color: #1F2937; font-size: 24px; margin: 30px 0;">Internship Offer Letter</h2>

                    <!-- Date -->
                    <p style="text-align: right; color: #374151; margin-bottom: 30px;"><strong>Date:</strong> \${formatDate(data.date)}</p>

                    <!-- Content -->
                    <div style="color: #374151; font-size: 15px;">
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
                                <p style="margin: 5px 0; color: #6B7280;">Name: \${data.candidateName}</p>
                                <p style="margin: 5px 0; color: #6B7280;">Date: __________</p>
                            </div>
                            <div style="width: 45%;">
                                <div style="border-top: 2px solid #000; padding-top: 10px; margin-bottom: 5px;"></div>
                                <p style="margin: 5px 0;"><strong>Company Representative</strong></p>
                                <p style="margin: 5px 0; color: #6B7280;">Rahul Gupta</p>
                                <p style="margin: 5px 0; color: #6B7280;">CEO, Passion 3D World</p>
                            </div>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #E5E7EB; text-align: center; color: #6B7280; font-size: 12px;">
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
        <title>Certificate Generator</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
        <style>
            @media print {
                .no-print { display: none !important; }
                .print-content { margin: 0; padding: 0; page-break-inside: avoid; }
                body { background: white; }
            }
        </style>
    </head>
    <body class="bg-gray-50">
        <div class="no-print">
            <div class="bg-green-900 text-white py-4 px-6 shadow-lg">
                <div class="container mx-auto flex justify-between items-center">
                    <div>
                        <a href="/" class="text-white hover:text-green-200"><i class="fas fa-arrow-left mr-2"></i>Back to Home</a>
                    </div>
                    <h1 class="text-2xl font-bold">Certificate Generator</h1>
                    <div></div>
                </div>
            </div>
        </div>

        <div class="container mx-auto px-4 py-8">
            <div class="grid lg:grid-cols-2 gap-8">
                <!-- Form Section -->
                <div class="no-print bg-white rounded-lg shadow-lg p-6">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6"><i class="fas fa-edit mr-2"></i>Fill Details</h2>
                    
                    <form id="certificateForm" class="space-y-4">
                        <div class="border-b pb-4">
                            <h3 class="text-lg font-semibold text-gray-700 mb-3">Recipient Information</h3>
                            <div class="space-y-3">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input type="text" id="recipientName" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" required>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Position/Role</label>
                                    <input type="text" id="role" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" value="Research and Development Intern" required>
                                </div>
                            </div>
                        </div>

                        <div class="border-b pb-4">
                            <h3 class="text-lg font-semibold text-gray-700 mb-3">Period Details</h3>
                            <div class="grid grid-cols-2 gap-3">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                    <input type="date" id="certStartDate" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" required>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                    <input type="date" id="certEndDate" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" required>
                                </div>
                            </div>
                        </div>

                        <div class="border-b pb-4">
                            <h3 class="text-lg font-semibold text-gray-700 mb-3">Performance & Skills</h3>
                            <div class="space-y-3">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Performance Rating</label>
                                    <select id="performance" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                                        <option value="Excellent">Excellent</option>
                                        <option value="Very Good">Very Good</option>
                                        <option value="Good">Good</option>
                                        <option value="Satisfactory">Satisfactory</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Key Skills/Achievements</label>
                                    <textarea id="achievements" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" rows="3" placeholder="Video Creation, 3D Modeling, Software Testing..."></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="border-b pb-4">
                            <h3 class="text-lg font-semibold text-gray-700 mb-3">Certificate Details</h3>
                            <div class="space-y-3">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Certificate ID</label>
                                    <input type="text" id="certificateId" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="P3DW-2025-001" required>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                                    <input type="date" id="issueDate" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" required>
                                </div>
                            </div>
                        </div>

                        <div class="pt-4">
                            <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                                <i class="fas fa-sync mr-2"></i>Generate Preview
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Preview Section -->
                <div>
                    <div class="no-print bg-white rounded-lg shadow-lg p-4 mb-4">
                        <div class="flex gap-3">
                            <button onclick="downloadCertificatePDF()" class="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                                <i class="fas fa-download mr-2"></i>Download PDF
                            </button>
                            <button onclick="window.print()" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                                <i class="fas fa-print mr-2"></i>Print
                            </button>
                        </div>
                    </div>

                    <div id="certificatePreview" class="bg-white rounded-lg shadow-lg print-content" style="min-height: 600px;">
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
                <div style="font-family: 'Georgia', serif; max-width: 900px; margin: 0 auto; padding: 60px; border: 15px double #4F46E5; background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);">
                    <!-- Decorative Header Border -->
                    <div style="border-bottom: 3px solid #4F46E5; margin-bottom: 30px; padding-bottom: 20px;">
                        <div style="text-align: center;">
                            <h1 style="color: #4F46E5; font-size: 42px; margin: 0 0 10px 0; letter-spacing: 2px; text-transform: uppercase;">Certificate of Completion</h1>
                            <div style="width: 100px; height: 3px; background: linear-gradient(to right, #4F46E5, #10B981); margin: 15px auto;"></div>
                        </div>
                    </div>

                    <!-- Company Header -->
                    <div style="text-align: center; margin-bottom: 40px;">
                        <h2 style="color: #1F2937; font-size: 32px; margin: 0 0 10px 0; font-weight: bold;">PASSION 3D WORLD</h2>
                        <p style="color: #6B7280; font-style: italic; font-size: 16px; margin: 5px 0;">Make your passion a reality!</p>
                        <p style="color: #374151; font-size: 14px; margin: 10px 0;">Kashimira, Mira Road (E), Mumbai, Maharashtra, India</p>
                    </div>

                    <!-- Certificate Body -->
                    <div style="text-align: center; margin: 40px 0; padding: 30px; background-color: rgba(79, 70, 229, 0.03); border-radius: 10px;">
                        <p style="color: #374151; font-size: 18px; margin-bottom: 30px; line-height: 1.6;">This is to certify that</p>
                        
                        <h3 style="color: #4F46E5; font-size: 36px; margin: 20px 0; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">\${data.recipientName}</h3>
                        
                        <p style="color: #374151; font-size: 18px; margin: 25px 0; line-height: 1.8;">
                            has successfully completed the internship program as<br>
                            <strong style="color: #1F2937; font-size: 20px;">\${data.role}</strong><br>
                            from <strong>\${formatDate(data.certStartDate)}</strong> to <strong>\${formatDate(data.certEndDate)}</strong>
                        </p>

                        <div style="margin: 30px 0; padding: 20px; background-color: white; border-left: 4px solid #10B981; border-radius: 5px;">
                            <p style="color: #374151; font-size: 16px; margin: 10px 0;">
                                <strong style="color: #1F2937;">Performance Rating:</strong> <span style="color: #10B981; font-weight: bold;">\${data.performance}</span>
                            </p>
                            \${data.achievements ? \`
                            <p style="color: #374151; font-size: 16px; margin: 15px 0; line-height: 1.6;">
                                <strong style="color: #1F2937;">Key Contributions:</strong><br>
                                <span style="color: #6B7280;">\${data.achievements}</span>
                            </p>
                            \` : ''}
                        </div>

                        <p style="color: #374151; font-size: 16px; margin-top: 30px; line-height: 1.6;">
                            We appreciate the dedication, hard work, and valuable contributions<br>
                            made during the internship period at Passion 3D World.
                        </p>
                    </div>

                    <!-- Certificate Details -->
                    <div style="margin: 40px 0 30px 0; text-align: center;">
                        <p style="color: #6B7280; font-size: 14px; margin: 5px 0;">Certificate ID: <strong>\${data.certificateId}</strong></p>
                        <p style="color: #6B7280; font-size: 14px; margin: 5px 0;">Issue Date: <strong>\${formatDate(data.issueDate)}</strong></p>
                    </div>

                    <!-- Signatures -->
                    <div style="display: flex; justify-content: space-around; margin-top: 60px; padding-top: 20px;">
                        <div style="text-align: center; width: 40%;">
                            <div style="border-top: 2px solid #000; margin-bottom: 10px;"></div>
                            <p style="margin: 8px 0; font-size: 16px; font-weight: bold; color: #1F2937;">Rahul Gupta</p>
                            <p style="margin: 5px 0; font-size: 14px; color: #6B7280;">CEO</p>
                            <p style="margin: 5px 0; font-size: 14px; color: #6B7280;">Passion 3D World</p>
                        </div>
                        <div style="text-align: center; width: 40%;">
                            <div style="border-top: 2px solid #000; margin-bottom: 10px;"></div>
                            <p style="margin: 8px 0; font-size: 16px; font-weight: bold; color: #1F2937;">Company Seal</p>
                            <p style="margin: 5px 0; font-size: 14px; color: #6B7280;">Official Seal</p>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div style="margin-top: 40px; text-align: center; padding-top: 20px; border-top: 2px solid #E5E7EB;">
                        <p style="color: #9CA3AF; font-size: 11px; line-height: 1.5;">
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
