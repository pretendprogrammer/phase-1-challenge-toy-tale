let addToy = false;

const addBtn = document.querySelector("#new-toy-btn")
const toyFormContainer = document.querySelector(".container")
const toysContainer = document.querySelector("#toy-collection")
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
})


fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(json => {
    let toyKeys = Object.keys(json)
    toyKeys.forEach(function(key){
      let toyObj = json[key]
      createNewCard(toyObj)
    })
  })

function createNewCard(toyObj) {
  let newDiv = document.createElement('div')
    newDiv.className = "card"
  let newImg = document.createElement('img')
    newImg.src = toyObj.image
    newImg.className = "toy-avatar"
  let newParagragh = document.createElement('p')
    newParagragh.innerText = `${toyObj.likes} Likes`
  let newHeader = document.createElement("h2")
    newHeader.innerText = toyObj.name
  let newButton = document.createElement("button")
    newButton.className = "like-btn"
    newButton.dataset = toyObj.id
    newButton.innerText = 'Like <3'
    newButton.addEventListener('click', function(){
      let newlikeCount = toyObj.likes + 1
      let configObject = {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          'likes': newlikeCount
        })
      }
      fetch(`http://localhost:3000/toys/${toyObj.id}`, configObject)
      .then(response => response.json())
      .then(updatedObject => {
        toyObj.likes = updatedObject.likes
        newParagragh.innerText = `${updatedObject.likes} Likes`
      })
    })

  newDiv.append(newHeader, newImg, newParagragh, newButton)

  toysContainer.append(newDiv)
}

const toyForm = document.querySelector('.add-toy-form')
toyForm.addEventListener("submit",function(evt){
  evt.preventDefault()

  const form = evt.target
  let toyName = form.name.value
  let toyImage = form.image.value

  let configObject = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      'likes': 0,
      'name': toyName,
      'image': toyImage
    })
  }
  fetch(`http://localhost:3000/toys/`, configObject)
    .then(response => response.json())
    .then(newlyCreatedObject => {
      createNewCard(newlyCreatedObject)
      toyForm.reset()
      addBtn.click()
    })
})