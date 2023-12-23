// scripts.js

let dishtable = document.getElementById('dishtable')
let dishTable = document.getElementById('dish-table')
let searchBox = document.getElementById('dishInput')
let popup = document.getElementById("popup")
let popupSearch=document.getElementsByClassName('poupSearch')




function randomDish() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            dishtable.innerHTML += `
                <div class='Dish'>
                    <h2>${data.meals[0][`strMeal`]}</h2>
                    <img src="${data.meals[0][`strMealThumb`]}" alt="Food Image" />
                </div>
            `
            info(data.meals[0])
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Error fetching dish data. Please try again.');
        });
}
function displayDish(name, description) {
    const dishNameElement = document.getElementById('dishName');
    const dishDescriptionElement = document.getElementById('dishDescription');
    const resultContainer = document.getElementById('resultContainer');

    dishNameElement.textContent = `Dish: ${name}`;
    dishDescriptionElement.textContent = `Description: ${description}`;
    resultContainer.style.display = 'block';
}

function searchDish() {
    let searchInput = searchBox.value
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            let result = data.meals
            console.log(result)
            result.forEach((el) => {
                dishTable.innerHTML +=
                    `
                <div class='Dish'>
                <h2>${el.strMeal}</h2>
                <img  class='poupSearch' src="${el.strMealThumb}" alt="Food Image"/>
                </div>

                `
            })// add event listner here
        })

        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Error fetching dish data. Please try again.');
        });
}



document.getElementById('submit').onclick = () => {
    dishTable.innerHTML = ""
    searchDish()
}
randomDish()


let flag = 0


let dish = document.querySelector('#dishtable')
dish.onclick = () => {

    if (flag == 1) {
        popup.style.display = "block"
        flag = 0
    } else {
        popup.style.display = "none"
        flag = 1
    }

}
function info(data){
    popup.innerHTML+=`
    
    <div id="recp">${data.strInstructions}</div>
    `
    let ingredient=document.getElementById("ing")
    for(i = 1; i <= 20; i++){
        let key = `strIngredient${i}`;
        if(data[key] == '' || data[key] == null ){
            break;
        }
        else{
            ingredient.innerHTML += `
            <p>${data[key]}</p>
            `
        }
    }
    
}

popupSearch.addEventListener('click', ()=>{
    console.log('hi')
})

const fetchIngredientsRecipe=(meals)=>{
    console.log(meals);
    let ingredients= getElementById("ing");
    for(let i=1;i<=20;i++){
        const items=meals[`strIngredient${i}`];
        if(items){
            const measure=meals[`strMeasure${i}`];
            ingredients+=`<li>${measure} ${items}</li>`
        }
        else{
            break;
        }
    }
return ingredients;
}

