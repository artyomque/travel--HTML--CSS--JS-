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
        <div class="card__photo"><img src="${user.imgsrc}" alt="${user.name}"></div>
        <div class="card__main">
            <h2 class="card__name">
                <div class="name__indicator ${user.isOnline ? "online" : ""}"></div>
                ${user.name}
            </h2>
            <span class="card__tags">${user.tags.map((tag) => `#${tag}`).join(" ")}</span>
            <ul class="card__countries">
                ${user.countries
                  .map(
                    (country) => `
                    <li class="countries__item">
                        <img class="countries__img" src="./img/flags/${country.replace(
                          /[\s-]/g,
                          ""
                        )}.svg">
                        <span class="countries__name">${country}</span>
                    </li>
                `
                  )
                  .join("")}
            </ul>
            <div class="card__interaction">
                <button class="card__apply-btn">Позвать!</button>
                <button class="card__like-btn"><img src="./img/icons/icon_heart.svg" alt="like"></button>
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
                        <li class="transport__item ${
                          user.availableTransport[type] ? "" : "is-disabled"
                        }">
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
