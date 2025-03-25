document.addEventListener('DOMContentLoaded', function() {
    // Suavizar rolagem para as seções
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Adiciona classe ativa ao menu
                document.querySelectorAll('.menu a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Formulário de confirmação de presença
    const confirmacaoForm = document.getElementById('confirmacao-form');
    const confirmacaoSucesso = document.getElementById('confirmacao-sucesso');
    
    if (confirmacaoForm) {
        confirmacaoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envio do formulário
            setTimeout(() => {
                confirmacaoForm.style.display = 'none';
                confirmacaoSucesso.style.display = 'block';
                
                // Rolagem suave para o topo da mensagem de sucesso
                window.scrollTo({
                    top: confirmacaoSucesso.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Resetar formulário (opcional)
                confirmacaoForm.reset();
            }, 1000);
        });
    }
    
    // Carrossel de fotos
    const carrosselContainer = document.querySelector('.carrossel-container');
    const carrosselItems = document.querySelectorAll('.carrossel-item');
    const prevBtn = document.querySelector('.carrossel-controle.prev');
    const nextBtn = document.querySelector('.carrossel-controle.next');
    let currentIndex = 0;
    
    function showSlide(index) {
        carrosselItems.forEach(item => item.classList.remove('active'));
        carrosselItems[index].classList.add('active');
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % carrosselItems.length;
        showSlide(currentIndex);
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + carrosselItems.length) % carrosselItems.length;
        showSlide(currentIndex);
    }
    
    // Event listeners para os botões
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-play (opcional)
    let carrosselInterval = setInterval(nextSlide, 5000);
    
    // Pausar auto-play quando o mouse estiver sobre o carrossel
    const carrossel = document.querySelector('.carrossel');
    carrossel.addEventListener('mouseenter', () => {
        clearInterval(carrosselInterval);
    });
    
    carrossel.addEventListener('mouseleave', () => {
        carrosselInterval = setInterval(nextSlide, 5000);
    });
    
    // Modal de pagamento
    const modal = document.getElementById('modal-pagamento');
    const btnPresentear = document.querySelectorAll('.btn-presentear');
    const closeModal = document.querySelector('.close-modal');
    const copiarChave = document.getElementById('copiar-chave');
    
    // Abrir modal ao clicar em "Presentear"
    btnPresentear.forEach(btn => {
        btn.addEventListener('click', function() {
            const presente = this.getAttribute('data-presente');
            const valor = this.getAttribute('data-valor');
            
            document.getElementById('modal-titulo').textContent = `Presentear com ${presente} - R$ ${valor},00`;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Impede rolagem do body
        });
    });
    
    // Fechar modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Fechar modal ao clicar fora dele
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Copiar chave PIX
    if (copiarChave) {
        copiarChave.addEventListener('click', function() {
            const chavePix = 'yasmin.thiago@casamento.com';
            
            navigator.clipboard.writeText(chavePix).then(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Copiado!';
                setTimeout(() => {
                    this.innerHTML = 'Copiar Chave';
                }, 2000);
            }).catch(err => {
                console.error('Erro ao copiar texto: ', err);
            });
        });
    }
    
    // Efeito de rolagem para revelar elementos
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.secao').forEach(section => {
        observer.observe(section);
    });
    
    // Ativar menu conforme rolagem
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('.secao').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('.menu a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});

// Garantir que a imagem de fundo carregue corretamente
window.addEventListener('load', function() {
    const banner = document.querySelector('.banner');
    if (banner) {
        // Forçar redesenho do banner
        banner.style.display = 'none';
        banner.offsetHeight; // Trigger reflow
        banner.style.display = 'flex';
        
        // Verificar se a imagem carregou
        const bannerImg = document.querySelector('.banner-background img');
        if (bannerImg && bannerImg.complete && bannerImg.naturalHeight === 0) {
            // Se a imagem falhou, usar fallback
            bannerImg.src = 'img/fotobuffet-desktop.jpg';
        }
    }
});

// Fallback para browsers antigos que não suportam <picture>
if (!('HTMLPictureElement' in window)) {
    const bannerBg = document.querySelector('.banner-background');
    if (bannerBg) {
        const img = bannerBg.querySelector('img');
        if (window.innerWidth >= 768) {
            img.src = 'img/fotobuffet-desktop.jpg';
        } else {
            img.src = 'img/fotobuffet-mobile.jpg';
        }
    }
}

