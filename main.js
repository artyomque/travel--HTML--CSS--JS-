const users = [
  {
    name: "Таня Фирсова",
    isOnline: false,
    imgsrc: "./img/profiles/firsova-desktop 1.png",
    tags: ["ЗОЖ", "ПП", "Фитнес", "Пляж", "авокадо", "смузи"],
    countries: ["Шри-Ланка", "Таиланд", "Сейшеллы"],
    likesCount: 1500000,
    level: 99,
    availableTransport: { plane: true, bus: false, bicycle: false, walking: false },
  },
  {
    name: "Петя Демин",
    isOnline: false,
    imgsrc: "./img/profiles/demin-desktop 2.png",
    tags: ["бургер", "бар", "футбол", "концерт", "крафт"],
    countries: ["Бельгия", "Чехия"],
    likesCount: 1500,
    level: 80,
    availableTransport: { plane: true, bus: true, bicycle: false, walking: true },
  },
  {
    name: "Марк Смолов",
    isOnline: false,
    imgsrc: "./img/profiles/smolov-desktop 1.png",
    tags: ["рэп", "тату", "хайпбист", "кроссовки", "суприм"],
    countries: ["США", "Австралия", "Доминика"],
    likesCount: 170,
    level: 25,
    availableTransport: { plane: true, bus: false, bicycle: true, walking: false },
  },
  {
    name: "Лариса Роговая",
    isOnline: true,
    imgsrc: "./img/profiles/img 1.png",
    tags: ["образование", "карьера", "учеба", "линкедин"],
    countries: ["Великобритания", "Германия"],
    likesCount: 23,
    level: 50,
    availableTransport: { plane: true, bus: true, bicycle: false, walking: false },
  },
];

const cardContainer = document.querySelector(".card__container");

function formatLikes(count) {
  return count >= 1000000 ? (count / 1000000).toFixed(1) + " M" : count;
}

function renderCard(user) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
  <div class="card__photo">
    <img class="card__img" src="${user.imgsrc}" alt="${user.name}">
  </div>
  
  <div class="card__main">
    <h2 class="card__name">
      <div class="name__indicator ${user.isOnline ? "online" : ""}"></div>
      ${user.name}
    </h2>

    <span class="card__tags">
      ${user.tags.map((tag) => `#${tag}`).join(" ")}
    </span>

    <ul class="card__countries--desktop">
      ${user.countries
        .map(
          (country) => `
        <li class="countries__item">
          <img class="countries__img" src="./img/flags/${country.replace(/[\s-]/g, "")}.svg">
          <span class="countries__name">${country}</span>
        </li>
      `
        )
        .join("")}
    </ul>

    <div class="card__interaction">
      <button class="card__apply-btn">Позвать!</button>
                <button class="card__like-btn"><svg width="21" class="like__svg" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_3_1064)">
                                                <g opacity="0.5">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6102 8.12436L11.7269 5.77557C12.0042 5.19396 12.4851 4.35764 13.1658 3.68149C13.8353 3.01585 14.6372 2.5629 15.6064 2.5629C17.6999 2.5629 19.3536 4.30381 19.3536 6.39658C19.3536 7.9865 18.6616 9.10903 17.0204 10.8211C16.5994 11.2596 16.1198 11.7335 15.589 12.2561C14.205 13.6215 12.4838 15.3204 10.6102 17.5917C8.73665 15.3204 7.01545 13.6215 5.6315 12.2561C5.10065 11.7335 4.61977 11.2583 4.20008 10.8211C2.55883 9.10903 1.86685 7.9865 1.86685 6.39658C1.86685 4.30381 3.5206 2.5629 5.61401 2.5629C6.58328 2.5629 7.38517 3.01585 8.05466 3.68149C8.7354 4.35764 9.21628 5.19396 9.49357 5.77557L10.6102 8.12436ZM11.0999 19.0109C11.0397 19.0858 10.9647 19.146 10.8802 19.1873C10.7956 19.2286 10.7035 19.25 10.6102 19.25C10.517 19.25 10.4249 19.2286 10.3403 19.1873C10.2557 19.146 10.1807 19.0858 10.1206 19.0109C8.12086 16.5138 6.31098 14.7283 4.82086 13.2591C2.24157 10.7134 0.617798 9.11297 0.617798 6.39658C0.617798 3.55414 2.8536 1.25 5.61401 1.25C7.6125 1.25 9.01019 2.62855 9.86579 3.88631C10.1905 4.36552 10.4379 4.82635 10.6102 5.18871C10.8263 4.73519 11.0752 4.29978 11.3547 3.88631C12.2103 2.62723 13.608 1.25 15.6064 1.25C18.3669 1.25 20.6027 3.55414 20.6027 6.39658C20.6027 9.11297 18.9789 10.7134 16.3996 13.2591C14.9095 14.7296 13.0996 16.5151 11.0999 19.0096V19.0109Z" fill="#192144"/>
                                                </g>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_3_1064">
                                                <rect width="19.9849" height="20" fill="white" transform="translate(0.617798)"/>
                                                </clipPath>
                                                </defs>
                                                </svg>
                </button>
      <span class="card__like-count">${formatLikes(user.likesCount)}</span>
    </div>

    <div class="card__transport">
      <ul class="transport__list">
        ${Object.entries({
          plane: "./img/icons/transportation/icon_plane.svg",
          bus: "./img/icons/transportation/icon_bus.svg",
          bicycle: "./img/icons/transportation/icon_bicycle.svg",
          walking: "./img/icons/transportation/icon_run.svg",
        })
          .map(
            ([type, src]) => `
          <li class="transport__item ${user.availableTransport[type] ? "" : "is-disabled"}">
            <img class="transport__icon" src="${src}" alt="${type}">
          </li>
        `
          )
          .join("")}
      </ul>
    </div>

    <div class="card__level">
      <svg width="60" height="60" viewBox="0 0 60 60" style="--progress: ${
        user.level
      }" class="circular-progress">
        <circle class="bg"></circle>
        <circle class="fg"></circle>
      </svg>
      <div class="level__inner">
        <span class="level__count">${user.level}</span>
        <span class="level__text">level</span>
      </div>
    </div>
  </div>
  <div class="card__countries--mobile">
    <span class="card__countries--mobile-span">хочет посетить:</span>
    <ul class="card__countries--mobile-list">
    ${user.countries
      .map(
        (country) => `
      <li class="countries__item">
        <img class="countries__img" src="./img/flags/${country.replace(/[\s-]/g, "")}.svg">
        <span class="countries__name">${country}</span>
      </li>
    `
      )
      .join("")}
  </ul>
  </div>

`;

  return card;
}

for (let user of users) {
  cardContainer.appendChild(renderCard(user));
}

document.querySelectorAll(".card__like-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("liked");
  });
});

/* Configurator */

document.querySelectorAll(".configurator__toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const section = toggle.closest(".configurator__section");
    section.classList.toggle("configurator__section--open");
  });
});

/* Range Slider */

const minInput = document.getElementById("min-input");
const maxInput = document.getElementById("max-input");
const minSlider = document.getElementById("min-slider");
const maxSlider = document.getElementById("max-slider");
const sliderRange = document.getElementById("slider-range");

function updateSliderRange() {
  const minVal = parseInt(minSlider.value);
  const maxVal = parseInt(maxSlider.value);

  if (minVal >= maxVal) {
    minSlider.value = maxVal - 1;
  }

  const percent1 = (minSlider.value / minSlider.max) * 100;
  const percent2 = (maxSlider.value / maxSlider.max) * 100;

  sliderRange.style.left = percent1 + "%";
  sliderRange.style.width = percent2 - percent1 + "%";

  minInput.value = minSlider.value;
  maxInput.value = maxSlider.value;
}

function syncFromInputs() {
  if (parseInt(minInput.value) >= parseInt(maxInput.value)) {
    minInput.value = parseInt(maxInput.value) - 1;
  }
  minSlider.value = minInput.value;
  maxSlider.value = maxInput.value;
  updateSliderRange();
}

minSlider.addEventListener("input", updateSliderRange);
maxSlider.addEventListener("input", updateSliderRange);

minInput.addEventListener("input", syncFromInputs);
maxInput.addEventListener("input", syncFromInputs);

updateSliderRange();
