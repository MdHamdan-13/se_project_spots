const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const profileEditbutton = document.querySelector(".profile__edit-btn");
const profileAddbutton = document.querySelector(".profile__add-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const modalEdit = document.querySelector("#edit-modal");
const modalEditForm = modalEdit.querySelector(".modal__form");
const profileClosebutton = modalEdit.querySelector(".modal__close-btn");
const modalNameInput = modalEdit.querySelector("#profile-name-input");
const modalDescriptionInput = modalEdit.querySelector(
  "#profile-description-input"
);

const modalCard = document.querySelector("#add-card-modal");
const modalCardForm = modalCard.querySelector(".modal__form");
const profileCardCloseBtn = modalCard.querySelector(".modal__close-btn");
const cardLinkInput = modalCard.querySelector("#add-card-link-input");
const cardCaptionInput = modalCard.querySelector("#add-card-caption-input");
const previewModal = document.querySelector("#preview-modal");
const previewModalImg = document.querySelector(".modal__image");
const previewModalText = document.querySelector(".modal__caption");
const previewModalClose = previewModal.querySelector(
  ".modal__close-btn_type_preview"
);

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImgEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardNameEl.textContent = data.name;
  cardImgEl.src = data.link;
  cardImgEl.alt = data.name;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImgEl.addEventListener("click", () => {
    openModal(previewModal);

    previewModalText.textContent = data.name;
    previewModalImg.src = data.link;
    previewModalImg.alt = data.name;
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = modalNameInput.value;
  profileDescription.textContent = modalDescriptionInput.value;
  closeModal(modalEdit);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    name: cardCaptionInput.value,
    link: cardLinkInput.value,
  };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  closeModal(modalCard);
}

profileEditbutton.addEventListener("click", () => {
  modalNameInput.value = profileName.textContent;
  modalDescriptionInput.value = profileDescription.textContent;
  openModal(modalEdit);
});

profileClosebutton.addEventListener("click", () => {
  closeModal(modalEdit);
});

profileAddbutton.addEventListener("click", () => {
  openModal(modalCard);
});

profileCardCloseBtn.addEventListener("click", () => {
  closeModal(modalCard);
});

previewModalClose.addEventListener("click", () => {
  closeModal(previewModal);
});

modalEditForm.addEventListener("submit", handleProfileFormSubmit);
modalCardForm.addEventListener("submit", handleCardFormSubmit);

initialCards.forEach((cardItem) => {
  const cardElement = getCardElement(cardItem);
  cardsList.prepend(cardElement);
});
