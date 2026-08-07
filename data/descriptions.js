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
  scholar: 'https://scholar.google.com/citations?user=AgPmc-cAAAAJ&hl=en',
  publications: '/publications/publications.html',
  cv: '/assets/files/cv.pdf'
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

// Homepage profile card content. Keep visible profile details here so they can
// be updated without editing the page markup.
export const heroProfile = {
  eyebrow: 'Networked control · Tactile Internet · 5G/6G',
  name: 'Yu Yeh',
  title: 'PhD Student at L2S, CentraleSupélec',
  institution: 'Université Paris-Saclay',
  description: heroDescription,
  photo: {
    src: '/assets/images/profile_photo.jpg',
    alt: 'Portrait of Yu Yeh'
  },
  actions: [
    { id: 'heroPublications', label: 'View publications', href: urls.publications },
    { id: 'heroCv', label: 'View CV', href: urls.cv },
    { id: 'heroScholar', label: 'Google Scholar', href: urls.scholar }
  ]
};

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

export function renderHeroProfile(profile = heroProfile) {
  const textFields = {
    heroEyebrow: profile.eyebrow,
    heroName: profile.name,
    heroTitle: profile.title,
    heroInstitution: profile.institution
  };

  Object.entries(textFields).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  });

  const photo = document.getElementById('heroPhoto');
  if (photo) {
    photo.src = profile.photo.src;
    photo.alt = profile.photo.alt;
  }

  profile.actions.forEach((action) => {
    const link = document.getElementById(action.id);
    if (!link) return;
    link.textContent = action.label;
    link.href = action.href;
  });

  renderDescriptionWithUrls('heroDescription', profile.description, urls);
}
