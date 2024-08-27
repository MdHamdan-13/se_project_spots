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
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const modalEdit = document.querySelector("#edit-modal");
const modalEditForm = modalEdit.querySelector(".modal__form");
const profileClosebutton = modalEdit.querySelector(".modal__close-btn");
const modalNameInput = modalEdit.querySelector("#profile-name-input");
const modalDescriptionInput = modalEdit.querySelector(
  "#profile-description-input"
);
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  console.log(data);
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImgEl = cardElement.querySelector(".card__image");
  cardNameEl.textContent = data.name;
  cardImgEl.src = data.link;
  cardImgEl.alt = data.name;
  return cardElement;
}

function openModal() {
  modalNameInput.value = profileName.textContent;
  modalDescriptionInput.value = profileDescription.textContent;
  modalEdit.classList.add("modal__opened");
}

function closeModal() {
  modalEdit.classList.remove("modal__opened");
}

function profileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = modalNameInput.value;
  profileDescription.textContent = modalDescriptionInput.value;
  closeModal();
}

profileEditbutton.addEventListener("click", openModal);
profileClosebutton.addEventListener("click", closeModal);
modalEditForm.addEventListener("submit", profileFormSubmit);

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  cardsList.prepend(cardElement);
}
