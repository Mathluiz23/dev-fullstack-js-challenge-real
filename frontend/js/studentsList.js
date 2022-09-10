$(document).ready(() => {
  fetchStudents();

  $("body").on("click", ".removeStudent", function()  {
    const ra = $(this).data("ra");
    console.log("depois do clique", ra)
  });

});

// function getRa(ra) {
//   const studentRa = ra;
//   console.log("depois do clique", studentRa)
// }
{/* <a onclick="getRa(${student.ra})" class="removeStudent" data-ra="${student.ra}" href="#">Excluir</a> */}

function fetchStudents() {
  // permite que faça requisições para api de forma assíncrona
  fetch("http://localhost:3000/students/list").then((response) => {
    return response.json()
  })
  .then((data) => {
    const table = $("#studentsList tbody");
    console.log(table);
    data.map((student) => {
      console.log("antes do clique", student.ra);
      table.append(`
        <tr>
          <td>${student.ra}</td>
          <td>${student.nome}</td>
          <td>${student.cpf}</td>
          <td>
            <a href="studentsManager.html?ra=${student.ra}">Editar</a>
            <a class="removeStudent" data-ra="${student.ra}" href="#">Excluir</a>
          </td>
        </tr>
      `)
    })
    $(".loader").hide("fast");
    $(".content-page").show("slow");
  });
}