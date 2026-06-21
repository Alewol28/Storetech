# 📧 Instrukcja Konfiguracji EmailJS

## Krok po kroku: Jak skonfigurować formularz kontaktowy

### 1. Utwórz konto EmailJS (5 minut)

1. Przejdź na: **https://www.emailjs.com/**
2. Kliknij **"Sign Up"** (Zarejestruj się)
3. Możesz użyć konta Google lub email
4. Potwierdź email (sprawdź skrzynkę)

**Darmowy plan:** 200 wiadomości/miesiąc (wystarczy na start!)

---

### 2. Dodaj Email Service (3 minuty)

1. Po zalogowaniu, przejdź do **"Email Services"** w menu
2. Kliknij **"Add New Service"**
3. Wybierz swojego dostawcę email:
   - **Gmail** (najpopularniejszy)
   - Outlook
   - Yahoo
   - Lub inny

#### Dla Gmail:
1. Wybierz **Gmail**
2. Kliknij **"Connect Account"**
3. Zaloguj się na swoje konto Gmail
4. Zezwól EmailJS na dostęp
5. **Skopiuj Service ID** (np. `service_abc123`)

---

### 3. Utwórz Email Template (5 minut)

1. Przejdź do **"Email Templates"**
2. Kliknij **"Create New Template"**
3. Nazwij szablon: `contact_form`

#### Wypełnij szablon:

**Subject (Temat):**
```
Nowa wiadomość z formularza: {{subject}}
```

**Content (Treść):**
```
Otrzymałeś nową wiadomość z formularza kontaktowego na stronie StoreTech Invest:

Od: {{from_name}}
Email: {{from_email}}
Telefon: {{phone}}

Temat: {{subject}}

Wiadomość:
{{message}}

---
Ta wiadomość została wysłana automatycznie z formularza kontaktowego.
```

**To Email (Do kogo):**
```
kontakt@storetechinvest.com
```
*(Zmień na swój prawdziwy email!)*

4. Kliknij **"Save"**
5. **Skopiuj Template ID** (np. `template_xyz789`)

---

### 4. Pobierz Public Key (1 minuta)

1. Kliknij na swoje imię w prawym górnym rogu
2. Wybierz **"Account"**
3. Przejdź do zakładki **"General"**
4. **Skopiuj Public Key** (np. `user_abc123xyz`)

---

### 5. Zaktualizuj kod strony (2 minuty)

1. Otwórz plik: **`js/main.js`**
2. Znajdź linie 45-47 (na początku pliku)
3. Zamień wartości na swoje:

```javascript
// PRZED (domyślne wartości):
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

// PO (twoje wartości):
const EMAILJS_SERVICE_ID = 'service_abc123';      // Twój Service ID
const EMAILJS_TEMPLATE_ID = 'template_xyz789';    // Twój Template ID
const EMAILJS_PUBLIC_KEY = 'user_abc123xyz';      // Twój Public Key
```

4. Zapisz plik

---

### 6. Testowanie (2 minuty)

1. Otwórz stronę w przeglądarce
2. Przewiń do sekcji **"Kontakt"**
3. Wypełnij formularz testowymi danymi
4. Kliknij **"Wyślij wiadomość"**
5. Sprawdź swoją skrzynkę email!

**Jeśli nie działa:**
- Sprawdź konsolę przeglądarki (F12)
- Upewnij się, że skopiowałeś poprawne ID
- Sprawdź, czy email w szablonie jest prawidłowy

---

## 🎯 Szybki Start (dla zaawansowanych)

```bash
# 1. Zarejestruj się: https://www.emailjs.com/
# 2. Dodaj Gmail Service → Skopiuj Service ID
# 3. Utwórz Template → Skopiuj Template ID
# 4. Account → General → Skopiuj Public Key
# 5. Edytuj js/main.js (linie 45-47)
# 6. Testuj!
```

---

## 📝 Przykładowy szablon Email (gotowy do skopiowania)

### Subject:
```
🔧 Nowa wiadomość: {{subject}}
```

### Content:
```html
<h2>Nowa wiadomość z formularza kontaktowego</h2>

<p><strong>Od:</strong> {{from_name}}</p>
<p><strong>Email:</strong> <a href="mailto:{{from_email}}">{{from_email}}</a></p>
<p><strong>Telefon:</strong> {{phone}}</p>

<hr>

<h3>{{subject}}</h3>
<p>{{message}}</p>

<hr>
<p style="color: #666; font-size: 12px;">
  Wiadomość wysłana ze strony storetechinvest.com
</p>
```

---

## ❓ Najczęstsze problemy

### Problem: "EmailJS is not defined"
**Rozwiązanie:** Sprawdź czy w `index.html` jest link do biblioteki EmailJS (linia 379)

### Problem: "Service ID not found"
**Rozwiązanie:** Sprawdź czy skopiowałeś poprawny Service ID z EmailJS

### Problem: "Template ID not found"
**Rozwiązanie:** Upewnij się, że szablon jest zapisany i aktywny

### Problem: Wiadomości nie przychodzą
**Rozwiązanie:** 
1. Sprawdź folder SPAM
2. Sprawdź czy email w szablonie jest poprawny
3. Sprawdź limit wiadomości (200/miesiąc w darmowym planie)

---

## 🔒 Bezpieczeństwo

✅ **Public Key jest bezpieczny** - może być widoczny w kodzie  
✅ **EmailJS chroni przed spamem** - ma wbudowane limity  
✅ **Nie potrzebujesz backendu** - wszystko działa po stronie klienta  

---

## 💡 Dodatkowe funkcje (opcjonalnie)

### Auto-reply (automatyczna odpowiedź)
1. Utwórz drugi szablon dla klienta
2. Dodaj kod w `js/main.js` do wysyłki drugiej wiadomości

### Captcha (ochrona przed botami)
1. W EmailJS włącz reCAPTCHA
2. Dodaj klucz reCAPTCHA do kodu

### Powiadomienia SMS
1. Zintegruj z Twilio lub innym serwisem SMS
2. Dodaj webhook w EmailJS

---

## 📞 Potrzebujesz pomocy?

- **Dokumentacja EmailJS:** https://www.emailjs.com/docs/
- **Support EmailJS:** support@emailjs.com
- **Tutorial wideo:** https://www.youtube.com/watch?v=dgcYOm8n8ME

---

**Powodzenia! 🚀**

Po skonfigurowaniu EmailJS, Twój formularz kontaktowy będzie w pełni funkcjonalny!