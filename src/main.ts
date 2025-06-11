import './style.css';

/*
This is a whatsapp chat starter application
It allows users to start a chat from a whatsapp number
The user can enter a phone number, the phone number will be formatted during the input or paste
and the user can click on the button to start a chat with the number.
*/

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200">
    <div class="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
      <h1 class="text-3xl font-bold text-green-600 mb-4 text-center">Iniciar Conversa no WhatsApp</h1>
      <p class="text-gray-600 mb-6 text-center">Digite um número de telefone para iniciar uma conversa:</p>
      <div class="mb-4">
        <label for="country-code" class="block text-gray-700 mb-1 font-medium">País</label>
        <select id="country-code" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400">
          <option value="+55" selected>Brasil (+55)</option>
          <option value="+1">EUA (+1)</option>
          <option value="+44">Reino Unido (+44)</option>
          <option value="+91">Índia (+91)</option>
          <option value="+61">Austrália (+61)</option>
          <option value="+49">Alemanha (+49)</option>
          <option value="+33">França (+33)</option>
          <option value="+81">Japão (+81)</option>
          <option value="+86">China (+86)</option>
          <option value="+7">Rússia (+7)</option>
          <option value="+34">Espanha (+34)</option>
          <option value="+39">Itália (+39)</option>
          <option value="+82">Coreia do Sul (+82)</option>
          <option value="+55">Portugal (+55)</option>
          <option value="+31">Holanda (+31)</option>
          <option value="+41">Suíça (+41)</option>
          <option value="+46">Suécia (+46)</option>
          <option value="+45">Dinamarca (+45)</option>
          <option value="+34">Espanha (+34)</option>
          <option value="+351">Portugal (+351)</option>
          <option value="+351">Angola (+351)</option>
          <option value="+351">Moçambique (+351)</option>
          <option value="+351">Cabo Verde (+351)</option>
          <option value="+351">Guiné-Bissau (+351)</option>
          <option value="+351">São Tomé e Príncipe (+351)</option>
          <option value="+351">Timor-Leste (+351)</option>
          <option value="+351">Macau (+351)</option>
          <option value="+351">Goa (+351)</option>
          <option value="+351">Damão e Diu (+351)</option>
          <option value="+351">Dadra e Nagar Haveli (+351)</option>
          <option value="+351">Guiné Portuguesa (+351)</option>
          <option value="+351">Índia Portuguesa (+351)</option>
          <option value="+351">Moçambique Português (+351)</option>
          <option value="+351">Angola Portuguesa (+351)</option>
          <option value="+351">Cabo Verde Português (+351)</option>
          <option value="+351">São Tomé e Príncipe Português (+351)</option>
        </select>
      </div>
      <div class="mb-6 relative">
        <label for="phone-number" class="block text-gray-700 mb-1 font-medium">Número de telefone</label>
        <input type="text" id="phone-number" placeholder="Digite o número de telefone"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 pr-16" />
        <button id="paste-btn" type="button"
          class="absolute cursor-pointer right-2 top-9 text-green-600 text-sm font-medium px-2 py-1 bg-white rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          style="z-index:10;">
          colar
        </button>
      </div>
      <button id="start-chat"
        class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200 shadow cursor-pointer">
        Iniciar Conversa
      </button>
    </div>
  </div>
`

const phoneNumberInput = document.getElementById('phone-number') as HTMLInputElement;

phoneNumberInput.addEventListener('input', () => {
  let value = phoneNumberInput.value.replace(/\D/g, '').slice(0, 11); // Only digits, max 11

  if (value.length > 10) {
    // (99) 99999-9999
    phoneNumberInput.value = value.replace(/(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
  } else if (value.length > 6) {
    // (99) 9999-9999
    phoneNumberInput.value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  } else if (value.length > 2) {
    // (99) 9999
    phoneNumberInput.value = value.replace(/(\d{2})(\d{0,4})/, '($1) $2');
  } else if (value.length > 0) {
    // (99
    phoneNumberInput.value = value.replace(/(\d{0,2})/, '($1');
  } else {
    phoneNumberInput.value = '';
  }
});

const startChatButton = document.getElementById('start-chat') as HTMLButtonElement;
const countryCodeSelect = document.getElementById('country-code') as HTMLSelectElement;

startChatButton.addEventListener('click', () => {
  // Get country code and phone number (digits only)
  const countryCode = countryCodeSelect.value.replace(/\D/g, '');
  const phoneRaw = phoneNumberInput.value.replace(/\D/g, '');

  // Validate: country code and phone number must be present
  if (!countryCode || !phoneRaw) {
    alert('Por favor, selecione um país e digite um número de telefone.');
    return;
  }

  // For Brazil, phoneRaw should be 10 or 11 digits (2 DDD + 8/9 digits)
  // For other countries, just check if phoneRaw has at least 6 digits
  let isValid = false;
  if (countryCode === '55') {
    isValid = phoneRaw.length === 10 || phoneRaw.length === 11;
  } else {
    isValid = phoneRaw.length >= 6;
  }

  if (!isValid) {
    alert('Por favor, digite um número de telefone válido.');
    return;
  }

  // Open WhatsApp chat
  const fullNumber = countryCode + phoneRaw;
  window.open(`https://wa.me/${fullNumber}`, '_blank');
});

const pasteBtn = document.getElementById('paste-btn') as HTMLButtonElement;

pasteBtn.addEventListener('click', async () => {
  try {
    const text = await navigator.clipboard.readText();
    phoneNumberInput.value = text;
    phoneNumberInput.dispatchEvent(new Event('input'));
  } catch (e) {
    alert('Não foi possível acessar a área de transferência.');
    console.error('Erro ao acessar a área de transferência:', e);
  }
});