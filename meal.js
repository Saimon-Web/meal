const searchFood = () => {
    const searchFieldId = document.getElementById('search-field');
    const searchText = searchFieldId.value;

    if (searchText == ' ') {
        console.log('not found')
        const not = document.getElementById('not')
        const Div = document.createElement('div')
        Div.innerHTML = `
        <h1> not found</h1>
        `
        not.appendChild(Div)
        break;
    }

    searchFieldId.value = '';
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
        .then(Response => Response.json())
        .then(data => displayShowMeals(data.meals))
}

const displayShowMeals = meals => {
    const searchShow = document.getElementById('searchShowCard');

    searchShow.textContent = '';
    const result = document.getElementById('result-not');
    result.textContent = '';
    if (meals == null) {

        const Div = document.createElement('div')
        Div.innerHTML = `
        <h1>result not found</h1>
        `
        result.appendChild(Div)
    }
    meals.forEach(meal => {

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="singleMeal(${meal.idMeal})" class="card">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
                </div>
            </div>
        `
        searchShow.appendChild(div)

    });
}

const singleMeal = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(response => response.json())
        .then(data => singleMealDetails(data.meals[0]))

}

const singleMealDetails = mealDetails => {
    console.log(mealDetails)
    const searchShowCardSingle = document.getElementById('searchShowCardSingle');

    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    
            <img src="${mealDetails.strMealThumb}" class="card-img-top" >
            <div class="card-body">
                <h5 class="card-title">${mealDetails.strMeal}</h5>
                <p class="card-text">${mealDetails.strInstructions.slice(0, 250)}</p>
            </div>
        
    `
    searchShowCardSingle.appendChild(div)
}