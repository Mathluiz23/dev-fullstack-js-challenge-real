$(document).ready(() => {
  fetchStudentsManager();
})

function fetchStudentsManager() {
  const urlSearch = new URLSearchParams(window.location.search);
  // console.log(urlSearch.get("ra"));
  const ra = urlSearch.get("ra");
  console.log(ra);

  if(ra) {
    console.log(ra, 'NO IF')
    fetch(`http://localhost:3000/students/find/${ra}`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      const studentForm = $("#studentForm");

      studentForm.find("#name").val(data.nome);
      studentForm.find("#email").val(data.email);
      studentForm.find("#cpf").val(data.cpf);
      studentForm.find("#ra").val(data.ra);

      $(".loader").hide("fast");
      $(".content-page").show("slow")
    });
  } else {

    alert("Nenhum usuário informado");
  }
}