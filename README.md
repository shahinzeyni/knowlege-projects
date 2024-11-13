# knowlage-projects
```
npm create vite@latest .
npm install @reduxjs/toolkit
npm install redux react-redux
npm i react-router-dom

git reset --hard HEAD // change to last commit on Branch

git flow feature start <feature-name>
git checkout develop
git merge feature/<feature-name>
git branch -d feature/<feature-name>
git flow feature finish <feature-name>

```
```
git reset --hard HEAD // change to last commit on Branch

git flow feature start <feature-name>
git checkout develop
git merge feature/<feature-name>
git branch -d feature/<feature-name>
git flow feature finish <feature-name>

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
