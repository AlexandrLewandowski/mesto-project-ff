const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function handleDelete(e) {
  const card = e.currentTarget.closest('li');
  if (card) {
    card.remove();
  } else {
    console.error('li не найден');
  }
}

function createCard(cardData, handleDelete) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
  });

  if (deleteButton) {
    deleteButton.addEventListener('click', handleDelete);
  }

  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, handleDelete);
  placesList.append(cardElement);
});