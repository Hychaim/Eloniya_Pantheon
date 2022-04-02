console.log("WIDTH: ", window.innerWidth, "HEIGHT: ", window.innerHeight);
console.log("Ratio: ", window.innerWidth / window.innerHeight);

const illusTrack = document.querySelector('.illus__track');
const illusSlides = Array.from(illusTrack.children);
const blazonsTrack = document.querySelector('.blazons__track');
const blazonsSlides = Array.from(blazonsTrack.children);
const names = Array.from(document.querySelector('.names').children);
const titles = Array.from(document.querySelector('.titles').children);
const descriptions = Array.from(document.querySelector('.descriptions').children);
const stepbarNav = document.querySelector('.step-bar>ul');
const stepbarItems = Array.from(document.querySelector('.step-bar>ul').children);
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

console.log('Names : ', names);
console.log('Titles : ', titles);
console.log('Descriptions : ', descriptions);

// Arange the illusSlides next to one another
var illusSlideWidth = illusSlides[0].getBoundingClientRect().width;
var blazonsSlideWidth = blazonsSlides[0].getBoundingClientRect().width;

const SetSlidePosition = (slide, index) => {
    slideWidth = slide.getBoundingClientRect().width;
    if (slide.classList.contains('current-slide')) return;
    slide.style.transform = 'translateX(' + slideWidth + 'px)';
}

window.onload = illusSlides.forEach(SetSlidePosition);
window.onload = blazonsSlides.forEach(SetSlidePosition);

const moveToSlide = (currentSlideIndex, targetSlideIndex) => {
    illusSlides[targetSlideIndex].style.transform = 'translateX(0px)';
    illusSlides[currentSlideIndex].style.transform = 'translateX(' + illusSlideWidth + 'px)';
    illusSlides[currentSlideIndex].classList.remove('current-slide');
    illusSlides[targetSlideIndex].classList.add('current-slide');

    blazonsSlides[targetSlideIndex].style.transform = 'translateX(0px)';
    blazonsSlides[currentSlideIndex].style.transform = 'translateX(' + blazonsSlideWidth + 'px)';
    blazonsSlides[currentSlideIndex].classList.remove('current-slide');
    blazonsSlides[targetSlideIndex].classList.add('current-slide');

    updatetext(names, currentSlideIndex, targetSlideIndex);
    updatetext(titles, currentSlideIndex, targetSlideIndex);
    updatetext(descriptions, currentSlideIndex, targetSlideIndex);
}

const updateStepItem = (currentStepItem, targetStepItem) => {
    currentStepItem.classList.remove('current-slide');
    targetStepItem.classList.add('current-slide');
}

const updatetext = (textList, currentSlideIndex, targetSlideIndex) => {
    textList[currentSlideIndex].classList.remove('current-slide');
    textList[targetSlideIndex].classList.add('current-slide');
}

// Move the illusSlides right when I click the right button
nextBtn.addEventListener('click', e => {
    const currentSlide = illusTrack.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling ?
        currentSlide.nextElementSibling : illusTrack.firstElementChild;
    const currentStepItem = stepbarNav.querySelector('.current-slide');
    const nextStepItem = currentStepItem.nextElementSibling ?
        currentStepItem.nextElementSibling : stepbarNav.firstElementChild;
    moveToSlide(illusSlides.findIndex(illusSlide => illusSlide === currentSlide),
        illusSlides.findIndex(illusSlide => illusSlide === nextSlide));
    updateStepItem(currentStepItem, nextStepItem);
});

// Move the illusSlides left when I click the left button
prevBtn.addEventListener('click', e => {
    const currentSlide = illusTrack.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling ?
        currentSlide.previousElementSibling : illusTrack.lastElementChild;
    const currentStepItem = stepbarNav.querySelector('.current-slide');
    const prevStepItem = currentStepItem.previousElementSibling ?
        currentStepItem.previousElementSibling : stepbarNav.lastElementChild;
    moveToSlide(illusSlides.findIndex(illusSlide => illusSlide === currentSlide),
        illusSlides.findIndex(illusSlide => illusSlide === prevSlide));
    updateStepItem(currentStepItem, prevStepItem);
});

// Move to the slide when I click it in the nav
stepbarNav.addEventListener('click', e => {
    const targetStepItem = e.target.closest('li');
    const currentStepItem = stepbarNav.querySelector('.current-slide');
    if (!targetStepItem || (targetStepItem === currentStepItem)) return;
    const currentSlide = illusTrack.querySelector('.current-slide');
    const targetIndex = stepbarItems.findIndex(stepbarItem => stepbarItem === targetStepItem);
    const targetSlide = illusSlides[targetIndex];

    moveToSlide(illusSlides.findIndex(illusSlide => illusSlide === currentSlide),
        illusSlides.findIndex(illusSlide => illusSlide === targetSlide));
    updateStepItem(currentStepItem, targetStepItem)
});


// console.log('DEBUG : ', track);