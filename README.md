# knowlage-projects
```
npm create vite@latest .
npm install @reduxjs/toolkit
npm install redux react-redux
npm i react-router-dom

git reset --hard HEAD // change to last commit on Branch

git flow feature publish staff-api
git flow feature finish staff-api
```
```
const toEnglishDigits = (persianStr) => {
  return persianStr.replace(/[۰-۹]/g, (digit) =>
    String.fromCharCode(digit.charCodeAt(0) - 1728)
  );
};
const gregorianDate = "۲۰۲۴-۱۱-۰۷";
const englishDate = toEnglishDigits(gregorianDate);

console.log(englishDate); // [OutPut: "2024-11-07"
```
