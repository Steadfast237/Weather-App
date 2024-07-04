import './styles.css';

async function getCityCurrentWeather(city) {
  const key = '9a88c63f925e48a6985111651240107';
  const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqui=no`;

  try {
    const response = await fetch(url, { mode: 'cors' });

    if (!response.ok) {
      throw await response.json();
    }

    return await response.json();
  } catch (error) {
    return error;
  }
}

function ScreenController() {
  const form = document.querySelector('form');
  const content = document.querySelector('.content');

  function updateScreen(data) {
    let markup = '';

    if (data.error) {
      markup = `<h3>${data.error.message}</h3>`;
      content.innerHTML = markup;
      return;
    }

    const { location, current } = data;

    markup = `
    <div class="temp-container">
        <div class="temp">
            ${current.temp_c}°
            <span class="after-temp">C</span>
        </div>
    </div>

    <div class="temp-detail">
        <h3>${location.name}, ${location.country}</h3>
        <p>Feels Like: ${current.feelslike_f}F</p>
        <p>wind: ${current.wind_mph}</p>
        <p>humudity: ${current.humidity}%</p>
    </div>`;

    content.innerHTML = markup;
  }

  async function handleForm(e) {
    e.preventDefault();

    const query = e.target.children[0];
    const data = await getCityCurrentWeather(query.value);

    updateScreen(data);

    query.value = '';
  }

  form.addEventListener('submit', handleForm);
}

ScreenController();
