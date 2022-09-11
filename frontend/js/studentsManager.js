$(document).ready(() => {
	if (isEditingStudent()) {
		fetchStudentsManager();
	} else {
		$(".loader").hide("fast");
		$(".content-page").show("slow");
	}

	$("#studentForm").submit(function (event) {
		event.preventDefault();

		const body = {
			name: $(this).find("#name").val(),
			ra: $(this).find("#ra").val(),
			cpf: $(this).find("#cpf").val(),
			email: event.target.email.value,
		};

		let methodEndPoint;
		let urlEndPoint;

		if (isEditingStudent()) {
			methodEndPoint = "PUT";
			urlEndPoint = `http://localhost:3000/students/editstudent/${getRAfromUrl()}`;
		} else {
			methodEndPoint = "POST";
			urlEndPoint = "http://localhost:3000/students/newstudent";
		}

		fetch(urlEndPoint, {
			method: methodEndPoint,
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				alert(data.message);
				document.location.href = "studentsList.html";
			});
	});
});

function fetchStudentsManager() {
	fetch(`http://localhost:3000/students/find/${getRAfromUrl()}`)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			const studentForm = $("#studentForm");

			studentForm.find("#name").val(data.nome);
			studentForm.find("#email").val(data.email);
			studentForm.find("#cpf").val(data.cpf);
			studentForm.find("#ra").val(data.ra);

			$(".loader").hide("fast");
			$(".content-page").show("slow");
		});
}

function isEditingStudent() {
	const urlSearch = new URLSearchParams(window.location.search);
	return urlSearch.has("ra");
}

function getRAfromUrl() {
	const urlSearch = new URLSearchParams(window.location.search);
	return urlSearch.get("ra");
}
