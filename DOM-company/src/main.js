import { getDepartments } from './service';

const departments = getDepartments();

// const departmentsParamsMap = {
//     name: 'Name',
//     id: 'ID',
//     parent_id: 'Perent ID'
// }
// Функция Создает структурированный массив Родитель - ребенок
function makeTree(arr) {
    const copyArr = makeArrayCopy(arr);

    for (let i = 0; i < copyArr.length; i++) {
        const parent = copyArr[i];

        for (let j = 0; j < copyArr.length; j++) {
            const potentialChild = copyArr[j];

            if (parent.id === potentialChild.parent_id) {
                if (!parent.children) {
                    parent.children = [];
                }

                parent.children.push(potentialChild);
            }
        }
    }

    return copyArr.filter(item => item.parent_id === null);
}
//------------------------------------------------------------------------

const jsTree = makeTree(departments);

// запускаем функцию построения ДОМ дерева 
makeDOMTree(jsTree, document.getElementsByClassName('list')[0]);
// Функия создает ДОМ дерево 
function makeDOMTree(collection, parentDOMEL) {
    if (collection.length) {
        for (let i = 0; i < collection.length; i++) {
            const treeItem = collection[i];

            const liEl = document.createElement('li');
            liEl.innerText = treeItem.name;

            parentDOMEL.appendChild(liEl);

            if (treeItem.children && treeItem.children.length) {

                const ulEl = document.createElement('ul');
                liEl.appendChild(ulEl);

                makeDOMTree(treeItem.children, ulEl);
            }
        }
    }

}
//-----------------------------------------------------------

//выводит в консоль текст элемента 
document.getElementById('dom_tree').addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        console.log(event.target.innerText);
    }
})
//--------------------------------------------------------
//Создаем копию исходных данных (массива)
function makeArrayCopy(arr) {
    return arr.map(item => {
        return { ...item };
    });
}
//------------------------------------------------------------------------