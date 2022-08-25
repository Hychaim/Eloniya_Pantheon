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

// Colors
const aizziaClr = ['#343959', '#1A1826'];
const nyrasilClr = ['#F2E96B', '#5E8C18'];
const ondonClr = ['#BF7F30', '#733702'];
const lynisClr = ['#400336', '#260D1B']; // ['#D93D76', '#400336']
const hateusClr = ['#80516E', '#60172F'];
const dadrozClr = ['#23594F', '#0D0D0D'];
const pharaClr = ['#48358C', '#252140'];
const inanisClr = ['#023059', '#012840'];
const arkonethClr = ['#590202', '#260101'];
const welaojuntaClr = ['#211159', '#1D1340'];
const gheeliaClr = ['#D92525', '#A61F1F'];
const uzgorothClr = ['#40590A', '#402B12'];
const ithronelClr = ['#59163B', '#0F0826'];
const sulamaClr = ['#2E4E8C', '#253759'];
const noxolitziClr = ['#A65D33', '#403E29'];
const ilumiyaClr = ['#3B4F8C', '#152340'];
const ayarbiClr = ['#735B46', '#242610'];
const azgonodClr = ['#26010F', '#000214'];

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
    changeBgColor(names[targetSlideIndex].innerText.toLowerCase().replace(/['"\s]+/g, ''));

    illusSlides[targetSlideIndex].style.transform = 'translateX(0px)';
    illusSlides[currentSlideIndex].style.transform = 'translateX(' + illusSlideWidth + 'px)';
    illusSlides[currentSlideIndex].classList.remove('current-slide');
    illusSlides[targetSlideIndex].classList.add('current-slide');

    blazonsSlides[targetSlideIndex].style.transform = 'translateX(0px)';
    blazonsSlides[currentSlideIndex].style.transform = 'translateX(' + blazonsSlideWidth + 'px)';
    blazonsSlides[currentSlideIndex].classList.remove('current-slide');
    blazonsSlides[targetSlideIndex].classList.add('current-slide');

    toggleCurrentSlide(names, currentSlideIndex, targetSlideIndex);
    toggleCurrentSlide(titles, currentSlideIndex, targetSlideIndex);
    toggleCurrentSlide(descriptions, currentSlideIndex, targetSlideIndex);
}

const updateStepItem = (currentStepItem, targetStepItem) => {
    currentStepItem.classList.remove('current-slide');
    targetStepItem.classList.add('current-slide');
}

const toggleCurrentSlide = (textList, currentSlideIndex, targetSlideIndex) => {
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
    updateStepItem(currentStepItem, targetStepItem);
});

function changeBgColor(curretnName, targetName) {
    colors = eval(name + "Clr");
    let root = document.documentElement;

    root.style.setProperty('--clr-primary', colors[0]);
    root.style.setProperty('--clr-primary-dark', colors[1]);
}