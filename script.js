document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".slides");
    const slides = document.querySelectorAll(".testimonial");
    const dots = document.querySelectorAll(".dot");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    
    let currentIndex = 0;
    const slideCount = slides.length;
    const slideWidth = slides[0].offsetWidth + 30;


    let autoSlideInterval;

    function updateSlider(index) {
   
        carousel.style.transform = `translateX(calc(50% - ${index * slideWidth + slideWidth/2}px))`;
      
        slides.forEach((slide, i) => {
            slide.classList.remove("active", "prev-slide", "next-slide");
            
            if (i === index) {
                slide.classList.add("active");
            } else if (i === index - 1 || (index === 0 && i === slideCount - 1)) {
                slide.classList.add("prev-slide");
            } else if (i === index + 1 || (index === slideCount - 1 && i === 0)) {
                slide.classList.add("next-slide");
            }
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex < slideCount - 1) ? currentIndex + 1 : 0;
            updateSlider(currentIndex);
        }, 3000); 
    }

    // 3. FUNCIÓN PARA DETENER
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slideCount - 1;
        updateSlider(currentIndex);
       
        stopAutoSlide();
        startAutoSlide();
    });

    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex < slideCount - 1) ? currentIndex + 1 : 0;
        updateSlider(currentIndex);
     
        stopAutoSlide();
        startAutoSlide();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index;
            updateSlider(currentIndex);
            // INTERACTUAR
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // AUTOLOOP
    startAutoSlide();

    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    updateSlider(currentIndex);

    window.addEventListener("resize", () => {
        const newSlideWidth = slides[0].offsetWidth + 30;
        carousel.style.transform = `translateX(calc(50% - ${currentIndex * newSlideWidth + newSlideWidth/2}px))`;
    });
});
// MENÚ HAMBURGUESA MEJORADO
document.addEventListener('DOMContentLoaded', function() {
    // 1. Selección de elementos con validación
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (!menuToggle || !nav) {
        console.error('No se encontraron los elementos del menú');
        return;
    }

    // 2. Función toggle mejorada
    const toggleMenu = function() {
        const isActive = nav.classList.contains('active');
        
        // Alternar clases
        menuToggle.classList.toggle('active', !isActive);
        nav.classList.toggle('active', !isActive);
        
        // Bloquear scroll
        document.body.style.overflow = isActive ? '' : 'hidden';
    };

    // 3. Evento del botón hamburguesa
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    // 4. Cerrar al hacer click fuera - VERSIÓN SEGURA
    document.addEventListener('click', function(e) {
        // Verificar:
        // - Si el menú está abierto
        // - Si el click NO fue en el botón
        // - Si el click NO fue dentro del menú
        if (nav.classList.contains('active') && 
            e.target !== menuToggle && 
            !menuToggle.contains(e.target) && 
            !nav.contains(e.target)) {
            toggleMenu();
        }
    });

    // 5. Cerrar al seleccionar enlace (mobile)
    document.querySelectorAll('nav a').forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });
});