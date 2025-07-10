document.addEventListener('DOMContentLoaded', function() {
    // Load header and footer
    loadComponent('header', 'partials/header.html', () => {
        // After header loads, set language and update nav
        const initialLang = localStorage.getItem('preferredLang') || 'yue';
        setLanguage(initialLang);
        updateActiveNav();
    });
    loadComponent('footer', 'partials/footer.html', () => {
        // After footer loads, update copyright year
        document.getElementById('copy-year').textContent = new Date().getFullYear();
    });
});

function loadComponent(elementId, url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const placeholder = document.getElementById(elementId);
            if (placeholder) {
                // Create a temporary container to parse the HTML
                const temp = document.createElement('div');
                temp.innerHTML = data;

                // Use a document fragment to hold the nodes to avoid reflows
                const fragment = document.createDocumentFragment();
                // Append all children from temp to the fragment
                while (temp.firstChild) {
                    fragment.appendChild(temp.firstChild);
                }
                
                // Replace the placeholder with the fragment's content
                placeholder.parentNode.replaceChild(fragment, placeholder);
            }

            if (callback) {
                callback();
            }
        })
        .catch(error => console.error(`Error loading ${url}:`, error));
}

function setLanguage(lang) {
    // This function remains mostly the same, but we need to ensure it runs after the header is loaded.
    // The logic is now called in the header's loadComponent callback.
    document.querySelectorAll('.lang-yue, .lang-en').forEach(el => {
        el.style.display = 'none';
    });

    document.querySelectorAll(`.lang-${lang}`).forEach(el => {
        el.style.display = 'inline';
    });

    document.documentElement.lang = (lang === 'yue') ? 'yue' : 'en';

    if (localStorage) {
        localStorage.setItem('preferredLang', lang);
    }
}

function updateActiveNav() {
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPage = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}