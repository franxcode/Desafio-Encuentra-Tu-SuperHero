(function ($) {
	$(".classForm").on("submit", function (e) {
		e.preventDefault();
		const superHeroID = parseInt($(".searchClass").val());
		if (isNaN(superHeroID)) {
			return alert("Solo puedes ingresar numeros.");
		}
		if (superHeroID < 1 || superHeroID > 731) {
			return alert("Solo puedes ingresar numeros entre 1 y 731.");
		}
		APICall(superHeroID);
	});
})(jQuery);

function APICall(id) {
	$.ajax({
		type: "GET",
		dataType: "json",
		url: `https://superheroapi.com/api.php/106629905149807/${id}`,
		success: function (dataAPI) {
			const cardHtml = `
      		<h4 class="text-center">SuperHero Encontrado</h4>
      		<div class="card mb-3">
        	<div class="row g-0">
          	<div class="col-md-4">
          	<img src="${dataAPI.image.url}" class="img-fluid img-thumbnail h-100 w-100 rounded-start" alt="SuperHero ${dataAPI.name}"></div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Nombre: ${dataAPI.name}</h5>
                <p class="card-text">Conexiones:${dataAPI.connections["group-affiliation"]}</p>
							<ul class="list-group list-group-flush">
							<li class="list-group-item"><em>Publicado Por</em>: ${dataAPI.biography.publisher}</li>
							<li class="list-group-item"><em>Ocupaci&oacute;n</em>: ${dataAPI.work.occupation}</li>
							<li class="list-group-item"><em>Primera Aparici&oacute;n</em>: ${dataAPI.biography["first-appearance"]}</li>
							<li class="list-group-item"><em>Altura</em>: ${dataAPI.appearance.height}</li>
							<li class="list-group-item"><em>Peso</em>: ${dataAPI.appearance.weight}</li>
							<li class="list-group-item"><em>Aliases</em>: ${dataAPI.biography.aliases.join(", ")}</li>
							</ul>
            			</div>
          			</div>
        		</div>
      		</div>`;
			$(".superHeroCard").html(cardHtml);
			canvasJSSuperHeroChart(dataAPI);
		},
		error: function (error) {
			console.log(error);
		},
	});
}

function canvasJSSuperHeroChart(dataAPICanvas) {
	var options = {
		title: {
			text: `Estadisticas de poder de ${dataAPICanvas.name}`,
		},
		data: [
			{
				type: "pie",
				startAngle: 45,
				showInLegend: "true",
				legendText: "{label}",
				indexLabel: "{label} ({y})",
				dataPoints: [
					{ label: "Intelligence", y: dataAPICanvas.powerstats.intelligence },
					{ label: "Strength", y: dataAPICanvas.powerstats.strength },
					{ label: "Speed", y: dataAPICanvas.powerstats.speed },
					{ label: "Durability", y: dataAPICanvas.powerstats.durability },
					{ label: "Power", y: dataAPICanvas.powerstats.power },
					{ label: "Combat", y: dataAPICanvas.powerstats.combat },
				],
			},
		],
	};

	$("#chartContainer").CanvasJSChart(options);
}
