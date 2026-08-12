/* Iphigenai — logica di pagina: lingua, email, form contatti. */
(function () {
  'use strict';

  /* ID del form Formspree (formspree.io → Forms → il codice dopo /f/).
     Finché è vuoto, l'invio resta simulato (solo conferma a schermo). */
  var FORMSPREE_ID = 'maqpakva';

  /* ---------- Lingua (IT/EN, ricordata in localStorage) ---------- */
  var root = document.documentElement;

  function setLang(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    try { localStorage.setItem('iphigenai_lang', lang); } catch (e) {}
    document.querySelectorAll('.lang-switch button').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.setLang === lang));
    });
    /* Le <option> non si possono nascondere via CSS in modo affidabile:
       il testo bilingue è in data-it / data-en. */
    document.querySelectorAll('option[data-it]').forEach(function (opt) {
      opt.textContent = opt.dataset[lang] || opt.dataset.it;
    });
  }

  /* Il sito per ora è solo in italiano: si forza 'it' e si ignora la
     preferenza salvata (che resta in localStorage). Quando tornerà la
     versione EN: ripristinare la riga con `saved` qui sotto e il markup
     del lang-switch (commentato nell'header di index.html). */
  var saved = null;
  try { saved = localStorage.getItem('iphigenai_lang'); } catch (e) {}
  setLang('it');
  /* setLang(saved === 'en' || saved === 'it' ? saved : 'it'); */

  document.querySelectorAll('.lang-switch button').forEach(function (btn) {
    btn.addEventListener('click', function () { setLang(btn.dataset.setLang); });
  });

  /* ---------- Email composta a runtime (anti-scraper) ---------- */
  var email = ['info', 'iphigenai.com'].join('@');
  document.querySelectorAll('[data-email-link]').forEach(function (a) {
    a.href = 'mailto:' + email;
    if (a.hasAttribute('data-email-text')) {
      a.appendChild(document.createTextNode(email));
    }
  });
  document.querySelectorAll('[data-email-text]:not(a)').forEach(function (el) {
    el.textContent = email;
  });

  /* ---------- Form contatti: validazione + conferma ---------- */
  var card = document.querySelector('[data-contact-card]');
  if (!card) return;

  var form = card.querySelector('.form');

  function fieldOf(input) { return input.closest('.field, .field-group'); }

  function clearError(input) {
    var f = fieldOf(input);
    if (f) f.classList.remove('is-invalid');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;

    var name = form.querySelector('[name="name"]');
    if (!name.value.trim()) { fieldOf(name).classList.add('is-invalid'); ok = false; }

    var mail = form.querySelector('[name="email"]');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.value.trim())) {
      fieldOf(mail).classList.add('is-invalid'); ok = false;
    }

    var consent = form.querySelector('[name="consent"]');
    if (!consent.checked) { fieldOf(consent).classList.add('is-invalid'); ok = false; }

    if (!ok) return;

    if (!FORMSPREE_ID) {
      /* Nessun backend configurato: conferma simulata. */
      card.classList.add('is-sent');
      return;
    }

    var btn = form.querySelector('button[type="submit"]');
    var failNote = card.querySelector('.form-fail');
    if (failNote) failNote.classList.remove('is-visible');
    btn.disabled = true;

    fetch('https://formspree.io/f/' + FORMSPREE_ID, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    }).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      form.reset();
      card.classList.add('is-sent');
    }).catch(function () {
      if (failNote) failNote.classList.add('is-visible');
    }).then(function () {
      btn.disabled = false;
    });
  });

  form.querySelectorAll('input, select, textarea').forEach(function (input) {
    input.addEventListener('input', function () { clearError(input); });
    input.addEventListener('change', function () { clearError(input); });
  });

  card.querySelectorAll('[data-form-reset]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      form.reset();
      form.querySelectorAll('.is-invalid').forEach(function (f) { f.classList.remove('is-invalid'); });
      card.classList.remove('is-sent');
    });
  });
})();
