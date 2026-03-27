document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        threshold: 0.1 // Анимация сработает, когда 10% карточки станет видно
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Указываем, за какими элементами следить
    const elementsToAnimate = document.querySelectorAll('.info-card, .info-block h3');

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});
const scrollBtn = document.getElementById("scrollTop");

window.onscroll = function() {
    // Показываем кнопку, если прокрутили больше 300px
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
};

scrollBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};