# Storetech Investment - Strona WWW

Profesjonalna strona internetowa dla firmy Storetech Investment, specjalizującej się w zarządzaniu inwestycjami, adaptacjach i modernizacjach obiektów oraz facility management.

## 🚀 Funkcjonalności

- ✅ Responsywny design (mobile-first)
- ✅ Nawigacja z smooth scrolling
- ✅ Sekcje: Strona główna, O nas, Usługi, Zaufali nam, Kontakt
- ✅ Formularz kontaktowy z walidacją
- ✅ Integracja z EmailJS do wysyłki wiadomości
- ✅ Animacje scroll
- ✅ Optymalizacja SEO
- ✅ Nowoczesny design z gradientami

## 📁 Struktura Projektu

```
storetechinvest.com/
├── index.html          # Główny plik HTML
├── css/
│   └── style.css       # Wszystkie style
├── js/
│   └── main.js         # JavaScript (nawigacja, formularz)
├── images/             # Folder na grafiki
├── favicon.svg         # Ikona strony (SVG)
├── favicon.ico         # Ikona strony (ICO) - do dodania
└── README.md           # Ten plik
```

## 🛠️ Instalacja i Uruchomienie

### Metoda 1: Bezpośrednie otwarcie
1. Pobierz wszystkie pliki
2. Otwórz `index.html` w przeglądarce

### Metoda 2: Lokalny serwer (zalecane)
```bash
# Użyj Python
python -m http.server 8000

# Lub Node.js (npx)
npx http-server

# Lub VS Code Live Server
# Kliknij prawym przyciskiem na index.html -> "Open with Live Server"
```

Następnie otwórz: `http://localhost:8000`

## 📧 Konfiguracja EmailJS

Aby formularz kontaktowy działał poprawnie, musisz skonfigurować EmailJS:

### Krok 1: Utwórz konto EmailJS
1. Przejdź na https://www.emailjs.com/
2. Zarejestruj się (darmowe konto wystarczy)

### Krok 2: Skonfiguruj serwis email
1. W panelu EmailJS przejdź do "Email Services"
2. Dodaj nowy serwis (np. Gmail, Outlook)
3. Skopiuj **Service ID**

### Krok 3: Utwórz szablon email
1. Przejdź do "Email Templates"
2. Utwórz nowy szablon z następującymi zmiennymi:
   - `{{from_name}}` - imię nadawcy
   - `{{from_email}}` - email nadawcy
   - `{{phone}}` - telefon
   - `{{subject}}` - temat
   - `{{message}}` - treść wiadomości
   - `{{to_email}}` - Twój email (biuro@stortechinvest.com)
3. Skopiuj **Template ID**

### Krok 4: Pobierz klucz publiczny
1. Przejdź do "Account" -> "General"
2. Skopiuj **Public Key**

### Krok 5: Zaktualizuj kod
Otwórz `js/main.js` i zamień wartości w linii ~45-47:

```javascript
const EMAILJS_SERVICE_ID = 'twoj_service_id';
const EMAILJS_TEMPLATE_ID = 'twoj_template_id';
const EMAILJS_PUBLIC_KEY = 'twoj_public_key';
```

## 🎨 Personalizacja

### Zmiana kolorów
Edytuj zmienne CSS w `css/style.css` (linie 11-24):

```css
:root {
    --primary-color: #000000;      /* Główny kolor - czarny */
    --secondary-color: #6B9F3E;    /* Kolor akcentu - zielony */
    --accent-color: #8BC34A;       /* Jasny zielony */
    /* ... */
}
```

### Zmiana treści
Edytuj `index.html`:
- **Dane kontaktowe**: Linie 275-297
- **Usługi**: Linie 141-194
- **O nas**: Linie 89-122
- **Klienci**: Linie 206-256

### Dodanie logo
1. Umieść plik logo w folderze `images/`
2. W `index.html` (linia 37-40) zamień ikonę na logo:

```html
<a href="#home" class="logo">
    <img src="LOGO1.png" alt="Storetech Investment">
</a>
```

### Dodanie zdjęć
1. Umieść zdjęcia w folderze `images/`
2. Zamień placeholder w sekcji "O nas" (linia 125-128):

```html
<div class="about-image">
    <img src="images/team.jpg" alt="Nasz zespół">
</div>
```

## 🌐 Hosting

### Opcja 1: GitHub Pages (darmowy)
1. Utwórz repozytorium na GitHub
2. Wgraj pliki
3. Włącz GitHub Pages w ustawieniach
4. Strona będzie dostępna pod: `username.github.io/repo-name`

### Opcja 2: Netlify (darmowy)
1. Przejdź na https://www.netlify.com/
2. Przeciągnij folder z plikami
3. Strona zostanie automatycznie opublikowana

### Opcja 3: Własny hosting
1. Kup domenę storetechinvest.com
2. Kup hosting (np. home.pl, nazwa.pl)
3. Wgraj pliki przez FTP
4. Skonfiguruj domenę

## 📱 Responsywność

Strona jest w pełni responsywna i działa na:
- 📱 Smartfonach (320px+)
- 📱 Tabletach (768px+)
- 💻 Laptopach (1024px+)
- 🖥️ Dużych ekranach (1920px+)

## ✅ Checklist przed publikacją

- [ ] Zaktualizuj dane kontaktowe (telefon, email, adres)
- [ ] Skonfiguruj EmailJS
- [ ] Dodaj prawdziwe logo firmy
- [ ] Dodaj zdjęcia zespołu/realizacji
- [ ] Dodaj logo klientów w sekcji "Zaufali nam"
- [ ] Wygeneruj favicon.ico (możesz użyć: https://favicon.io/)
- [ ] Przetestuj formularz kontaktowy
- [ ] Sprawdź na różnych urządzeniach
- [ ] Zoptymalizuj obrazy (kompresja)
- [ ] Dodaj Google Analytics (opcjonalnie)
- [ ] Dodaj politykę prywatności (RODO)

## 🔧 Wsparcie techniczne

Jeśli potrzebujesz pomocy:
1. Sprawdź konsolę przeglądarki (F12) w poszukiwaniu błędów
2. Upewnij się, że wszystkie pliki są w odpowiednich folderach
3. Sprawdź, czy EmailJS jest poprawnie skonfigurowany

## 📄 Licencja

Projekt stworzony dla Storetech Investment. Wszystkie prawa zastrzeżone.

---

**Wersja:** 1.0.0  
**Data:** 2026-06-13  
**Autor:** Bob (AI Assistant)