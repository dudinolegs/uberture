import locationIcon from "../assets/icons/location.svg";

const dataUrl = IS_DEV ? '/assets/files/map.json' : '/ajax/getMap.php';
const countries = await loadData(dataUrl);

if (countries) {
    const stores = countries
        .flatMap(country => country.city)
        .flatMap(city => city.store);
    const countryList = document.querySelector('.js-map-country-list');
    const storeList = document.querySelector('.js-map-store-list');
    const countrySelect = document.querySelector('.js-map-country-select');
    const citySelect = document.querySelector('.js-map-city-select');
    let map = null;

    loadYandexMaps().then(ymaps => {
        map = new ymaps.Map(document.querySelector(".js-map"), {
            center: [55.76, 37.64],
            zoom: 10,
            controls: []
        });

        stores.forEach((store) => {
            const placemark = getPlacemark(store);
            map.geoObjects.add(placemark);
        });

        renderCountryList(countries);
        renderCountrySelect(countries);
        renderCitySelect(countries);
        renderStoreList(countries);

        const activeCountry = countries.find(country => country.active);
        setActiveCountry(activeCountry.id);
    });
}

async function loadData(url) {
    try {
        const result = await fetch(url);
        if (!result.ok) {
            console.error("Ошибка HTTP:", result.status);
            return false;
        }
        
        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Ошибка загрузки данных карты:", err);
        return false;
    }
}

function loadYandexMaps() {
    return new Promise((resolve, reject) => {
        if (window.ymaps) {
            return resolve(window.ymaps);
        }

        const script = document.createElement("script");
        script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU`;
        script.onload = () => {
            window.ymaps.ready(() => resolve(window.ymaps));
        };
        script.onerror = () => reject(new Error("Yandex Maps failed to load"));
        document.head.appendChild(script);
    });
}

function getPlacemark(store) {
    let balloonContent = `<b>${store.name}</b><br> ${store.address}`;

    return new ymaps.Placemark([store.latitude, store.longitude],
        {
            hintContent: store.name,
            balloonContent: balloonContent
        },
        {
            iconLayout: "default#image",
            iconImageHref: locationIcon,
            iconImageSize: [18, 22],
            iconImageOffset: [-9, -11]
        }
    );
}

function setActiveCountry(countryId) {
    const country = countries.find(c => c.id === +countryId);

    if (!country) {
        return;
    }

    countries.forEach(country => {
        country.active = false;
    });

    country.active = true;
    
    renderCountryList(countries);
    renderCountrySelect(countries);
    renderCitySelect(countries);
    renderStoreList(countries);

    const city = country.city.find(c => c.active);
    if (city) {
        setMapCenter(city.latitude, city.longitude, 9);
    }
}

function setActiveCity(countryId, cityId) {
    const country = countries.find(c => c.id === +countryId);
    const city = country.city.find(c => c.id === +cityId);
    
    if (!country || !city) {
        return;
    }

    country.city.forEach(city => {
        city.active = false;
    });

    city.active = true;

    setMapCenter(city.latitude, city.longitude, 9);

    renderCitySelect(countries);
    renderStoreList(countries);
}

function renderCountryList(countries) {
    countryList.innerHTML = '';
    countries.forEach((country) => {
        const countryItem = document.createElement("button");
    
        countryItem.classList.add(
            "button",
            "button_rounded",
            "button_size-s",
            "button_a-active",
            country.active ? "button_main-stroke" : "button_pale-stroke",
        );
    
        countryItem.dataset.id = country.id;
    
        const span = document.createElement("span");
        span.textContent = country.name;
    
        countryItem.appendChild(span);
        countryList.appendChild(countryItem);
    
        countryItem.addEventListener("click", () => {
            setActiveCountry(country.id);
        });
    });
}

function renderStoreList(countries) {
    const activeCountry = countries.find(country => country.active);
    const activeCity = activeCountry.city.find(c => c.active);

    storeList.innerHTML = '';

    activeCity.store.forEach((storeData) => {    
        const store = document.createElement('article');
        store.classList.add('store');
    
        store.innerHTML = `
            <svg class="store__icon" width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 9C18 16 9 22 9 22C9 22 0 16 0 9C3.55683e-08 6.61305 0.948211 4.32387 2.63604 2.63604C4.32387 0.948211 6.61305 0 9 0C11.3869 0 13.6761 0.948211 15.364 2.63604C17.0518 4.32387 18 6.61305 18 9Z" fill="#F66201" />
                <path d="M9 12C10.6569 12 12 10.6569 12 9C12 7.34315 10.6569 6 9 6C7.34315 6 6 7.34315 6 9C6 10.6569 7.34315 12 9 12Z" fill="white" />
            </svg>
            <h4 class="store__name">${storeData.name}</h4>
            <div class="store__address">${storeData.address}</div>
            <div class="text">${storeData.description}</div>
        `;
    
        storeList.appendChild(store);
    });
}

function renderCountrySelect(countries) {
    const activeCountry = countries.find(country => country.active);

    countrySelect.innerHTML = '';

    const select = document.createElement('div');
    select.classList.add('select', 'js-select');

    // Создаём скрытый input
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'country';
    input.value = activeCountry.id;
    input.classList.add('js-select-input');

    input.addEventListener('change', (e) => {
        setActiveCountry(e.target.value);
    });

    select.appendChild(input);

    // Создаём кнопку текущего выбора
    const buttonCurrent = document.createElement('button');
    buttonCurrent.classList.add('select__current', 'js-select-current');
    buttonCurrent.textContent = activeCountry.name;
    select.appendChild(buttonCurrent);

    // Создаём выпадающий блок
    const dropdown = document.createElement('div');
    dropdown.classList.add('select__dropdown', 'js-select-dropdown');
    select.appendChild(dropdown);

    // Внутренний контейнер dropdown
    const dropdownInner = document.createElement('div');
    dropdownInner.classList.add('select__dropdown-inner');
    dropdown.appendChild(dropdownInner);

    // Список опций
    countries.forEach((country) => {
        const option = document.createElement('button');
        option.classList.add('select__option', 'js-select-option');
        if (country.active) {
            option.classList.add('select__option_active');
        }
        option.dataset.value = country.id;
        option.textContent = country.name;
        dropdownInner.appendChild(option);
    }); 

    countrySelect.appendChild(select);
}

function renderCitySelect(countries) {
    const activeCountry = countries.find(country => country.active);
    const activeCity = activeCountry.city.find(city => city.active);

    citySelect.innerHTML = '';

    const select = document.createElement('div');
    select.classList.add('select', 'js-select');

    // Создаём скрытый input
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'city';
    input.value = activeCity.id;
    input.classList.add('js-select-input');

    input.addEventListener('change', (e) => {
        setActiveCity(activeCountry.id, e.target.value);
    });

    select.appendChild(input);

    // Создаём кнопку текущего выбора
    const buttonCurrent = document.createElement('button');
    buttonCurrent.classList.add('select__current', 'js-select-current');
    buttonCurrent.textContent = activeCity.name;
    select.appendChild(buttonCurrent);

    // Создаём выпадающий блок
    const dropdown = document.createElement('div');
    dropdown.classList.add('select__dropdown', 'js-select-dropdown');
    select.appendChild(dropdown);

    // Внутренний контейнер dropdown
    const dropdownInner = document.createElement('div');
    dropdownInner.classList.add('select__dropdown-inner');
    dropdown.appendChild(dropdownInner);

    // Список опций
    activeCountry.city.forEach((city) => {
        const option = document.createElement('button');
        option.classList.add('select__option', 'js-select-option');
        if (city.active) {
            option.classList.add('select__option_active');
        }
        option.dataset.value = city.id;
        option.textContent = city.name;
        dropdownInner.appendChild(option);
    }); 

    citySelect.appendChild(select);
}

function setMapCenter(latitude, longitude, zoom) {
    map.setCenter([latitude, longitude], zoom, {
        duration: 1500
    });
}