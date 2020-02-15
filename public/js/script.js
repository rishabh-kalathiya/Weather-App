console.log("client side js file is loaded!");

const weatherForm = document.querySelector("form");
const search_field = document.querySelector("input");
const board = document.querySelector("h4");

weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const location = search_field.value;
    console.log(location);
    fetch("/weather?address="+location).then((response) => {
    response.json().then((data) => {
      if (data.error) return board.innerHTML = data.error;
      board.innerHTML = "Location: "+data.location+"<br><br>"+"Weather: <br><br>"+data.forecast;
  });
});
});