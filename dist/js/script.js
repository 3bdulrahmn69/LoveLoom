// _________________________ lenis Setup _________________________
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

document.getElementById('currentYear').innerText = new Date().getFullYear();

// _________________________ Templates _________________________
if (window.location.pathname.includes('purchase')) {
  window.addEventListener('load', () => {
    if (localStorage.getItem('selectedTemplate') === null) {
      window.location.href = 'templates';
    }
  });

  const selectedTemplate = JSON.parse(localStorage.getItem('selectedTemplate'));
  document.querySelectorAll('.tBuyName').forEach((el) => {
    el.innerText = selectedTemplate.tName;
  });
  document.querySelectorAll('.tBuyPrice').forEach((el) => {
    el.innerText = selectedTemplate.tPrice;
  });
  document.querySelector(
    '.cll'
  ).style.backgroundImage = `url(${selectedTemplate.tImg})`;
  const buy = document.getElementById('buy');

  buy.addEventListener('click', () => {
    const nameInput = document.querySelector('input[name="name"]');
    const numberInput = document.querySelector('input[name="number"]');
    const paymentRadioButtons = document.querySelectorAll(
      'input[name="payment"]:checked'
    );

    if (
      nameInput.value === '' ||
      numberInput.value === '' ||
      paymentRadioButtons.length === 0
    ) {
      alert('Please fill all the fields');
    } else {
      document.getElementById('purchase-methods').classList.add('hidden');
      document
        .getElementById('purchase-selected-method')
        .classList.remove('hidden');

      const Message = `Hey loveLoom, Mr. ${nameInput.value} with you I want to buy ${selectedTemplate.tName}
template and i have pay ${selectedTemplate.tPrice} by ${paymentRadioButtons[0].value} i
will send the screenshot of the payment now.`;

      if (paymentRadioButtons[0].value === 'Vodafone Cash') {
        document.getElementById('purchase-selected-method').innerHTML = `
      <div class="flex flex-col md:w-4/6 w-11/12 justify-center items-center">
        <figure>
          <img src="assets/images/vodafone.png" width="56" height="56" alt="Vodafone" class="w-14 h-14">
        </figure>
        <h2 class="text-4xl">Vodafone Cash</h2>
        <br>
        <p class="text-2xl self-start">Hey Mr. <span class="capitalize">${nameInput.value}</span></p>
        <p class="md:text-2xl text-xl">
          Please send ${selectedTemplate.tPrice} for ${selectedTemplate.tName}"
          to <span class="bg-red-600 px-4 py-1 rounded">01018326780</span> and take a screenshot then click on the
          button
          below and send the screenshot to us.
        </p>
        <br>
        <a href="https://wa.me/201018326780?text=${Message}"
        class="bg-red-600 rounded py-2 px-8 hover:opacity-85 transition-opacity w-36 h-36 m-2 self-end">Contact</a>
      </div>`;
      } else {
        document.getElementById('purchase-selected-method').innerHTML = `
        <div class="flex flex-col md:w-4/6 w-11/12 justify-center items-center">
        <figure>
          <img src="assets/images/instapay.png" width="56" height="56" alt="instapay" class="w-14 h-14">
        </figure>
        <h2 class="text-4xl">Instapay</h2>
        <br>
        <p class="text-2xl self-start">Hey Mr. <span class="capitalize">${nameInput.value}</span></p>
        <p class="md:text-2xl text-xl">
          Please send ${selectedTemplate.tPrice} for ${selectedTemplate.tName}"
          to <span class="bg-red-600 px-2 py-1 rounded">abdelrahmn69@instapay</span> and take a screenshot then click on the
          button
          below and send the screenshot to us.
        </p>
        <br>
        <a href="https://wa.me/201018326780?text=${Message}"
        class="bg-red-600 rounded py-2 px-8 hover:opacity-85 transition-opacity w-36 h-36 m-2 self-end">Contact</a>
      </div>`;
      }
    }
  });

  document.getElementById('CancelBuy').addEventListener('click', () => {
    localStorage.removeItem('selectedTemplate');
  });
} else if (window.location.pathname.includes('templates')) {
  const templates = {
    template1: {
      tName: 'Among The Stars',
      tDescription:
        'Throw the darkness of space away and feel the warmth of the stars',
      tImg: 'assets/images/template1.png',
      tLink: 'templates/AmongTheStars.html',
      tPrice: '300 EGP',
    },
    template2: {
      tName: 'Between Sky And Earth',
      tDescription: 'Fly with your partner and reach the sky',
      tImg: 'assets/images/template2.png',
      tLink: 'templates/BetweenSkyAndEarth.html',
      tPrice: '300 EGP',
    },
    template3: {
      tName: 'My Sun And Moon',
      tDescription: 'Light up your life with your love',
      tImg: 'assets/images/template3.png',
      tLink: 'templates/MySunAndMoon.html',
      tPrice: '350 EGP',
    },
  };

  const templatesContainer = document.getElementById('templatesContainer');
  const templatesKeys = Object.keys(templates);
  document.getElementById('templatesLen').innerText = templatesKeys.length;

  function createTemplateCard(template, key) {
    const templateCard = document.createElement('div');
    templateCard.classList.add(
      'md:w-5/6',
      'w-full',
      'border-t-2',
      'border-red-600',
      'rounded-lg'
    );
    templateCard.innerHTML = `
      <div class="p-4 bg-neutral-800 rounded-lg">
        <figure class="w-full">
          <img src="${template.tImg}" alt="${template.tName}" class="w-full rounded">
        </figure>
      </div>
      <div class="flex justify-between p-4 md:flex-row flex-col">
        <div class="md:w-2/3 w-full">
          <h3 class="text-3xl text-red-600 font-medium">${template.tName}</h3>
          <p class="md:text-xl text-sm">${template.tDescription}</p>
        </div>
        <div>
          <p class="mb-4">${template.tPrice}</p>
          <div class="w-fit h-fit flex gap-2">
            <a href="${template.tLink}" target="_blank" class="bg-red-600 rounded py-2 px-8 hover:opacity-85 transition-opacity w-36 h-36">View</a>
            <button onclick="moveToBuy('${key}')"
              class="bg-red-600 rounded py-2 px-8 hover:opacity-85 transition-opacity w-36 h-36 m-2">Buy</button>
          </div>
        </div>
      </div>
    `;

    return templateCard;
  }

  templatesKeys.forEach((key) => {
    templatesContainer.appendChild(createTemplateCard(templates[key], key));
  });

  function moveToBuy(templateKey) {
    const selectedTemplate = templates[templateKey];
    localStorage.setItem('selectedTemplate', JSON.stringify(selectedTemplate));
    window.location.href = 'purchase';
  }
} else {
  window.location.href = 'index.html';
}
