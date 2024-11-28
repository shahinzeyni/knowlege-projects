# knowlage-projects
```
npm create vite@latest .
npm install @reduxjs/toolkit
npm install redux react-redux
npm i react-router-dom
```
```
git reset --hard HEAD // change to last commit on Branch
git rm --cached src/component/templates/p-admin/Classes/Classes.tsx
git rm --cached -r .


git flow feature start <feature-name>
git add . //<feature-name>
git commit
git checkout develop
git pull origin develop
git checkout  <feature-name>
git merge develop
git push origin feature/<feature-name>

git branch -d feature/<feature-name>
git branch -D feature/<feature-name>    //force
git flow feature finish <-name>
```
```
Convert fa digit to en digit 
const toEnglishDigits = (persianStr) => {
  return persianStr.replace(/[۰-۹]/g, (digit) =>
    String.fromCharCode(digit.charCodeAt(0) - 1728)
  );
};
const gregorianDate = "۲۰۲۴-۱۱-۰۷";
const englishDate = toEnglishDigits(gregorianDate);

console.log(englishDate); // [OutPut: "2024-11-07"
```
