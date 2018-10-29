var Glumci=[];
var Predstave =[];
var Prikazivanja =[];


// događaj dohvaćanja podataka iz čvora glumci
 oDbGlumci.on('value', function(oOdgovorPosluzitelja) 
{
	// petlja kroz pojedinog glumca
	oOdgovorPosluzitelja.forEach(function(oGlumacSnapshot)
	{
		var sGlumacKey = oGlumacSnapshot.key; // ključ pojedinog glumca
		var oGlumac = oGlumacSnapshot.val(); // svojstva glumaca u Javascript objekt obliku

	Glumci.push({ 
		"glumac_id": sGlumacKey,
	 	"ime": oGlumac.ime,
	    "prezime": oGlumac.prezime 
		});
	});
	console.log(Glumci);
});

 
//događaj dohvačanja podataka iz čvora predstave
oDbPredstave.on('value', function(oOdgovorPosluzitelja) 
{
	//petlja kroz predstave
	oOdgovorPosluzitelja.forEach(function(oPredstavaSnapshot)
	{
		var sPredstavaKey = oPredstavaSnapshot.key;//kljuc predstave
		var oPredstava = oPredstavaSnapshot.val();//objekt predstava

		Predstave.push({ 
			"predstava_id": sPredstavaKey, 
			"naziv": oPredstava.naziv,
			"glumci":oPredstava.glumci
		 });
	});
	PopuniTablicuGlumci();
	PopuniTablicuPredstave();

console.log(Predstave);
	
});

oDbPrikazivanja.on('value', function(oOdgovorPosluzitelja) //dogadaj, gledaj mi promijene i kada se ucita aplikacija pokreni sto se nalazi unutar tijela-...u OdgPosluzitelja nalaze se atributi unutar cvora
{
	oOdgovorPosluzitelja.forEach(function(oPrikazivanjaSnapshot) //
	{
		var sPrikazivanjeKey = oPrikazivanjaSnapshot.key;
		var oPrikazivanje = oPrikazivanjaSnapshot.val();
					
		Prikazivanja.push({
			"prikazivanje_id":sPrikazivanjeKey,
			"pocetak_datum":oPrikazivanje.pocetak_datum,
			"pocetak_vrijeme":oPrikazivanje.pocetak_vrijeme,
			"predstava":oPrikazivanje.predstava
		});
	});
	console.log(Prikazivanja);
	PopuniTablicuPrikazivanja();
	PopuniTablicuPredstave();
});


function PopuniTablicuPrikazivanja()
{
	var oTablica=$('#tablica-prikazivanje').find('tbody');
	Prikazivanja.forEach(function(oPrikazivanje){
		var sRow=`<tr>
				<td>`+oPrikazivanje.pocetak_datum+`</td>
				<td>`+oPrikazivanje.pocetak_vrijeme+`</td>
				<td>`+DajNazivPredstave(oPrikazivanje.predstava)+`</td>
				<td>`+DajGlumcePredstave(oPrikazivanje.predstava)+`</td>
		</tr>`;
		oTablica.append(sRow);
	})
}


function DajNazivPredstave(nIdPredstave)
{
	var sNazivPredstave="";
	Predstave.forEach(function(oPredstava){
		if(nIdPredstave==oPredstava.predstava_id)
		{
			sNazivPredstave=oPredstava.naziv;
		}
	});
	return sNazivPredstave;
}

function DajGlumcePredstave(sPredstavaID)
{
	var aGlumciNazivi=[];
	Predstave.forEach(function(oPredstava){
		if(sPredstavaID==oPredstava.predstava_id)
		{
			var aGlumciIDs=oPredstava.glumci;
			//console.log(aGlumciIDs);
			aGlumciIDs.forEach(function(nGlumac)
			{
				aGlumciNazivi.push(DajImePrezimeGlumca(nGlumac));
			});
		}
	});
	return aGlumciNazivi.toString();
}

function DajImePrezimeGlumca(nGlumac)
{
	var sImePrezimeGlumca="";
	Glumci.forEach(function(oGlumac){
		if(nGlumac==oGlumac.glumac_id)
		{
			sImePrezimeGlumca=oGlumac.ime + " " + oGlumac.prezime;
		}
	});
	return sImePrezimeGlumca;
}

function PopuniTablicuGlumci()
{
	var oTablica=$('#tablica-glumci').find('tbody');
	Glumci.forEach(function(oGlumac){
		var sRow=`<tr>

				<td>`+oGlumac.ime+` `+oGlumac.prezime+`</td>
				<td>`+DajPredstaveGlumca(oGlumac.glumac_id)+`</td>

		</tr>`;
		oTablica.append(sRow);
	})
}

function DajPredstaveGlumca(nGlumacID)
{
		var aPredstaveNazivi=[];
		Predstave.forEach(function(oPredstava)
		{
			var aGlumciIDs=oPredstava.glumci;
			aGlumciIDs.forEach(function(nGlumac)
			{
				if(nGlumacID==nGlumac)
				{
					aPredstaveNazivi.push(oPredstava.naziv);
				}
			});
		});
		return aPredstaveNazivi.toString();
}

function PopuniTablicuPredstave()
{
	var oTablica = $('#tablica-predstave').find('tbody');
	Predstave.forEach(function(oPredstava){
		var sRow = `<tr>
				<td>`+oPredstava.naziv+`</td>
				<td>`+BrojPrikazivanja(oPredstava.predstava_id)+`</td>
		</tr>`;
		oTablica.append(sRow);
	})
}

function BrojPrikazivanja(nPredstavaID)
{
	var nBrojPrikazivanja=0;
	Prikazivanja.forEach(function(oPrikazivanje){
		if(nPredstavaID==oPrikazivanje.predstava)
		{
			nBrojPrikazivanja++;
		}
	});
	return nBrojPrikazivanja;

}
