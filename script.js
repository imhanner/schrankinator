const data = {};
const getInputTitle = () => document.getElementById('inputTitle');
const getInputContent = () => document.getElementById('inputContent');

function setup() {

    const form = document.querySelector(`form`);
    form.addEventListener('submit', event => {
        event.preventDefault();
        console.log('submit');

        const current = document.querySelector(`.box.current`);
        if (current) {
            data[`${current.id}`] = {
                title: getInputTitle().value,
                content: getInputContent().value
            };
            update(current);
        }
    });

    const boxes = document.querySelectorAll(`.container .box`);
    boxes.forEach(element => {
        update(element);

        element.addEventListener('click', () => {
            console.log(`click ${element.id}`);

            boxes.forEach(box => box.classList.remove('current'));
            element.classList.add('current');

            const inputTitle = getInputTitle();
            const inputContent = getInputContent();

            inputTitle.value = data[`${element.id}`]?.title ?? "";
            inputContent.value = data[`${element.id}`]?.content ?? "";

            form.classList.remove('d-none');
            form.scrollIntoView();
            inputTitle.select();
            inputTitle.focus();
        });
    });
}

function update(element) {
    element.title = data[`${element.id}`]?.title ?? element.id;
}

