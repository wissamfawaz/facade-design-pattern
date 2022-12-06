const ingredientsList = document.querySelector('.results_list');
const ingredientsDiv = document.querySelector(".Div_results");
const searchInput = document.querySelector("#new_single_ingredient");



let resultsSet = new Set();

fetch("lebanesefood.json").then(function(response){
  return response.json();
}).then(function (object){
  object.forEach(recipes =>{
      recipes.ingredients.forEach(ingr =>{
        resultsSet.add(ingr);
      });
  })
  const results = Array.from(resultsSet);
  results.sort(); 
  for(let x=0; x<results.length; x=x+1){

  let li = document.createElement('li');
  li.className= "listItem" ;
  li.textContent = results[x];
  ingredientsList.appendChild(li);
  li.appendChild(createCheckbox('liCheckbox'));

  }

  searchInput.addEventListener("input", e => {

    const ingredientItems = document.querySelectorAll('.listItem'); 
    for(let y=0; y<ingredientItems.length; y=y+1){
      const value = e.target.value.toLowerCase();
      const isVisible = results[y].toLowerCase().includes(value);
      ingredientItems[y].classList.toggle("hide", !isVisible);
    }
})


//saving the user's input
const allCheckboxes = document.querySelectorAll(".liCheckbox");


for(let x=0; x<allCheckboxes.length; x++){
allCheckboxes[x].addEventListener('click', ()=>{
  const checkboxInnerText = allCheckboxes[x].parentElement.innerText;
  allCheckboxes[x].parentElement.classList.toggle('clicked',allCheckboxes[x].clicked);
  if(allCheckboxes[x].checked){
    if(!sessionStorage.getItem(checkboxInnerText)){
      sessionStorage.setItem(checkboxInnerText,checkboxInnerText);
    }
  }
  else{
    if(sessionStorage.getItem(checkboxInnerText)){
      sessionStorage.removeItem(checkboxInnerText);
    }
  }
})
}

})


function createCheckbox(checkboxClass){
  let checkbox = document.createElement('input');
  checkbox.type='checkbox';
  checkbox.className=checkboxClass;
  return checkbox;
}
 

