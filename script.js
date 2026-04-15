; (function () {
    document.addEventListener('DOMContentLoaded', function () {
        const addCardBtn = document.getElementById('btnAdd');
        const cardTitleInput = document.getElementById('cardTitle');
        const matiereCardContainer = document.querySelector('.container-flash-card');
        const helperBtn = document.getElementById('helper');
        const aideDiv = document.querySelector('.aide');
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('btnSearch');

        const matieres = JSON.parse(localStorage.getItem('myMatiere')) || [];

        addCardBtn.addEventListener('click', addMatiere);
        cardTitleInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                addMatiere();
            }
        });

        searchBtn.addEventListener('mouseover', () => {
            searchInput.classList.add('visible');
        });

        searchBtn.addEventListener('mouseout', () => {
            if (!searchInput.matches(':hover')) {
                searchInput.classList.remove('visible');
            }
        });

        searchBtn.addEventListener('click', () => {
            searchInput.classList.toggle('visible');
            if (searchInput.classList.contains('visible')) {
                searchInput.focus();
            } else {
                searchInput.value = '';
                searchMatiere();
            }
        });
        searchInput.addEventListener('input', searchMatiere);
        searchInput.addEventListener('blur', () => {
            if (!searchBtn.matches(':hover')) {
                searchInput.classList.remove('visible');
            }
        });

        helperBtn.addEventListener('click', () => {
            aideDiv.classList.toggle('visible');
        });

        function newMatiere(titleMatiere) {
            return {
                id: Date.now(),
                title: titleMatiere,
                content: 'Aucune carte pour le moment.',
                flashCard: []
            };
        }

        function saveMatiere(matiere) {
            localStorage.setItem('myMatiere', JSON.stringify(matieres));
        }

        function createMatiere(matiereData) {
            const matiere = document.createElement('div');
            const h2 = document.createElement('h2');
            const paragraph = document.createElement('p');
            const editeMatiere = document.createElement('button');
            const deleteMatiere = document.createElement('button');
            const flashCardBtn = document.createElement('button');
            h2.textContent = `${matiereData.title}`;
            paragraph.textContent = matiereData.flashCard && matiereData.flashCard.length > 0
                ? `${matiereData.flashCard.length} carte(s)`
                : matiereData.content;
            editeMatiere.textContent = '+';
            deleteMatiere.textContent = 'X';
            flashCardBtn.textContent = 'Voir les cartes';
            editeMatiere.className = "edite-matiere";
            deleteMatiere.className = "delete-matiere";
            flashCardBtn.className = "flash-card-btn";
            matiere.classList.add('flash-card');
            matiere.dataset.id = matiereData.id;
            matiere.append(h2, paragraph, editeMatiere, deleteMatiere, flashCardBtn);

            flashCardBtn.addEventListener('click', () => {
                modaleFlashCard(matiereData.id);
            });

            deleteMatiere.addEventListener('click', () => {
                modaleConfirm(`Êtes-vous sûr de vouloir supprimer "${matiereData.title}" ?`).then((confirmed) => {
                    if (confirmed) {
                        removeMatiere(matiereData.id);
                        loadMatiere();
                    }
                });
            });

            editeMatiere.addEventListener('click', () => {
                modaleAddFlashCard(matiereData.id, loadMatiere);
            });

            h2.addEventListener('click', () => {
                h2.contentEditable = true;
                h2.focus();

                h2.addEventListener('blur', () => {
                    h2.contentEditable = false;
                    const newTitle = h2.textContent.trim();
                    if (newTitle && newTitle !== matiereData.title) {
                        if (newTitle.length > 20) {
                            modaleMessage('Le titre ne peut pas dépasser 20 caractères.');
                            h2.textContent = matiereData.title;
                            return;
                        }

                        if (matieres.some(card => card.title === newTitle)) {
                            modaleMessage('Une matière avec ce titre existe déjà.');
                            h2.textContent = matiereData.title;
                            return;
                        }
                        matiereData.title = newTitle;
                        saveMatiere(matieres);
                        loadMatiere();
                    } else {
                        h2.textContent = matiereData.title;
                    }
                }, { once: true });
            });

            return matiere;
        }

        function addMatiere() {
            const titleMatiere = cardTitleInput.value.trim();
            if (titleMatiere) {
                if (matieres.some(card => card.title === titleMatiere)) {
                    modaleMessage('Une matière avec ce titre existe déjà.');
                    return;
                }
                const matiereObjet = newMatiere(titleMatiere);
                const matiere = createMatiere(matiereObjet);
                matiereCardContainer.appendChild(matiere);
                matieres.push(matiereObjet);
                saveMatiere(matieres);
                cardTitleInput.value = '';
            } else {
                modaleMessage('Veuillez entrer un titre pour la matière.');
            }
        }

        function removeMatiere(id) {
            const index = matieres.findIndex(card => card.id === id);
            if (index !== -1) {
                matieres.splice(index, 1);
                saveMatiere(matieres);
            }
        }

        function searchMatiere() {
            const query = searchInput.value.trim().toLowerCase();
            const cards = matiereCardContainer.querySelectorAll('.flash-card');
            cards.forEach(card => {
                const title = card.querySelector('h2').textContent.toLowerCase();
                if (title.includes(query)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        function loadMatiere() {
            const savedMatieres = JSON.parse(localStorage.getItem('myMatiere')) || [];
            matieres.length = 0;
            matieres.push(...savedMatieres);

            matiereCardContainer.textContent = '';
            matieres.forEach(cardData => {
                const card = createMatiere(cardData);
                matiereCardContainer.appendChild(card);
            });
        }

        loadMatiere();

    });
})();