# HELVETAS - SERBIA

## Bank OTP

### 04.10.2023

TAGS Translations

izvod = estratto (extract)
oznaka = denominazione (denomination)
sifra = codice (code)
racun = conto (account)
brojIzvoda = numero dell'estratto (exctract number)
naziv = nome (name)
maticniBroj = numero di registro (register number)
prethodnoStanje = saldo precedente (previous balance)
DnevniPrometDugovni = traffico debiti giornaliero (daily debt traffic)
DnevniPrometPotrazni = traffico crediti giornaliero (daily credit traffic)
novoStanje = saldo nuovo (new balance)
BrojNalogaZaduzenja = numero ordine di addebito (debit order number)
BrojNalogaOdobrenja = numero ordine di approvazione (approval order number)
stavke = voci (entries)
duguje = dare (debit)
potrazuje = avere (credit)
datumKnjizenja = data contabilizzazione (date of accounting)
nalog = ordine (order)
osnov = base 
iznos = importo (amount)
GodinaKontrolnika = anno di controllo (year of control)
BrojKontrolnika = numero di controllo (number of control)
opis = descrizione (description)
Predmet = oggetto (object)
Instrumentplacanja = metodo di pagamento (payment method)
Nazahtev = su richiesta (on request)
Ponalogu = su imposizione (on imposition)
Ukorist = a favore di (in favor to)
Iznosinotroskovauvaluti = quantità di spese in valuta estera (amount of expenditure in foreign currency)
Posebnaoznaka = denominazione speciale (special name)
IznosuRSD = importo in RSD (amount in RSD, Serbian currency)

# Notes

1.	The partner can be identified by either name or their account number (se photo in images folder). Every bank transaction is separated with open tag <transakcija> and ends with closing tag </transakcija> . In between tags there are mostly information related to ‘bank business’ but to us important information are the date (‘datumknjizenja’), amount (‘duguje’ (credit) / ‘potrazuje’ (debit)), and the bank account and name of the partner. The bank account number of the supplier – which should be unique for each supplier and the most logical information for mapping is under <Zab16_3> and the name of the supplier is under <Zab16_4>. The tricky part is that the bank account is not the only one in <Zab16_3>, the reference of the payment is also in the same row. The bank account is in the number format xxx-xxxxxxxxxxxxx-xx (3 – 13 – 2) and after it follows the number of the invoice that’s been paid (it can be a mix of numbers and letters). In this case the bank account is 265-1110310004470-72 and the number of the paid invoice is 4215623. The middle part of the bank account can also be different – 13 numbers is the max.
