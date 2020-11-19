import { getDepartments } from './service';
import { getPersonnel } from './service';

let departments = getDepartments();
let personnel = getPersonnel();

const personnelParamsMap = {
    name: "Name",
    id_dep: "ID dep",
    id: "ID",
}

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

            //Проверка есть ли у элемента дети, если есть добавляем '+'
            if (treeItem.children) {
                liEl.appendChild(getBulltEl());
            }

            const spanEl = document.createElement('span');
            spanEl.classList.add('depName');
            spanEl.innerText = treeItem.name;
            spanEl.dataset.id = treeItem.id;

            liEl.appendChild(spanEl);
            // создаем кнопки редактирования элементов ()

            const controlEleContainer = document.createElement('div');
            controlEleContainer.classList.add('inline_block');


            const addEl = document.createElement('span');
            addEl.dataset.action = "add";
            addEl.innerText = "add";

            const editEl = document.createElement('span');
            editEl.dataset.action = "edit";
            editEl.innerText = "edit";

            controlEleContainer.appendChild(addEl);
            controlEleContainer.appendChild(editEl);

            liEl.appendChild(controlEleContainer);



            parentDOMEL.appendChild(liEl);

            if (treeItem.children && treeItem.children.length) {

                const ulEl = document.createElement('ul');
                liEl.appendChild(ulEl);

                makeDOMTree(treeItem.children, ulEl);
            } else {
                const deleteEl = document.createElement('span');
                deleteEl.innerText = "delete";
                deleteEl.dataset.action = "delete";
                controlEleContainer.appendChild(deleteEl);
            }
        }
    }

}
//-----------------------------------------------------------

// Функия при нажатии на edit (переименование депортамента)
function editDept(deptEl) {
    const deptName = deptEl.innerText;

    const newDepName = prompt('Please ented valid dept name:', deptName);

    if (newDepName === null) {
        return;
    }

    if (newDepName === '') {
        alert('Name is not valid');
        editDept(deptEl);
        return;
    }
    deptEl.innerText = newDepName;
}
//---------------------------------------------------

// Функия при нажатии на delete (удаление депортамента)
function deleteDept(deptId) {
    const yes = confirm('Do you really want to delete dept?')

    if (yes) {
        departments = departments.filter(({ id }) => id !== deptId);

        const jsTree = makeTree(departments);

        const treeContainer = document.getElementById('dom_tree');
        const tree = document.getElementsByClassName('list')[0];

        treeContainer.removeChild(tree);

        const newTree = document.createElement('ul');
        newTree.classList.add('list');

        treeContainer.appendChild(newTree);

        makeDOMTree(jsTree, newTree);
    }
}
//---------------------------------------------------

// Функия при нажатии на add (добавление депортамента)

function addDept(parentDeptId) {


    const newDepName = prompt('Please ented valid dept name:', '');

    if (newDepName === null) {
        return;
    }

    if (newDepName === '') {
        alert('Name is not valid');
        addDept(parentDeptId);
        return
    }


    const newDept = {
        id: generateId(),
        name: newDepName,
        parent_id: parentDeptId,
    };

    departments.push(newDept);

    const jsTree = makeTree(departments);

    const treeContainer = document.getElementById('dom_tree');
    const tree = document.getElementsByClassName('list')[0];

    treeContainer.removeChild(tree);

    const newTree = document.createElement('ul');
    newTree.classList.add('list');

    treeContainer.appendChild(newTree);

    makeDOMTree(jsTree, newTree);
}


// выводит в консоль текст элемента 
document.getElementById('dom_tree').addEventListener('click', (event) => {

    // при нажатии на кнопки редактирования выводит 
    if (event.target.tagName === 'SPAN') {

        if (event.target.dataset.action) {
            const action = event.target.dataset.action;

            const deptEl = event.target.parentElement.previousElementSibling;

            switch (action) {
                case 'edit': {
                    editDept(deptEl)
                    break;
                }
                case 'delete': {
                    deleteDept(+deptEl.dataset.id);
                    break;
                }
                case 'add': {
                    addDept(+deptEl.dataset.id);
                    break;
                }
            }

        } else {
            // Надатие на название департамента.
            console.log(departments);
            console.log(event.target.dataset.id);
        }
        return;
    }
    // ----------------------------------------------------------------

    // настройка кнопки скрывать элементы + и - 
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

// создает зандомный ID
const generateId = (length = 5) => {
    let result = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charsLength = chars.length;
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * charsLength));
    }
    return result;
};
//Строим таблицу 

const tableContainer = document.getElementsByClassName('table_container')[0];
const usersTable = makeTable(personnel);

tableContainer.appendChild(usersTable);

function makeTable(personnel) {
    const tableEl = document.createElement('table');

    const tableHead = document.createElement('thead');
    const trHeadEl = document.createElement('tr');

    for (let key in personnelParamsMap) {
        const col = personnelParamsMap[key];

        const th = document.createElement('th');
        th.innerHTML = col;

        trHeadEl.appendChild(th);
    }
    tableHead.appendChild(trHeadEl);
    tableEl.appendChild(tableHead);

    const tableBody = document.createElement('tbody');

    personnel.forEach(user => {

        const trEl = document.createElement('tr');

        for (let key in personnelParamsMap) {
            const td = document.createElement('td');

            if (key in user) {
                td.innerHTML = user[key];
            }

            trEl.appendChild(td);
        }
        tableBody.appendChild(trEl);
    });
    tableEl.appendChild(tableBody);

    return tableEl;

}
