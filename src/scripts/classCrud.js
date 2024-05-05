const addClass = (element, className) => {
    if (element === null) {
        console.log('err')
    }
    element.classList.add(className);
};

const removeClass = (element, className) => {
    element.classList.remove(className);
};

export { addClass, removeClass }