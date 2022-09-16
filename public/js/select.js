const elr = document.querySelectorAll(".bubble_title");
// elr[0].textContent = "hello";
// elr[1].textContent = "";
// elr[0].innerHTML = `<h1>好吃ㄚㄚㄚ</h1>`;
console.log(elr);

//監聽
const startBtn = document.querySelector(".banner");
startBtn.addEventListener("click", function (e) {
  //   elr[0].textContent = "START!";
  // console.log(e.target.nodeName);
  if (e.target.nodeName == "A") {
    console.log("START!");
    // elr[0]("START!").textContent;
  }
});

// axios post 範例

axios
  .post("https://hexschool-tutorial.herokuapp.com/api/signup", {
    email: "fred87ddd73@gmail.com",
    password: "yelloqwstone",
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
