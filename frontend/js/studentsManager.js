$(document).ready(() => {
	fetchStudentsManager();
	const urlSearch = new URLSearchParams(window.location.search);
	const ra = urlSearch.get("ra");

	if (ra) {
		fetchStudentsManager(ra);
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

		fetch("http://localhost:3000/students/newstudent", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				document.location.href = "studentsList.html";
			});
	});
});

function fetchStudentsManager(ra) {
	fetch(`http://localhost:3000/students/find/${ra}`)
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
