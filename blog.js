/* ========================================
   Blog Page JavaScript
======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Blog Filter Functionality
    // ========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    const searchInput = document.getElementById('searchInput');
    
    // Filter by category
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter posts
            blogCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            blogCards.forEach(card => {
                const title = card.querySelector('.blog-title').textContent.toLowerCase();
                const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
                const category = card.querySelector('.blog-category').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Reset filter buttons
            filterButtons.forEach(b => b.classList.remove('active'));
        });
    }
    
    // ========================================
    // Blog Post Dynamic Content
    // ========================================
    const blogPosts = {
        1: {
            title: {
                en: "8 Signs That Your Relationship Is Over",
                es: "8 Señales de Que Tu Relación Terminó"
            },
            category: { en: "Relationships", es: "Relaciones" },
            image: "images/350630503_1586047888553853_6206773096395252549_n.jpg",
            date: "March 14, 2024",
            readTime: "5 min read"
        },
        2: {
            title: {
                en: "Communication Breakdown: How to Reconnect",
                es: "Ruptura de Comunicación: Cómo Reconectar"
            },
            category: { en: "Communication", es: "Comunicación" },
            image: "images/350540271_3507701999464846_8280952503391409201_n.jpg",
            date: "March 12, 2024",
            readTime: "6 min read"
        },
        3: {
            title: {
                en: "The Benefits of Mindful Eating",
                es: "Las Ventajas del Mindful Eating"
            },
            category: { en: "Wellness", es: "Bienestar" },
            image: "images/481117569_649651740864062_1600685201661437948_n.jpg",
            date: "March 10, 2024",
            readTime: "4 min read"
        },
        4: {
            title: {
                en: "The Power of Smiling: Voluntary and Involuntary",
                es: "El Poder de Sonreír: Voluntaria e Involuntariamente"
            },
            category: { en: "Mental Health", es: "Salud Mental" },
            image: "images/480931755_649521474210422_8021158751143666965_n.jpg",
            date: "March 8, 2024",
            readTime: "4 min read"
        },
        5: {
            title: {
                en: "Get Adolescents Involved: Consider Their Opinion",
                es: "Haz Que Se Involucren: Considera Su Opinión"
            },
            category: { en: "Parenting", es: "Crianza" },
            image: "images/481009061_649521480877088_4017605672016130836_n.jpg",
            date: "March 6, 2024",
            readTime: "5 min read"
        },
        6: {
            title: {
                en: "A Man Who Understands Himself Gains Internal Freedom",
                es: "Un Hombre Que Se Entiende No Pierde Poder, Gana Libertad Interna"
            },
            category: { en: "Personal Growth", es: "Crecimiento Personal" },
            image: "images/642393365_928601772969056_1061125948506107279_n.jpg",
            date: "March 4, 2024",
            readTime: "6 min read"
        },
        7: {
            title: {
                en: "5 Techniques to Manage Anxiety",
                es: "5 Técnicas para Manejar la Ansiedad"
            },
            category: { en: "Mental Health", es: "Salud Mental" },
            image: "images/270131244_127109693118272_4378679732040315319_n.jpg",
            date: "March 2, 2024",
            readTime: "5 min read"
        },
        8: {
            title: {
                en: "How to Create a Self-Care Routine",
                es: "Cómo Crear una Rutina de Autocuidado"
            },
            category: { en: "Wellness", es: "Bienestar" },
            image: "images/633722180_917713054057928_5941644025081861842_n.jpg",
            date: "February 28, 2024",
            readTime: "4 min read"
        },
        9: {
            title: {
                en: "Building Resilience in Difficult Times",
                es: "Construyendo Resiliencia en Tiempos Difíciles"
            },
            category: { en: "Personal Growth", es: "Crecimiento Personal" },
            image: "images/636673216_924501873379046_3196286490393158550_n.jpg",
            date: "February 26, 2024",
            readTime: "5 min read"
        }
    };
    
    // Load blog post data if on blog-post.html
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    if (postId && blogPosts[postId]) {
        const post = blogPosts[postId];
        const currentLang = localStorage.getItem('preferredLanguage') || 'en';
        
        // Update page content
        const postTitle = document.getElementById('postTitle');
        const postCategory = document.getElementById('postCategory');
        const postFeaturedImage = document.getElementById('postFeaturedImage');
        const postDate = document.getElementById('postDate');
        const readTime = document.getElementById('readTime');
        
        if (postTitle) postTitle.textContent = post.title[currentLang];
        if (postCategory) postCategory.textContent = post.category[currentLang];
        if (postFeaturedImage) postFeaturedImage.src = post.image;
        if (postDate) postDate.textContent = post.date;
        if (readTime) readTime.textContent = post.readTime;
        
        // Update page title
        document.title = `${post.title[currentLang]} | Psychologist Erika Studnek`;
    }
    
    // ========================================
    // Share Buttons Functionality
    // ========================================
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            if (btn.classList.contains('facebook')) {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
            } else if (btn.classList.contains('twitter')) {
                window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank', 'width=600,height=400');
            } else if (btn.classList.contains('whatsapp')) {
                window.open(`https://wa.me/?text=${title}%20${url}`, '_blank', 'width=600,height=400');
            } else if (btn.classList.contains('email')) {
                window.location.href = `mailto:?subject=${title}&body=${url}`;
            }
        });
    });
    
    // ========================================
    // Pagination (Demo)
    // ========================================
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!btn.classList.contains('next')) {
                paginationBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // In a real implementation, this would load different posts
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
    
});
