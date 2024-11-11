import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
  disabledButton,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";

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
const deleteForm = deleteModal.querySelector(".modal__form");
const deleteCancel = deleteModal.querySelector(".modal__submit-btn_cancel");
const deleteClose = deleteModal.querySelector(".modal__close-btn");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

let selectedCard;
let selectedCardId;

//Card Creater
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

  cardLikeBtn.addEventListener("click", (evt) => handleLikeBtn(evt, data._id));

  if (data.isLiked) {
    cardLikeBtn.classList.add("card__like-btn_liked");
  }

  cardDeleteBtn.addEventListener("click", () =>
    handleDeleteCard(cardElement, data._id)
  );

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

//Opens modal
function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("click", handleModalOverlay);
  document.addEventListener("keydown", handleModalEscape);
}

//Closes modal
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("click", handleModalOverlay);
  document.removeEventListener("keydown", handleModalEscape);
}

//Profile submit handler
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";

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
    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Save";
    });
}

//Avatar submit handler
function handleAvatarSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";

  api
    .editAvatarInfo({
      avatar: avatarLinkInput.value,
    })
    .then((data) => {
      // console.log(data);
      profileAvatar.src = data.avatar;
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Save";
    });
}

//Card submit handler
function handleCreateCard(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";

  api
    .addCards({
      name: cardCaptionInput.value,
      link: cardLinkInput.value,
    })
    .then((data) => {
      // getCardElement(data);
      const cardElement = getCardElement(data);
      cardsList.prepend(cardElement);
      closeModal(modalCard);
    })
    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Save";
    });
}

//Delete submit handler
function handleDeleteSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  submitBtn.textContent = "Deleting...";

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      submitBtn.textContent = "Delete";
    });
}

//Generates Card ids
function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;

  openModal(deleteModal);
}

//Like button handler
function handleLikeBtn(evt, id) {
  const isLiked = evt.target.classList.contains("card__like-btn_liked");

  api
    .handleLikeButton(id, isLiked)
    .then(() => {
      evt.target.classList.toggle("card__like-btn_liked");
    })
    .catch(console.error);
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

//Button Event Listeners
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

deleteCancel.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteClose.addEventListener("click", () => {
  closeModal(deleteModal);
});

//Submit Event Listener
modalEditForm.addEventListener("submit", handleProfileFormSubmit);
modalCardForm.addEventListener("submit", handleCreateCard);
avatarForm.addEventListener("submit", handleAvatarSubmit);
deleteForm.addEventListener("submit", handleDeleteSubmit);

enableValidation(settings);
