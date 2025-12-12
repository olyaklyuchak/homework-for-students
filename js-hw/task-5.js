/*
    Фільтрація масиву чисел:
    Дано масив чисел [1, 2, 3, 4, 5, 6].
    Відфільтрувати лише парні.
    Приклад [1, 2, 3, 4, 5, 6] → [2, 4, 6].
*/

const array = [1, 2, 3, 4, 5, 6];

const NewArray = array.filter((number)=>{
     if(number % 2 === 0 ){
        return true
     }
     else{
        return false
     }
})
   
console.log(NewArray)