
        const titleInput = document.getElementById('title-input');
        const flagshipVerseInput = document.getElementById('flagship-verse-input');
        const addSectionBtn = document.getElementById('add-section-btn');
        const sectionsContainer = document.getElementById('sections-container');
        const saveBtn = document.getElementById('save-btn');

        addSectionBtn.addEventListener('click', () => {
            const section = document.createElement('div');
            section.innerHTML = `
                <h2><input type="text" placeholder="Enter section title"></h2>
                <button class="add-row-btn">Add Row</button>
                <ul class="rows-container"></ul>
            `;

            section.querySelector('.add-row-btn').addEventListener('click', () => {
                const newRow = createNewRow();
                section.querySelector('.rows-container').appendChild(newRow);
            });

            sectionsContainer.appendChild(section);
        });


        saveBtn.addEventListener('click', () => {
            console.log('saved')
            const title = titleInput.value || 'Untitled';
            const flagshipVerse = flagshipVerseInput.value || 'No flagship verse provided';
            let htmlContent = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>${title}</title>
                    <link rel="stylesheet" href="./styles.css">
                </head>
                <body>
                    <a href="https://showtimesteamers.com"> Home </a>
                    <h1>${title}</h1>
                    <h3>${flagshipVerse}</h3>
            `;

            sectionsContainer.querySelectorAll('div').forEach(section => {
                const sectionTitle = section.querySelector('h2 input').value || 'Untitled Section';
                htmlContent += `<h2>${sectionTitle}</h2><ul>`;
                section.querySelectorAll('.rows-container > li').forEach(row => {
                    htmlContent += generateRowContent(row, 0);
                });
                htmlContent += '</ul>';
            });

            htmlContent += '</body></html>';

            const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${title}.html`;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        });

        function generateRowContent(row, level) {
            let rowContent = '';
            // Select only the direct input fields of the current row (exclude input fields of sub-rows)
            const inputs = row.children;
            rowContent += '<li style="margin-left: ' + (level * 20) + 'px;">';
            for (let i = 0; i < inputs.length; i++) {
                const input = inputs[i];
                if (input.tagName === 'INPUT' && input.type === 'text') {
                    const value = input.value || '';
                    if (i === 0) {
                        rowContent += `<span class="highlight">${value}</span> `;
                    } else if (i === 1) {
                        rowContent += `<span>${value}</span> `;
                    } else if (i === 2) {
                        rowContent += `<b>${value}</b> `;
                    } else {
                        rowContent += `<span>${value}</span> `;
                    }
                }
            }
            rowContent += '</li>';
            const subRows = row.querySelectorAll('.subrows-container > li');
            if (subRows.length > 0) {
                rowContent += '<ul>';
                subRows.forEach(subRow => {
                    rowContent += generateRowContent(subRow, level + 1);
                });
                rowContent += '</ul>';
            }
            return rowContent;
        }

        function addNewColumn(row) {
            const newColumn = document.createElement('input');
            newColumn.type = 'text';
            newColumn.placeholder = 'New Column';
            row.insertBefore(newColumn, row.lastElementChild);
        }

        function createNewRow() {
            const newRow = document.createElement('li');
            newRow.innerHTML = `
                <input type="text" placeholder="Topic">
                <input type="text" placeholder="Context">
                <input type="text" placeholder="Reference">
                <button class="add-column-btn">Add Column</button>
                <button class="add-subrow-btn">Add Sub-row</button>
                <button class="delete-row-btn">Delete Row</button>
                <ul class="subrows-container" style="list-style-type: none;"></ul>
            `;

            newRow.querySelector('.add-column-btn').addEventListener('click', () => {
                addNewColumn(newRow);
            });

            newRow.querySelector('.add-subrow-btn').addEventListener('click', () => {
                const subRow = createNewRow();
                newRow.querySelector('.subrows-container').appendChild(subRow);
            });

            newRow.querySelector('.delete-row-btn').addEventListener('click', () => {
                newRow.remove();
            });

            return newRow;
        }
