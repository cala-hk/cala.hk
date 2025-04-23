document.addEventListener('DOMContentLoaded', function() {
    // Set initial state
    const initialLang = localStorage.getItem('preferredLang') || 'yue'; // Default to Cantonese/Chinese
    const initialHash = window.location.hash || '#home'; // Get hash from URL or default to #home
    const initialSectionId = initialHash.substring(1); // Remove '#'

    setLanguage(initialLang);
    showSection(initialSectionId);

    // Update copyright year
    document.getElementById('copy-year').textContent = new Date().getFullYear();

    // Add active class to the initially loaded section's nav link
    updateActiveNav(initialSectionId);
});

function showSection(sectionId) {
    // Hide all content sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        // Update URL hash without jumping
        if (history.pushState) {
            history.pushState(null, null, '#' + sectionId);
        } else {
            window.location.hash = '#' + sectionId;
        }
        updateActiveNav(sectionId); // Update active link style
    } else {
        // Fallback to home if section not found
        document.getElementById('home').style.display = 'block';
         if (history.pushState) {
            history.pushState(null, null, '#home');
        } else {
            window.location.hash = '#home';
        }
        updateActiveNav('home');
    }
}

function setLanguage(lang) {
    // Hide all language elements
    document.querySelectorAll('.lang-yue, .lang-en').forEach(el => {
        el.style.display = 'none';
    });

    // Show selected language elements
    document.querySelectorAll(`.lang-${lang}`).forEach(el => {
        // Maintain original display type (inline for spans, block for others if needed)
        // For simplicity, using 'inline' which works well for spans. Adjust if block elements are used.
         el.style.display = 'inline';
    });

    // Set html lang attribute
    document.documentElement.lang = (lang === 'yue') ? 'yue' : 'en';

    // Store preference
    if (localStorage) {
        localStorage.setItem('preferredLang', lang);
    }
}

function updateActiveNav(activeSectionId) {
     const navLinks = document.querySelectorAll('nav ul li a');
     navLinks.forEach(link => {
        // Remove '#' from href to compare with sectionId
        const linkSectionId = link.getAttribute('href').substring(1);
        if (linkSectionId === activeSectionId) {
            link.classList.add('active');
        } else {
             link.classList.remove('active');
        }
     });
}

// Handle back/forward button navigation
window.addEventListener('popstate', function() {
    const hash = window.location.hash || '#home';
    const sectionId = hash.substring(1);
    showSection(sectionId);
});