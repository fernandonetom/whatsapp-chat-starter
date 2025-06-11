import './style.css';

/*
This is a whatsapp chat starter application
It allows users to start a chat from a whatsapp number
The user can enter a phone number, the phone number will be formatted during the input or paste
and the user can click on the button to start a chat with the number.
*/

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