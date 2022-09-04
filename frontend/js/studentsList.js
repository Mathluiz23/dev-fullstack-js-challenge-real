alert("Olá fui importado")

$(document).ready(() => {
  fetchStudents();
})

function fetchStudents() {
  // permite que faça requisições para api de forma assíncrona
  fetch("http://localhost:3000/students/list").then((response) => {
    return response.json()
  })
  .then((data) => {
    console.log(data);
    const table = $("#studentsList tbody");
    console.log(table);
    data.map((student) => {
      table.append(`
        <tr>
          <td>${student.ra}</td>
          <td>${student.nome}</td>
          <td>${student.cpf}</td>
          <td>
            <a href="#">Editar</a>
            <a href="#">Excluir</a>
          </td>
        </tr>
      `)
    })
  });
}