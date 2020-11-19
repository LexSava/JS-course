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
            const spanEl = document.createElement('span');
            spanEl.innerText = treeItem.name;
            //Проверка есть ли у элемента дети, если есть добавляем '+'
            if (treeItem.children) {
                liEl.appendChild(getBulltEl());
            }


            liEl.appendChild(spanEl);
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
    if (event.target.tagName === 'I') {
        event.target.classList.toggle('collapsed');
        const children = event.target.parentElement.children;


        if (children && children.length) {
            for (let i = 0; i < children.length; i++) {

                if (children[i].tagName === 'UL') {
                    children[i].classList.toggle('hidden');
                }
            }
        }
    }
})
//--------------------------------------------------------
function getBulltEl() {
    const bulletEl = document.createElement('i');
    //icon
    //     bulletEl.innerHTML = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-right-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    //     <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
    //   </svg>`;
    bulletEl.classList.add('collapsed');
    return bulletEl;
}

//Создаем копию исходных данных (массива)
function makeArrayCopy(arr) {
    return arr.map(item => {
        return { ...item };
    });
}
//------------------------------------------------------------------------