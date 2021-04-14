let addToy = false;

const addBtn = document.querySelector("#new-toy-btn")
const toyFormContainer = document.querySelector(".container")
const toysContainer = document.querySelector("#toy-collection")
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
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

const toyForm = document.querySelector('.add-toy-form')
toyForm.addEventListener("submit",function(evt){
  evt.preventDefault()
  const form = evt.target
  let toyName = form.name.value
  let toyImage = form.image.value
  console.log(toyImage)
  console.log(toyName)

  const toycard = document.createElement('div')
  toycard.classList.add('card')
  toycard.innerHTML = `<h2>${toyName}</h2>
                      <img src=${toyImage} class="toy-avatar" />
                      <p>${0} Likes</p>
                      <button class="like-btn">Like </button>`
                      toysContainer.append(toycard)

})

                    