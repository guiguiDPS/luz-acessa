const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentIndex = 0;

function updateCarousel() {
    const itemWidth = items[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === items.length - 1;
}

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextButton.addEventListener('click', () => {
    if (currentIndex < items.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

updateCarousel();

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 0);
    changeActiveLink();
});

const headerMenu = document.querySelector(".header__menu"),
      menuBtn = document.querySelector(".menu-btn"),
      headerMenuItems = headerMenu.querySelectorAll("li a");

menuBtn.addEventListener("click", () => {
    headerMenu.classList.toggle("show");
    menuBtn.classList.toggle('open');
});

headerMenuItems.forEach((item) => {
    item.addEventListener("click", () => {
        headerMenu.classList.remove("show");
        menuBtn.classList.remove('open');
    });
});



function changeActiveLink() {
    let maxSectionIndex = -1, maxSectionOffset = Number.NEGATIVE_INFINITY;

    headerMenuItems.forEach((link, index) => {
        const sectionSelector = link.getAttribute("href");
        const section = document.querySelector(sectionSelector);

        if (section) {
            const offsetTop = section.getBoundingClientRect().top + window.scrollY;

            if (window.scrollY >= offsetTop - header.offsetHeight) {
                if (offsetTop > maxSectionOffset) {
                    maxSectionOffset = offsetTop;
                    maxSectionIndex = index;
                }
            }
        }
    });

    if (maxSectionIndex >= 0) {
        headerMenuItems.forEach(link => link.classList.remove('active'));
        headerMenuItems[maxSectionIndex].classList.add('active');
    }
}

document.addEventListener("DOMContentLoaded", changeActiveLink);