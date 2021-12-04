let data = {};
const connections = [
    [ 2, 3],
    [ 4, 5],
    [ 6, 7],
    [ 9,10],
    [11,12],
    [19,20],
    [21,22],
    [23,24],
    [27,28],
    [29,30],
];
const connectedBoxesOf = (box) => {
    const currentId = Number(box.id);
    const connectedBoxIds = new Set(connections
        .filter(connection => connection.includes(currentId))
        .flat()
        .filter(id => id !== currentId)
    );
    return [...connectedBoxIds].map(id => document.getElementById(id)).filter(box => box);
};
const getBoxes = () => document.querySelectorAll(`.container .box`);
const getForm = () => document.querySelector(`form`);
const getInputTitle = () => document.getElementById('inputTitle');
const getInputContent = () => document.getElementById('inputContent');

function setup() {

    const form = document.querySelector(`form`);
    form.addEventListener('submit', event => {
        event.preventDefault();
        console.log('submit');

        document.querySelectorAll(`.box.current`).forEach(current => {
            data[`${current.id}`] = {
                title: getInputTitle().value,
                content: getInputContent().value
            };
            update(current);
        });
    });

    const boxes = getBoxes();
    boxes.forEach(box => {
        update(box);

        box.addEventListener('click', () => {
            console.log(`click ${box.id}`);

            clearCurrentBoxSelection();
            box.classList.add('current');
            connectedBoxesOf(box).forEach(connectedBox => connectedBox.classList.add('current'));

            const inputTitle = getInputTitle();
            const inputContent = getInputContent();

            inputTitle.value = data[`${box.id}`]?.title ?? "";
            inputContent.value = data[`${box.id}`]?.content ?? "";

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

function clearCurrentBoxSelection() {
    getBoxes().forEach(box => box.classList.remove('current'));
    getInputTitle().value = '';
    getInputContent().value = '';
    getForm().classList.add('d-none');
}

function exportJson() {
    const a = document.createElement('a');
    a.classList.add = 'd-none';
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data)], { type: 'application/json' }));
    a.download = 'schrank.json';
    a.target = '_blank'

    // It needs to be added to the DOM so it can be clicked
    document.body.appendChild(a);
    a.click();
    a.remove();
}

function importJson(input) {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        data = JSON.parse(event.target.result);
        getBoxes().forEach(update);
        clearCurrentBoxSelection();
    });
    reader.readAsText(input.files[0]);
}
