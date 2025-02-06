let loadPage;
document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 'inicio';
    const content = document.getElementById('content');
    const menuLinks = document.querySelectorAll('.menu-link');
    // const pageTitle = document.querySelector('.page-title');

    // Función para cargar el contenido de la página
    loadPage = async function(page) {
        console.log(page)
        if (page === null || page === 'salir'){return 0}
        try {
            // Simulamos la carga de contenido
            const response = await fetch(`src/pages/${page}.html`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const html = await response.text();
                content.innerHTML = html;
            // pageTitle.textContent = page.charAt(0).toUpperCase() + page.slice(1);
            const scriptUrl = `src/js/${page}.js?v=${VERSION_JS}`;
            loadScript(scriptUrl)
                .then(() => {
                    console.log(`Script de ${page} cargado`);
                })
                .catch((error) => {
                    console.error('Error al cargar el script de inicio:', error);
                })
        } catch (e) {
            console.error('Error al cargar la página:', e);
            content.innerHTML = '<p>Error al cargar el contenido. Por favor, intenta de nuevo.</p>';
        }
    }

    function removeScript(url) {
        const existingScript = document.querySelector(`script[src="${url}"]`);
        if (existingScript) {
            existingScript.remove();
        }
    }

    function loadScript(url) {
        removeScript(url)
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // Manejar clics en los enlaces del menú
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            if (page && page != null && page != 'null')
                sessionStorage.setItem('page',page);
            loadPage(page);
            // Actualizar clase activa
            menuLinks.forEach(l => l.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');
        });
    });

    // Cargar la página de inicio por defecto
    currentPage = sessionStorage.getItem('page');
    loadPage(currentPage? currentPage : 'inicio');
});

function formatearValorPesos(numero) {
    var value = numero.toString().replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return value;
}


