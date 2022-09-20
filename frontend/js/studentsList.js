$(document).ready(() => {
	fetchStudents();

	$('body').on('click', '.removeStudent', function () {
		const ra = $(this).data('ra');
		const deleteConfirm = confirm(
			'Você realmente deseja excluir este estudante?'
		);

		if (deleteConfirm) deleteStudent(ra);
	});

	$('#formSearchStudent').submit((event) => {
		event.preventDefault();
		fetchStudents(event.target.searchInput.value);
	});
});

const deleteStudent = (ra) => {
	fetch(`http://localhost:3000/students/delete/${ra}`, {
		method: 'DELETE',
	})
		.then((response) => {
			console.log(response);
			return response.json();
		})
		.then((data) => {
			alert(data.message);
			fetchStudents();
		});
};

// function getRa(ra) {
//   const studentRa = ra;
//   console.log("depois do clique", studentRa)
// }
/* <a onclick="getRa(${student.ra})" class="removeStudent" data-ra="${student.ra}" href="#">Excluir</a> */

function fetchStudents(searchQuery = '') {
	$('.loader').show('fast');
	$('.content-page').hide();
	// permite que faça requisições para api de forma assíncrona
	fetch(`http://localhost:3000/students/list/${searchQuery}`)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			const table = $('#studentsList tbody');
			table.html('');
			console.log(table);
			data.map((student) => {
				console.log('antes do clique', student.ra);
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
      `);
			});
			$('.loader').hide('fast');
			$('.content-page').show('slow');
		});
}
