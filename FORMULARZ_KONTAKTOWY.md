# 📧 Instrukcja Konfiguracji Formularza Kontaktowego

## Jak działa formularz?

Formularz kontaktowy na stronie używa **EmailJS** - darmowej usługi do wysyłania emaili bez własnego serwera.

### Schemat działania:
```
Użytkownik wypełnia formularz
        ↓
JavaScript przechwytuje dane
        ↓
EmailJS wysyła email
        ↓
Email trafia na: biuro@stortechinvest.com
```

---

## 🚀 Konfiguracja krok po kroku

### KROK 1: Rejestracja w EmailJS

1. Wejdź na: https://www.emailjs.com/
2. Kliknij "Sign Up" (Zarejestruj się)
3. Wybierz darmowy plan (Free - 200 emaili/miesiąc)
4. Potwierdź email

### KROK 2: Dodaj serwis email

1. W panelu EmailJS przejdź do **"Email Services"**
2. Kliknij **"Add New Service"**
3. Wybierz swojego dostawcę email:
   - **Gmail** (zalecane)
   - Outlook
   - Yahoo
   - Lub inny
4. Połącz swoje konto email
5. Skopiuj **Service ID** (np. "service_abc123")

### KROK 3: Utwórz szablon email

1. Przejdź do **"Email Templates"**
2. Kliknij **"Create New Template"**
3. Ustaw szablon:

**Subject (Temat):**
```
Nowa wiadomość z formularza kontaktowego - {{from_name}}
```

**Content (Treść):**
```
Otrzymałeś nową wiadomość z formularza kontaktowego:

Imię i nazwisko: {{from_name}}
Email: {{from_email}}
Telefon: {{phone}}

Wiadomość:
{{message}}

---
Wiadomość wysłana ze strony storetechinvest.com
```

4. W ustawieniach ustaw:
   - **To Email:** biuro@stortechinvest.com
   - **From Name:** {{from_name}}
   - **Reply To:** {{from_email}}

5. Zapisz i skopiuj **Template ID** (np. "template_xyz789")

### KROK 4: Pobierz klucz publiczny

1. Przejdź do **"Account"** → **"General"**
2. Znajdź **"Public Key"**
3. Skopiuj klucz (np. "user_abc123xyz")

### KROK 5: Wklej dane do kodu

Otwórz plik **`js/main.js`** i znajdź linie 80-82:

```javascript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';     // ← Wklej Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';   // ← Wklej Template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';     // ← Wklej Public Key
```

Zamień na swoje dane:

```javascript
const EMAILJS_SERVICE_ID = 'service_abc123';
const EMAILJS_TEMPLATE_ID = 'template_xyz789';
const EMAILJS_PUBLIC_KEY = 'user_abc123xyz';
```

### KROK 6: Testowanie

1. Zapisz plik `js/main.js`
2. Odśwież stronę w przeglądarce
3. Wypełnij formularz kontaktowy
4. Kliknij "Wyślij wiadomość"
5. Sprawdź email: biuro@stortechinvest.com

---

## ✅ Pola formularza

Formularz zawiera następujące pola:

- **Imię i nazwisko** * (wymagane)
- **Email** * (wymagane)
- **Telefon** (opcjonalne)
- **Wiadomość** * (wymagane)
- **Akceptacja polityki prywatności** * (wymagane)

---

## 🔧 Tryb DEMO

Obecnie formularz działa w **trybie DEMO**:
- Pokazuje komunikat sukcesu
- NIE wysyła prawdziwych emaili
- Dane są tylko logowane w konsoli przeglądarki

Po skonfigurowaniu EmailJS (kroki powyżej), formularz zacznie wysyłać prawdziwe emaile.

---

## 📊 Limity darmowego planu EmailJS

- **200 emaili/miesiąc** - wystarczające dla małej/średniej firmy
- Bez limitu odbiorców
- Podstawowe statystyki
- Wsparcie email

Jeśli potrzebujesz więcej, możesz przejść na plan płatny (od $15/miesiąc).

---

## 🆘 Rozwiązywanie problemów

### Formularz nie wysyła emaili
1. Sprawdź czy wkleiłeś poprawne klucze w `js/main.js`
2. Sprawdź konsolę przeglądarki (F12) - czy są błędy?
3. Sprawdź czy EmailJS jest aktywny (zaloguj się na emailjs.com)

### Emaile trafiają do SPAM
1. W EmailJS dodaj domenę do "Verified Senders"
2. Poproś dostawcę email o dodanie EmailJS do białej listy

### Chcę zmienić adres odbiorcy
1. W EmailJS edytuj szablon email
2. Zmień pole "To Email" na nowy adres

---

## 📞 Kontakt

W razie problemów:
- Dokumentacja EmailJS: https://www.emailjs.com/docs/
- Support EmailJS: https://www.emailjs.com/support/

---

**Utworzono:** 22.06.2026  
**Wersja:** 1.0