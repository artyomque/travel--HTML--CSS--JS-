const user = {
  name: "Таня Фирсова",
  imgsrc: "./img/firsova-desktop 1.png",
  tags: ["ЗОЖ", "ПП", "Фитнес", "Пляж", "авокадо", "смузи"],
  countries: ["Шри-Ланка", "Таиланд", "Сейшеллы"],
  likesCount: 1500000,
  level: 54,
  availableTransport: { plane: true, bus: false, bicycle: false, walking: false },
};

function formatLikes(count) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + " M";
  if (count >= 1000) return (count / 1000).toFixed(1) + " K";
  return count;
}

function renderCard(user) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
        <div class="card__photo"><img src="${user.imgsrc}" alt="${user.name}"></div>
        <div class="card__main">
            <h2 class="card__name">
                <div class="name__indicator"></div>
                ${user.name}
            </h2>
            <span class="card__tags">${user.tags.map((tag) => `#${tag}`).join(" ")}</span>
            <ul class="card__countries">
                ${user.countries
                  .map(
                    (country) => `
                    <li class="countries__item">
                        <img class="countries__img" src="./img/flags/${country.replace(
                          /\s/g,
                          ""
                        )}.svg" alt="${country}">
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
