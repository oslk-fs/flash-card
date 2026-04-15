function modaleMessage(message) {
    const divModal = document.createElement('div');
    const divContent = document.createElement('div');
    const paragraph = document.createElement('p');
    const button = document.createElement('button');

    divModal.className = 'modal';
    divContent.className = 'modal-content';
    paragraph.textContent = message;
    button.textContent = 'OK';
    button.className = 'modal-button';

    divContent.appendChild(paragraph);
    divContent.appendChild(button);
    divModal.appendChild(divContent);
    document.body.appendChild(divModal);

    divModal.tabIndex = -1;
    divModal.focus();

    button.addEventListener('click', function (e) {
        divModal.remove();
    });

    divModal.addEventListener('click', function (e) {
        if (e.target === divModal) {
            divModal.remove();
        }
    });

    divModal.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });
}

function modaleConfirm(message) {
    return new Promise((resolve) => {
        const divModal = document.createElement('div');
        const divContent = document.createElement('div');
        const paragraph = document.createElement('p');
        const buttonRow = document.createElement('div');
        const yesButton = document.createElement('button');
        const noButton = document.createElement('button');

        divModal.className = 'modal';
        divContent.className = 'modal-content';
        buttonRow.className = 'modal-buttons';
        paragraph.textContent = message;
        yesButton.textContent = 'Oui';
        noButton.textContent = 'Non';
        yesButton.className = 'modal-button';
        noButton.className = 'modal-button';

        buttonRow.append(noButton, yesButton);
        divContent.append(paragraph, buttonRow);
        divModal.appendChild(divContent);
        document.body.appendChild(divModal);

        divModal.tabIndex = -1;
        divModal.focus();

        function cleanup(result) {
            divModal.remove();
            resolve(result);
        }

        yesButton.addEventListener('click', function (e) {
            cleanup(true);
        });

        noButton.addEventListener('click', function (e) {
            cleanup(false);
        });

        divModal.addEventListener('click', function (e) {
            if (e.target === divModal) {
                cleanup(false);
            } 
        });

        divModal.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
            } 
        });
    });
}

function modaleAddFlashCard(matiereID, onSave) {
    const matieres = JSON.parse(localStorage.getItem('myMatiere')) || [];
    const matiere = matieres.find(item => item.id === matiereID);

    if (!matiere) {
        modaleMessage('Flash card introuvable.');
        return;
    }

    const divModal = document.createElement('div');
    const divContent = document.createElement('div');
    const title = document.createElement('h3');
    const questionLabel = document.createElement('label');
    const question = document.createElement('textarea');
    const answerLabel = document.createElement('label');
    const answer = document.createElement('textarea');
    const buttonRow = document.createElement('div');
    const addButton = document.createElement('button');
    const closeButton = document.createElement('button');

    divModal.className = 'modal';
    divContent.className = 'modal-content';
    title.textContent = `Ajouter une carte à "${matiere.title}"`;
    questionLabel.textContent = 'Question';
    answerLabel.textContent = 'Réponse';
    question.className = 'question';
    answer.className = 'answer';
    buttonRow.className = 'modal-buttons';
    addButton.textContent = 'Ajouter';
    closeButton.textContent = 'Fermer';
    addButton.className = 'modal-button';
    closeButton.className = 'modal-button';

    divContent.append(title, questionLabel, question, answerLabel, answer, buttonRow);
    buttonRow.append(closeButton, addButton);
    divModal.appendChild(divContent);
    document.body.appendChild(divModal);

    divModal.tabIndex = -1;
    divModal.focus();

    function fermerModal() {
        divModal.remove();
    }

    addButton.addEventListener('click', function (e) {
        if(e.key === 'Enter') {
            e.preventDefault();
        }

        const questionValue = question.value.trim();
        const answerValue = answer.value.trim();

        if (!questionValue || !answerValue) {
            modaleMessage('Veuillez remplir la question et la réponse.');
            return;
        }

        matiere.flashCard = matiere.flashCard || [];
        matiere.flashCard.push({
            id: Date.now(),
            question: questionValue,
            answer: answerValue,
        });

        localStorage.setItem('myMatiere', JSON.stringify(matieres));
        fermerModal();
        if (typeof onSave === 'function') {
            onSave();
        }
        modaleMessage('Carte ajoutée avec succès.');
    });

    closeButton.addEventListener('click', function (e) {
        if(e.key === 'Enter') {
            e.preventDefault();
        }
        fermerModal();
    });

    divModal.addEventListener('click', function (e) {
        if (e.target === divModal) {
            fermerModal();
        }
    });

    divModal.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });
}

function modaleFlashCard(matiereID) {
    const matieres = JSON.parse(localStorage.getItem('myMatiere')) || [];
    const matiere = matieres.find(item => item.id === matiereID);

    if (!matiere?.flashCard || matiere.flashCard.length === 0) {
        modaleMessage('Aucune carte disponible pour cette matière.');
        return;
    }

    let currentIndex = 0;

    const divModal = document.createElement('div');
    const divContent = document.createElement('div');
    const title = document.createElement('h3');
    const progressWrapper = document.createElement('div');
    const progressBar = document.createElement('div');
    const progressFill = document.createElement('div');
    const progressText = document.createElement('span');
    const cardContainer = document.createElement('div');
    const questionElement = document.createElement('p');
    const answerElement = document.createElement('p');
    const actionRow = document.createElement('div');
    const showAnswerButton = document.createElement('button');
    const removeCardButton = document.createElement('button');
    const navRow = document.createElement('div');
    const previousButton = document.createElement('button');
    const nextButton = document.createElement('button');
    const closeButton = document.createElement('button');

    divModal.className = 'modal';
    divContent.className = 'modal-content';
    title.textContent = `Révision : ${matiere.title}`;
    progressWrapper.className = 'progress-wrapper';
    progressBar.className = 'progress';
    progressFill.className = 'progress-fill';
    progressText.className = 'progress-text';
    cardContainer.className = 'review-card';
    actionRow.className = 'modal-buttons';
    navRow.className = 'modal-buttons';
    showAnswerButton.className = 'modal-button';
    removeCardButton.className = 'modal-button';
    previousButton.className = 'modal-button';
    nextButton.className = 'modal-button';
    closeButton.className = 'modal-button';

    progressBar.style.width = '100%';
    progressBar.style.height = '10px';
    progressBar.style.backgroundColor = '#ddd';
    progressBar.style.borderRadius = '999px';
    progressBar.style.overflow = 'hidden';
    progressBar.style.marginBottom = '0.85rem';

    progressFill.style.width = '0%';
    progressFill.style.height = '100%';
    progressFill.style.backgroundColor = '#000000';
    progressFill.style.transition = 'width 0.25s ease';

    progressText.style.display = 'block';
    progressText.style.marginBottom = '0.75rem';
    progressText.style.fontSize = '0.95rem';
    progressText.style.color = '#333';

    questionElement.style.fontSize = '1rem';
    questionElement.style.fontWeight = '600';
    questionElement.style.marginBottom = '1rem';

    answerElement.style.fontSize = '0.95rem';
    answerElement.style.color = '#444';
    answerElement.style.marginTop = '0.5rem';
    answerElement.style.display = 'none';

    previousButton.textContent = 'Précédent';
    nextButton.textContent = 'Suivant';
    showAnswerButton.textContent = 'Voir la réponse';
    removeCardButton.textContent = 'Supprimer la carte';
    closeButton.textContent = 'Fermer';

    progressBar.appendChild(progressFill);
    progressWrapper.append(progressText, progressBar);
    cardContainer.append(questionElement, answerElement);
    actionRow.append(showAnswerButton, removeCardButton);
    navRow.append(previousButton, nextButton, closeButton);
    divContent.append(title, progressWrapper, cardContainer, actionRow, navRow);
    divModal.appendChild(divContent);
    document.body.appendChild(divModal);

    divModal.tabIndex = -1;
    divModal.focus();


    function renderCard() {
        const card = matiere.flashCard[currentIndex];
        questionElement.textContent = `Q: ${card.question}`;
        answerElement.textContent = `R: ${card.answer}`;
        answerElement.style.display = 'none';
        showAnswerButton.textContent = 'Voir la réponse';

        const total = matiere.flashCard.length;
        const progress = Math.round(((currentIndex + 1) / total) * 100);
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `Carte ${currentIndex + 1} sur ${total}`;

        previousButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === total - 1;
    }

    function closeModal() {
        divModal.remove();
    }

    previousButton.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex -= 1;
            renderCard();
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentIndex < matiere.flashCard.length - 1) {
            currentIndex += 1;
            renderCard();
        }
    });

    showAnswerButton.addEventListener('click', function () {
        const visible = answerElement.style.display === 'block';
        answerElement.style.display = visible ? 'none' : 'block';
        showAnswerButton.textContent = visible ? 'Voir la réponse' : 'Masquer la réponse';
    });

    removeCardButton.addEventListener('click', function () {
        modaleConfirm('Supprimer cette carte ?').then((confirmed) => {
            if (!confirmed) {
                return;
            }

            matiere.flashCard.splice(currentIndex, 1);
            localStorage.setItem('myMatiere', JSON.stringify(matieres));

            if (matiere.flashCard.length === 0) {
                closeModal();
                modaleMessage('Toutes les cartes ont été supprimées.');
                return;
            }

            if (currentIndex >= matiere.flashCard.length) {
                currentIndex = matiere.flashCard.length - 1;
            }
            renderCard();
        });
    });

    closeButton.addEventListener('click', closeModal);
    divModal.addEventListener('click', function (event) {
        if (event.target === divModal) {
            closeModal();
        }
    });

    divModal.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });

    renderCard();
}

