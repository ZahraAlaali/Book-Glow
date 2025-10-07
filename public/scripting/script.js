const buttonAdd = document.querySelector("#addService")
const formAdd = document.querySelector(".addFormService")
const buttonEdit = document.querySelectorAll("#editService")
const formEdit = document.querySelectorAll(".editFormService")
const cancelButton = document.querySelector("#cancelAdd")
const cancelEdit = document.querySelectorAll(".cancelEdit")
buttonAdd.addEventListener("click", () => {
  formAdd.classList.remove("addService")
  buttonAdd.style.display = "none"
})
cancelButton.addEventListener("click", () => {
  formAdd.classList.add("addService")
  buttonAdd.style.display = "block"
})

buttonEdit.forEach((button, index) => {
  button.addEventListener("click", () => {
    formEdit[index].classList.remove("editService")
    button.style.display = "none"
  })
})
cancelEdit.forEach((button, index) => {
  button.addEventListener("click", () => {
    formEdit[index].classList.add("editService")
    button.style.display = "block"
  })
})
