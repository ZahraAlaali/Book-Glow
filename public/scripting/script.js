const buttonAdd =  document.querySelector("#addService")
const formAdd = document.querySelector(".addFormService")
const buttonEdit = document.querySelectorAll("#editService")
const formEdit = document.querySelectorAll(".editFormService")
buttonAdd.addEventListener("click", ()=>{
  formAdd.classList.remove("addService")
})

buttonEdit.forEach((button,index)=>{
  button.addEventListener("click", ()=>{
  formEdit[index].classList.remove("editService")
})
})
