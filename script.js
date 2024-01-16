'use strict';

const titleInput = document.querySelector('#title-input');
const keyVerse = document.querySelector('#flagship-verse-input');

const sectionsContainer = document.querySelector('#sections-container');

const addSectBtn = document.querySelector('#add-section-btn');
const saveBtn = document.querySelector('#save-btn');

const createNewRow = function () {
    const newRow = document.createElement('li');
    newRow.innerHTML = `
        <div id="div-content">
            <div class="flex-row-center">
                <input class="form-input sentence" type="text" placeholder="Main Point">
                <input class="form-input sentence" type="text" placeholder="Supporting Context">
                <input class="form-input sentence" type=text" placeholder="Supporting References">
            </div>
            <div>
                <button class="btn--style" id="add-column-btn">Add Column</button>
                <button class="btn--style" id="add-subrow-btn">Add Sub-Row</button>
                <button class="btn--style" id="delete-row-btn">Delete Row</button>
            </div>
        </div>



    `;

    return newRow;
}

addSectBtn.addEventListener('click', (e) => {
    const section = document.createElement('div');
    section.setAttribute('id', 'dynamic-section-creator');
    section.innerHTML = `
        <h2><input type="text" class="form-input" id="section-title" placeholder="Enter section title"></h2>
        <button class="btn--style" id="add-row-btn">Add Row</button>
        <ul class="rows-container"></ul>
    `;

    section.querySelector('#add-row-btn').addEventListener('click', () => {
        const newRow = createNewRow();
        section.querySelector('.rows-container').appendChild(newRow);
    });

    sectionsContainer.appendChild(section);
})

