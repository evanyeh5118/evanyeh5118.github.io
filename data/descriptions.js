// Define URLs in one place for easy management
export const urls = {
  centralesupelec: 'https://www.centralesupelec.fr/',
  nycu: 'https://www.nycu.edu.tw/',
  ipParis: 'https://www.ip-paris.fr/',
  salah: 'https://scholar.google.com/citations?user=JR5JJEjJsIwC&hl=en&oi=ao',
  vineeth: 'https://scholar.google.com/citations?hl=en&user=I42FdXUAAAAJ',
  toast: 'https://www.toast-dn.eu/home-page',
  marieSklodowskaCurie: 'https://marie-sklodowska-curie-actions.ec.europa.eu/actions/doctoral-networks',
  // Add more URLs here easily
  github: 'https://github.com/evanyeh5118',
  linkedin: 'https://www.linkedin.com/in/yu-yeh-163543198/',
  scholar: 'https://scholar.google.com/citations?user=AgPmc-cAAAAJ&hl=en'
};

// Helper function to get display names for links
function getDisplayName(key) {
    const names = {
      centralesupelec: 'CentraleSupélec',
      nycu: 'National Yang-Ming Chiao Tung University (NYCU)',
      ipParis: 'IP Paris',
      github: 'GitHub',
      salah: 'Salah Eddine Elayoubi',
      vineeth: 'Vineeth S Varma',
      toast: 'TOAST',
      marieSklodowskaCurie: 'Marie Skłodowska-Curie Actions',
      linkedin: 'LinkedIn',
      scholar: 'Google Scholar'
    };
    return names[key] || key;
  }

// Define description with placeholders
export const heroDescription = 
"I am a Taiwanese PhD student studying at {centralesupelec}, University Paris-Saclay, France, where \
I focus on the joint design of control and communication in 5G/6G Tactile Internet, \
under the supervision of my supervisor, {salah}, and my co-supervisor, {vineeth}.\n\n \
I'm now in the {toast} project, a Doctoral Network under {marieSklodowskaCurie} training PhD candidates \
across five European countries in the interdisciplinary field of the Tactile Internet—encompassing haptics, \
teleoperation, edge intelligence, networking, machine learning, and open-source testbed development.\n\n \
My research emphasizes the integration of control and communication systems to address \
challenges in latency, reliability, and efficiency, enabling advanced applications \
in next-generation networks. I'm also interested in the application of Deep learning and Reinforcement Learning in these fields.";

// Function to render description with URLs
export function renderDescriptionWithUrls(elementId, description, urlMap) {
  const element = document.getElementById(elementId);
  if (element) {
    let renderedDescription = description;
    
    // Replace placeholders with actual links
    Object.entries(urlMap).forEach(([key, url]) => {
      const placeholder = `{${key}}`;
      const link = `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">${getDisplayName(key)}</a>`;
      renderedDescription = renderedDescription.replace(placeholder, link);
    });
    
    element.innerHTML = renderedDescription;
  }
}

