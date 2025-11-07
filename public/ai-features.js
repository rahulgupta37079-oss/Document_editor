// AI-powered features for document generation

async function callAI(prompt, type = 'general') {
  try {
    const response = await fetch('/api/generate-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, type })
    });
    
    if (!response.ok) throw new Error('API call failed');
    
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('AI generation error:', error);
    return null;
  }
}

// Smart extraction from natural language
function extractFromPrompt(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  const result = {};
  
  // Extract position
  if (lowerPrompt.includes('video') || lowerPrompt.includes('editor')) {
    result.position = 'Video Editing Intern';
  } else if (lowerPrompt.includes('3d') || lowerPrompt.includes('modeling')) {
    result.position = '3D Modeling Intern';
  } else if (lowerPrompt.includes('software') || lowerPrompt.includes('testing')) {
    result.position = 'Software Testing Intern';
  } else if (lowerPrompt.includes('r&d') || lowerPrompt.includes('research')) {
    result.position = 'Research and Development Intern';
  } else {
    result.position = 'Research and Development Intern';
  }
  
  // Extract stipend
  const stipendMatch = prompt.match(/₹?(\d+)/);
  result.stipend = stipendMatch ? stipendMatch[1] : '3000';
  
  // Extract duration
  let months = 12;
  if (lowerPrompt.includes('6 month')) months = 6;
  if (lowerPrompt.includes('3 month')) months = 3;
  if (lowerPrompt.includes('1 year') || lowerPrompt.includes('12 month')) months = 12;
  result.months = months;
  
  // Extract work location
  if (lowerPrompt.includes('office')) {
    result.location = 'Office';
  } else if (lowerPrompt.includes('hybrid')) {
    result.location = 'Hybrid';
  } else {
    result.location = 'Work From Home';
  }
  
  // Generate responsibilities
  const responsibilities = [];
  if (lowerPrompt.includes('video')) responsibilities.push('Video Creation and Editing');
  if (lowerPrompt.includes('3d')) responsibilities.push('3D Modeling and Animation');
  if (lowerPrompt.includes('content')) responsibilities.push('Content Development');
  if (lowerPrompt.includes('testing')) responsibilities.push('Software Testing');
  if (lowerPrompt.includes('hardware')) responsibilities.push('Hardware Testing');
  if (responsibilities.length === 0) {
    responsibilities.push('Video Creation', 'Content Development', 'Software Testing');
  }
  result.responsibilities = responsibilities.join(', ');
  
  return result;
}

// Demo mode suggestions
function getDemoSuggestions(type) {
  const suggestions = {
    responsibilities: "Video Creation and Editing, 3D Modeling and Animation, Content Development, Software and Hardware Testing, Documentation and Reporting",
    achievements: "Successfully completed multiple video editing projects with high-quality output, demonstrated proficiency in 3D modeling software, contributed to software quality assurance testing, showed excellent teamwork and communication skills, met all project deadlines with attention to detail",
    terms: "The intern will work on assigned projects including video creation, content development, and software testing. All work products remain company property. Regular progress reviews will be conducted."
  };
  
  return suggestions[type] || "AI-generated content will appear here";
}
