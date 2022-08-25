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
const nyrasilClr = ['#a7c957', '#2a552c'];
const ondonClr = ['#8c5503', '#592B02']; //['#BF7F30', '#733702'];
const lynisClr = ['#400336', '#260D1B'];
const hateusClr = ['#80516E', '#3e0f1e']; //['#80516E', '#60172F']
const dadrozClr = ['#23594F', '#0D0D0D'];
const pharaClr = ['#533C73', '#252140']; //['#48358C', '#252140']
const inanisClr = ['#023059', '#011f32']; //['#023059', '#012840'];
const arkonethClr = ['#590202', '#260101'];
const welaojuntaClr = ['#674057', '#1D1340']; //['#211159', '#1D1340']
const gheeliaClr = ['#8c351b', '#701815'];
const uzgorothClr = ['#40590A', '#281b0b']; //['#40590A', '#402B12']
const ithronelClr = ['#834457', '#311b2d']; //['#59163B', '#0F0826']
const sulamaClr = ['#387dad', '#253759']; //['#2E4E8C', '#253759']
const noxolitziClr = ['#c6c9ac', '#274f17'];
const ilumiyaClr = ['#3B4F8C', '#152340'];
const ayarbiClr = ['#998153', '#40271c'];
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
    changeBgColor(names[currentSlideIndex].innerText.toLowerCase().replace(/['"\s]+/g, ''), names[targetSlideIndex].innerText.toLowerCase().replace(/['"\s]+/g, ''));

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

function changeBgColor(currentName, targetName) {
    currentRGB = [hexToRgb(eval(currentName + "Clr")[0]), hexToRgb(eval(currentName + "Clr")[1])];
    targetRGB = [hexToRgb(eval(targetName + "Clr")[0]), hexToRgb(eval(targetName + "Clr")[1])];
    let root = document.documentElement;

    var handle;

    function varyColorValues() {
        currentRGB[0].r = increaseOrDecrease(currentRGB[0].r, targetRGB[0].r);
        currentRGB[0].g = increaseOrDecrease(currentRGB[0].g, targetRGB[0].g);
        currentRGB[0].b = increaseOrDecrease(currentRGB[0].b, targetRGB[0].b);

        currentRGB[1].r = increaseOrDecrease(currentRGB[1].r, targetRGB[1].r);
        currentRGB[1].g = increaseOrDecrease(currentRGB[1].g, targetRGB[1].g);
        currentRGB[1].b = increaseOrDecrease(currentRGB[1].b, targetRGB[1].b);

        root.style.setProperty('--clr-primary', `rgb(${currentRGB[0].r}, ${currentRGB[0].g}, ${currentRGB[0].b})`);
        root.style.setProperty('--clr-secondary', `rgb(${currentRGB[1].r}, ${currentRGB[1].g}, ${currentRGB[1].b})`);

        if (JSON.stringify(currentRGB) === JSON.stringify(targetRGB)) {
            window.clearInterval(handle);
        }
    }

    if (currentRGB[0] && currentRGB[1] && targetRGB[0] && targetRGB[1]) {
        handle = window.setInterval(function() { varyColorValues() }, 4); // Run each 50ms
    }
}

function increaseOrDecrease(number, target) {
    if (number !== target) {
        number < target ? number += 1 : number -= 1;
    }
    return number;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}