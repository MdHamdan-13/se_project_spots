import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
  disabledButton,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";

// const initialCards = [
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "39df9e1c-6ec2-44d1-a3b6-60d6e9498d03",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    // console.log(cards);
    // console.log(userInfo);
    cards.forEach((cardItem) => {
      const cardElement = getCardElement(cardItem);
      cardsList.prepend(cardElement);
    });

    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;
  })
  .catch((err) => {
    console.error(err);
  });

// Profile Elements
const profileEditButton = document.querySelector(".profile__edit-btn");
const profileAddButton = document.querySelector(".profile__add-btn");
const avatarModalButton = document.querySelector(".profile__avatar-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");

const modalEdit = document.querySelector("#edit-modal");
const modalEditForm = modalEdit.querySelector(".modal__form");
const profileCloseButton = modalEdit.querySelector(".modal__close-btn");
const modalNameInput = modalEdit.querySelector("#profile-name-input");
const modalDescriptionInput = modalEdit.querySelector(
  "#profile-description-input"
);

// Card Elements
const cardImage = document.querySelector(".card__image");
const cardTitle = document.querySelector(".card__title");
const modalCard = document.querySelector("#add-card-modal");
const modalCardForm = modalCard.querySelector(".modal__form");
// const cardForm = modalCard.querySelector("#add-card-form");
const cardSubmitBtn = modalCard.querySelector(".modal__submit-btn");
const profileCardCloseBtn = modalCard.querySelector(".modal__close-btn");
const cardLinkInput = modalCard.querySelector("#add-card-link-input");
const cardCaptionInput = modalCard.querySelector("#add-card-caption-input");

// Preview Elements
const previewModal = document.querySelector("#preview-modal");
const previewModalImg = document.querySelector(".modal__image");
const previewModalText = document.querySelector(".modal__caption");
const previewModalClose = previewModal.querySelector(
  ".modal__close-btn_type_preview"
);

// Avatar Elements
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarLinkInput = avatarModal.querySelector("#profile-avatar-input");

// Delete Elements
const deleteModal = document.querySelector("#delete-modal");

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
    openModal(deleteModal);
    // cardElement.remove();
  });

  // cardDeleteBtn.addEventListener("click", handleDeleteButton);

  cardImgEl.addEventListener("click", () => {
    openModal(previewModal);

    previewModalText.textContent = data.name;
    previewModalImg.src = data.link;
    previewModalImg.alt = data.name;
  });

  return cardElement;
}

function handleModalOverlay(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closeModal(evt.target);
  }
}

function handleModalEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("click", handleModalOverlay);
  document.addEventListener("keydown", handleModalEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("click", handleModalOverlay);
  document.removeEventListener("keydown", handleModalEscape);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  api
    .editUserInfo({
      name: modalNameInput.value,
      about: modalDescriptionInput.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(modalEdit);
    })
    .catch(console.error);
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  api
    .editAvatarInfo({
      avatar: avatarLinkInput.value,
    })
    .then((data) => {
      // console.log(data);
      profileAvatar.src = data.avatar;
      closeModal(avatarModal);
    })
    .catch(console.error);
}

function handleCreateCard(evt) {
  evt.preventDefault();
  api
    .addCards({
      name: cardCaptionInput.value,
      link: cardLinkInput.value,
    })
    .then((data) => {
      getCardElement(data);
    })
    .catch(console.error);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    name: cardCaptionInput.value,
    link: cardLinkInput.value,
  };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  modalCardForm.reset();
  disabledButton(cardSubmitBtn, settings);
  closeModal(modalCard);
}

profileEditButton.addEventListener("click", () => {
  modalNameInput.value = profileName.textContent;
  modalDescriptionInput.value = profileDescription.textContent;
  resetValidation(
    modalEditForm,
    [modalNameInput, modalDescriptionInput],
    settings
  );
  openModal(modalEdit);
});

profileCloseButton.addEventListener("click", () => {
  closeModal(modalEdit);
});

profileAddButton.addEventListener("click", () => {
  openModal(modalCard);
});

profileCardCloseBtn.addEventListener("click", () => {
  closeModal(modalCard);
});

previewModalClose.addEventListener("click", () => {
  closeModal(previewModal);
});

avatarModalButton.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarCloseBtn.addEventListener("click", () => {
  closeModal(avatarModal);
});

modalEditForm.addEventListener("submit", handleProfileFormSubmit);
// modalCardForm.addEventListener("submit", handleCardFormSubmit);
modalCardForm.addEventListener("submit", handleCreateCard); //replaced listener
avatarForm.addEventListener("submit", handleAvatarSubmit);

// initialCards.forEach((cardItem) => {
//   const cardElement = getCardElement(cardItem);
//   cardsList.prepend(cardElement);
// });

enableValidation(settings);
