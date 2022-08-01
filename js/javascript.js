'use strict';

import FobElement from './elements/fob-elem.js';
import SplitElement from './elements/split-elem.js';
import SplitTypeSelect from './elements/split-type-select.js';
import ButtonCreateElement from './elements/button-create-element.js';


function isSpecialNumber(n) {
    let str = `${n}`;
    let special = false;

    for (let i = 0; i < str.length; i++) {

        if (+str[i] > 5) return 'NOT!!'

        special = (+str[i] <= 5 ) ? true : false;

    }

    if (special) {
        return 'Special!!'
    }
}

// === ['ab', 'c_'];
console.log('splitString: ', isSpecialNumber(6));

// [ 'ROBOT',
//   'OBOTR',
//   'BOTRO',
//   'OTROB',
//   'TROBO' 




let changeSplitData = (option, selectedType) => {
    let split = option.closest('.split');
    let [id, type] = [split.dataset.id, split.dataset.type];
    let outSplit = split.querySelector('.out-split');
    let rows = split.querySelectorAll(`.row[data-id="${id}"] `);

    let selectedOption = option.options[option.selectedIndex].value;

    if (selectedType) {
       
        split.dataset.type = selectedOption;
        split.dataset.fiber = createSplitOptions(split, selectedOption);
        
        if (selectedOption === 'FBT') {
            cleanOutRowsSplit(rows, rows.length)
        }

    } else {
        let getLenghtOutFibers = selectedOption.replace(/1x/, '');
        split.dataset.fiber = selectedOption;
        
        if (type === 'PLC' && getLenghtOutFibers > rows.length) {
            for (let i = rows.length; i < getLenghtOutFibers; i++) {
                outSplit.insertAdjacentHTML('beforeend', `<div class="row" data-id="${id}"><input class="out-signal" data-id="${id}" name="out-split" value="0" disabled><button class="btn-split create-split">+</button></div>`);
            }
        } else {
            cleanOutRowsSplit(rows, rows.length, getLenghtOutFibers)
        }
    }
};

let cleanOutRowsSplit = (rows, rowsLenght, lenghtOutFibers = 2) => {
    for (let i = rowsLenght - 1; i >= lenghtOutFibers; --i) {
        rows[i].remove();
    }
};

let createSplitOptions = (split, splitType) => {
    let splitFiber = split.querySelector('.select-fiber');

    splitFiber.innerHTML = '';
    let outFibers = Object.keys(objSplit[splitType]);

    [...outFibers].forEach((item)  =>  { 
        let option = document.createElement('option');
        option.value = item;
        option.innerText = item.replace(/x/, '/');

        splitFiber.append(option);
    });

    return outFibers[0];
};

let calcSignal = (inSignal) => {
    [...document.querySelectorAll('.split')].forEach((split) => {
        let [idDataSplit, typeDataSplit, fiberDataSplit] = [split.dataset.id, split.dataset.type, split.dataset.fiber];
        let dataSplit = objSplit[typeDataSplit][fiberDataSplit];
       
        let splitInSignal = split.previousElementSibling.previousElementSibling;
        let setSplitSignal = split.closest('.row').querySelector('.in-split').value = splitInSignal = (splitInSignal === null) ? inSignal : splitInSignal.value;

        let outSplitSignalElement = split.querySelectorAll(`.out-signal[data-id='${idDataSplit}']`);
        
        let nameSplit, valueSplit, result;
        if (typeDataSplit === 'FBT') {
            let i = 0;

            for ([nameSplit, valueSplit] of Object.entries(dataSplit)) {
                result = splitInSignal - valueSplit;
                outSplitSignalElement[i].value = result.toFixed(2);

                i++;
            }

        } else {
            valueSplit = dataSplit;
            result = splitInSignal - valueSplit;

            [...outSplitSignalElement].forEach((element) =>{
                element.value = result.toFixed(2);
            })
        }
    });
};

// let idSplit = 1;
// calcContainer.addEventListener('click', (event) => {
//     const target = event.target;
    
//     if (target.matches('.create-split')) {
//         let addSplit = createSplit(idSplit++);
//         target.insertAdjacentHTML('afterend', addSplit);

//         target.textContent = '-';
//         target.classList.replace('create-split','remove-split');
//     } else if(target.matches('.remove-split')) {
//         let removeBtn = target;
//         let hasChainSplitter = removeBtn.nextElementSibling.querySelector('.remove-split');

//         if (hasChainSplitter) {
//             (confirm('You want remove chain splitter?')) ? removeChainSplitter() : false ;
//         } else {
//             removeChainSplitter();
//         }

//         function removeChainSplitter() {
//             removeBtn.nextElementSibling.remove();
//             removeBtn.textContent = '+';
//             removeBtn.classList.replace('remove-split','create-split');
//         }
//     }
// });

// let createSplit = (id) => {
//     return `
//     <div class="split" data-id="${id}" data-type="FBT" data-fiber="5_95">
//         <div class="row split-selected">
//           <select class="select-type">
//             <option value="FBT">FBT</option>
//             <option value="PLC">PLC</option>
//           </select>
//           <select class="select-fiber">
//             <option value="5_95">5/95</option>
//             <option value="10_90">10/90</option>
//             <option value="15_85">15/85</option>
//           </select>
//         </div>
//         <div class="vertical-center"><input class="in-split" name="in-signal" value="0" disabled=""></div>
//         <div class="column out-split">
//             <div class="row" data-id="${id}"><input class="out-signal" data-id="${id}" name="out-split" value="0" disabled><button class="btn-split create-split">+</button></div>
//             <div class="row" data-id="${id}"><input class="out-signal" data-id="${id}" name="out-split" value="0" disabled><button class="btn-split create-split">+</button></div>
//         </div>
//     </div>`;
// };

let setSplitType = () => {
    [...document.querySelectorAll('.split')].forEach((split) => {
       let data =  split.dataset.type;
       let selectType = split.querySelector('.select-type');
       selectType = (selectType === null) ? false : selectType.getElementsByTagName('option'); 
    //    console.log('selectType: ', selectType);

       for (let i = 0; i < selectType.length; i++) {
            if (selectType[i].value === data){
                selectType[i].selected = true;
            };
        }
    });
};

setSplitType();