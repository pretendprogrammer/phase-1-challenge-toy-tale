let addToy = false;
const objectInMemory = {}

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

function populatePageWithToys() {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(json => {
      let toyKeys = Object.keys(json)
      toyKeys.forEach(function(key){
        let toyObj = json[key]
        let newDiv = document.createElement('div')
        let newImg = document.createElement('img')
        let newParagragh = document.createElement('p')
        let newHeader = document.createElement("h2")
        let newButton = document.createElement("button")

        newDiv.className = "card"
        newHeader.innerText = toyObj.name
        newImg.src = toyObj.image
        newImg.className = "toy-avatar"
        newButton.className = "like-btn"
        newButton.id = toyObj.id
        newButton.innerText = 'Like'
        newParagragh.innerText = `${toyObj.likes} Likes`
        newDiv.append(newHeader)
        newDiv.append(newImg)
        newDiv.append(newParagragh)
        newDiv.append(newButton)
        toysContainer.append(newDiv)

        newButton.addEventListener('click', function(event){
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
      })
    })
  }

populatePageWithToys()

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
      toysContainer.innerText = ''
      populatePageWithToys()
      toyForm.reset()
      addBtn.click()
    })
})