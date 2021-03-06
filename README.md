# Patronative - Dzienniczek
Jest to webowy moduł aplikacji Patronative wspierający zarządzanie ocenianiem zadań kwalifikacyjnych uczestników projektu Intive Patronage.

## Technologie
- React 17
- Material-UI 4.11
- styled-components 5.2
- Frisbee 3.1
- Recoil 0.2

## Instalacja
1) Instalacja Node.js -> https://nodejs.org (zainstaluje się też wtedy menadżer pakietów npm) 
2) Następnie, aby upewnić się że instalacja przebiegła poprawnie, w wierszu poleceń należy wpisać:

```
node -v
npm -v
``` 
System powinien wyświetlić wersję Node.js i npm

3) Zainstalować niezbędne pakiety przy użyciu npm.

```
cd patronage21-java-student-record-FE
npm ci
```

4) Stworzyć plik '.env' w który będzie podana ścieżka do integracja z systemami
```
REACT_APP_USER_MODULE_URL= Adres modułu użytkownika
```

## Wymagania
- Node.js 12+
- npm 6+

## Uruchamianie
Aby uruchomić projekt, należy w wieszu poleceń wpisać komendy:

```
cd patronage21-java-student-record-FE
npm start
```

Aplikacja będzie dostępna pod adresem http://localhost:3000 w przeglądarce internetowej.