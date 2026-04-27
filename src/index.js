import './pages/index.css';
import { initialCards } from './scripts/cards.js';

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const editForm = document.forms['edit-profile'];
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_description');

const newCardForm = document.forms['new-place'];
const placeNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const linkInput = newCardForm.querySelector('.popup__input_type_url');

const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');

const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
};

const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
};

const handleEscClose = (evt) => {
  if (evt.key !== 'Escape') return;

  const openedPopup = document.querySelector('.popup_is-opened');
  if (openedPopup) {
    closeModal(openedPopup);
  }
};

const handleOverlayClick = (evt) => {
  if (evt.target.classList.contains('popup_is-opened')) {
    closeModal(evt.target);
  }
};

const handleDelete = (evt) => {
  const card = evt.currentTarget.closest('.card');
  if (card) card.remove();
};

const handleLike = (evt) => {
  evt.currentTarget.classList.toggle('card__like-button_is-active');
};

const handleImageClick = (cardData) => {
  popupImageElement.src = cardData.link;
  popupImageElement.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(popupImage);
};

const createCard = (cardData, deleteHandler, likeHandler, imageHandler) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  likeButton.addEventListener('click', likeHandler);
  deleteButton.addEventListener('click', deleteHandler);
  cardImage.addEventListener('click', () => imageHandler(cardData));

  return cardElement;
};

const isImageUrl = (url) => /\.(jpg|jpeg|png|webp|gif|avif|svg)(\?.*)?$/i.test(url);

const renderCard = (cardData, method = 'append') => {
  const cardElement = createCard(cardData, handleDelete, handleLike, handleImageClick);
  placesList[method](cardElement);
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEdit);
};

const handleNewCardFormSubmit = (evt) => {
  evt.preventDefault();

  const name = placeNameInput.value.trim();
  const link = linkInput.value.trim();

  if (!isImageUrl(link)) {
    alert('Нужна прямая ссылка на изображение');
    return;
  }

  renderCard({ name, link }, 'prepend');
  newCardForm.reset();
  closeModal(popupNewCard);
};

initialCards.forEach((cardData) => renderCard(cardData));

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
});

profileAddButton.addEventListener('click', () => {
  newCardForm.reset();
  openModal(popupNewCard);
});

popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup));
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', handleOverlayClick);
});

editForm.addEventListener('submit', handleProfileFormSubmit);
newCardForm.addEventListener('submit', handleNewCardFormSubmit);