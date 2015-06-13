//pytania zaczerpniete ze strony internetowej http://prawkobazapytan.pl/index.php
/*
var questionSchema = new Schema({
    nrPytania : Double,
    punkty : Double,
    kategoria : String,
    pytanie : String,
    odpowiedzi : Array,
    poprawnaOdp : String,
    opis : String,
});
*/

var tab = [];

tab.push({ 
    nrPytania: 1, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"W jaki sposób pomagamy osobie, na której podpaliły się ubrania?", 
    odpowiedzi: ["Używamy gaśnicy", "Wzywamy straż pożarną", "robimy zdjęcie", "Wołamy pomocy"],
    poprawnaOdp: "Kładziemy ją na ziemię i przykrywamy materiałem (kocem, kurtką, itd.)", 
    opis: "W takiej sytuacji najważniejsza jest skuteczność działania. Szybkie ugaszenie może uratować życie."});
    
tab.push({ 
    nrPytania: 2, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"Na jakie znaki powinieneś patrzeć podczas jazdy we mgle? ", 
    odpowiedzi: ["pionowe", "żadne z powyższych", "poprzeczne", "przestankowe"],
    poprawnaOdp: "poziome", 
    opis: "W czasie gęstej mgły najlepiej widocznymi znakami drogowymi są znaki poziome i to one uchronią nas przez kolizją."});

tab.push({ 
    nrPytania: 3, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"W przypadku awarii ABS-u, w jaki sposób zahamujesz?", 
    odpowiedzi: ["hamulec do oporu", "użyję hamulca ręcznego"],
    poprawnaOdp: "pulsacyjnie", 
    opis: "Na asfalcie samochód hamuje najlepiej tuż przed zerwaniem przyczepności, a zablokowane koła dodatkowo uniemożliwiają skręcanie"});

tab.push({ 
    nrPytania: 4, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"W jaki sposób musi powinna być zamocowana gaśnica w samochodzie?", 
    odpowiedzi: ["W bagażniku na specjalnym uchwycie", "W komorze silnika", "Na suficie", "Na tylnym siedzeniu"],
    poprawnaOdp: "Pod siedzeniem", 
    opis: "Gasnica samochodowa powinna być w miejscu łatwo dostępnym. Ponadto powinna być utrzymana w należytym stanie aby działać sprawnie i skutecznie." });

tab.push({ 
    nrPytania: 5, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"Jedziesz 80km/h i zbliżasz się do zakrętu w lewo z podwójną ciągłą, jak się ustawisz do pokonania zakrętu ?", 
    odpowiedzi: ["Lewą stroną jezdni","Zbliżają się do prawej krawędzi jezdni po prawej stronie jezdni", "Bokiem na wspak", "Zbliżając się do lewej strony pasa po lewej stronie"],
    poprawnaOdp: "Zbliżając się do lewej strony pasa po prawej stronie jezdni", 
    opis: "Jeśli przygotowując się do takiego zakrętu zbliżysz się do krawędzi prawego pasa, otrzymasz większą przestrzeń do wykonania manewru." });

tab.push({ 
    nrPytania: 6, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"Wyprzedasz kolumnę pieszych, jaką odległość należy mieć od tej kolumny pieszych:", 
    odpowiedzi: ["bezpieczną, ale nie mniejszą niż 0,8 m", "bezpieczną, ale nie mniejszą niż 0,6 m", "2m", "na wyciagnięcie ręki"],
    poprawnaOdp: "bezpieczną, ale nie mniejszą niż 1m", 
    opis: "Pamiętaj aby zostawić bespieczną odległość! Na drodze może wydażyc się wiele nieoczekiwanych sytuacji." });

tab.push({ 
    nrPytania: 7, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"Jaki będzie skutek niezatrzymania samochodu po zapaleniu czerwonej lampki od oleju silnikowego?", 
    odpowiedzi: ["Uszkodzenie pompy paliwa", "Uszkodzenie zawieszenia", "Uszkodzenie lampki", "Mandat za przekroczenie prędkości"],
    poprawnaOdp: "Zatarcie się silnika", 
    opis: "Zbyt niski poziom oleju silnikowego doprowadzi do uszkodzenia silnika. Sprawdzając jego ilość zwróc uwagę także na kolor i zapach." });

tab.push({ 
    nrPytania: 8, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"Ile może wystawać z tyłu samochodu przewożony ładunek?", 
    odpowiedzi: ["0,5m", "1,5m"],
    poprawnaOdp: "2m", 
    opis: "Pamiętaj o właściwym oznakowaniu. Jeśli ładunek wystaje dalej niż 0,5m poza obrys pojazdu, powinien być oznakowany chorągiewkami o odpowiednich kolorach."});

tab.push({ 
    nrPytania: 9, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"Która z wymienionym kategorii uprawnia cię do kierowania czterokołowcem innym niż lekki:", 
    odpowiedzi: ["AM", "A", "T", "A+"],
    poprawnaOdp: "B1", 
    opis: "Kategoria B1 poszerza uprawnienia kategorii AM o kierowanie pojazdem czterokołowym nie cięzszym niż 550kg w przypadku przewozu rzeczy i nie cięższym niż 400kg gdy przewozimy ludzi." });

tab.push({ 
    nrPytania: 10, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"Jaką odległość należy zachować wyprzedzając motocyklistę?", 
    odpowiedzi: ["bezpieczną","bezpieczną mniejszą niż 1m", "1m", "większą niż 2m" ],
    poprawnaOdp: "bezpieczną większą niż 1m", 
    opis: "Wyprzedzając motocyklistę zachowaj odstęp większy niż 1m." });

tab.push({ 
    nrPytania: 11, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"Przy jakiej temperaturze, należy zmienić opony letnie na zimowe?", 
    odpowiedzi: ["2 stopnie Celsjusza","10 stopni Celsjusza", "Jak zaczynają pękać", "Gdy pojawia się szron"],
    poprawnaOdp: "7 stopni Celsjusza", 
    opis: "Właściwe ogumienie zwiększa bezpieczeństwo i komfort jazdy. Ponadto redykuje hałasy i przyczynia się do redukcji zużycia paliwa." });

tab.push({ 
    nrPytania: 12, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"Czym będzie skutkowało zbytnie przybliżenie fotela do kierownicy?", 
    odpowiedzi: ["kierowca będzie miał lepszą widoczność","nie ma różnicy jak jest ustawiony fotel", "Kierowca będize musiał się co chwilę odwracać", "Fotel może ulec awarii"],
    poprawnaOdp: "będzie utrudniony dostęp do przyrządów sterujących", 
    opis: "Prawidłowa postawa podczas jazdy zwiększa bezpieczeństwo kierowcy i pasażerów. Warto dbać o odpowiednie ustawienie wzdłużne, ustawienie oparcia, zagłówka oraz wysokości pasa bezpieczeństwa." });

tab.push({ 
    nrPytania: 13, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"Przyczyną nieosiągnięcia przez silnik o zapłonie samoczynnym obrotów rozruchowych może być:", 
    odpowiedzi: ["nowy akumulator", "zbyt luźny pasek klinowy napędowy alternatora", "brak silnika", "niski poziom oleju"],
    poprawnaOdp: "niesprawny rozrusznik", 
    opis: "W silnikach o zapłonie samoczynnym, to rozrusznik nadaje odpowiednią prędkość obrotową, aby silnik mógł rozpocząć pracę."});

tab.push({ 
    nrPytania: 14, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"Czy dziecko w wieku przedszkolnym można przewozić na kolanach dorosłego ?", 
    odpowiedzi: ["Tak, ale tylko gdy dorosły z dzieckiem siedzi z tyłu", "Tak, pod warunkiem że dorosły i dziecko są zapięci w pasy.","Tak, jeśli dziecko siedzi dostatecznie wysoko", "Tak, jeśli dziecko wyrazi zgodę"],
    poprawnaOdp: "Nie", 
    opis: "Dzieci powinny podróżować w specjalnych fotelikach posiadających certyfikaty jakości." });

tab.push({ 
    nrPytania: 15, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"U której osoby nie zastosowałbyś defibrylatora?", 
    odpowiedzi: ["kobieta w ciąży","osoby niepełnosprawnej","osoby powyżej 70 roku życia", "Mężczyzny w okularach"],
    poprawnaOdp: "dziecko poniżej 1 roku życia", 
    opis: "Nalezy podjąć wszelkie kroki dla uratowania życia i zdrowia, jednak defiblyrator w niewykfalifikowanych rękach może zaszkodzić drobnemu dziecku." });

tab.push({ 
    nrPytania: 16, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"Jedziemy 10km/h, chcemy zahamować, co robimy?", 
    odpowiedzi: ["wciskamy hamulec do oporu", "delikatnie naciskamy pedał hamulca", "wystawiamy głowę przez okno", "otwieramy spadochron"],
    poprawnaOdp: "wciskamy jednocześnie sprzęgło i hamulec", 
    opis: "Ekonomiczność jazdy i dbałość o zdrowie silnika nakazuje jednoczesne wciśnięcie sprzęgła i hamulca." });

tab.push({ 
    nrPytania: 17, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"Co może sygnalizować odskok pedała hamulca do dołu?", 
    odpowiedzi: ["Działanie systemu ABS", "Nieprawidłowe działanie układu hamulcowego", "Wyboje", "Żaba pod pedałem"],
    poprawnaOdp: "Działanie wspomagania układu hamulcowego", 
    opis: "Hamulec hydrauliczny jest najczęściej wspomagany układem zasilanym podciśnieniem z układu dolotowego silnika (w silnikach benzynowych) bądź z pompy podciśnienia (w silnikach diesla)." });

tab.push({ 
    nrPytania: 18, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"Jaki odstęp należy zachować stojąc w zatorze drogowym w tunelu:", 
    odpowiedzi: ["3m", "7m", "Jak najmniejszy", "Jak największy"],
    poprawnaOdp: "5m", 
    opis: "5m to ustawowo optymalna odległość w takim przypadku." });

tab.push({ 
    nrPytania: 19, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"Jaka może być przyczyna stoczenia się pojazdu z 'górki'", 
    odpowiedzi: ["zbyt późno odpuszczony hamulec ręczny", "zbyt 'mocno' puszczone sprzegło", "Zbyt stroma górka", "Złe ogumienie"],
    poprawnaOdp: "zbyt wcześnie odpuszczony ręczny", 
    opis: "Hamulec postojowy, popularnie zwany hamulcem ręcznym, chroni nas przed zjazdem z górki." });

tab.push({ 
    nrPytania: 20, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"Kiedy zaleca się sprawdzić poziom płynu chłodniczego?", 
    odpowiedzi: ["na wysokich obrotach silnika", "przy zimnym silniku", "W temperaturze poniżej 0 stopni Celsjusza", "trzy razy w miesiącu"],
    poprawnaOdp: "przy zimnym silniku", 
    opis: "Pamiętaj aby nigdy nie otwierać zbiornika przy ciepłym silniku. Płyn znajdujący się pod ciśnieniem może poparzyć Twoje ręce lub twarz." });

tab.push({ 
    nrPytania: 21, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"Którym pasem powinien poruszać się pojazd jadący wolno?", 
    odpowiedzi: ["lewym", "którym chce", "środkowym", "wskazującym"],
    poprawnaOdp: "prawym", 
    opis: "Lewy pas jest przeznaczony do szybszego ruchu. Jeśli jedziesz wolniej, wybierz prawy pas" });

tab.push({ 
    nrPytania: 22, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"Na co należy najbardziej zwrócić uwagę podczas wyprzedzania?", 
    odpowiedzi: ["coś z ustawieniem fotela", "samochody jadące z tyłu", "czy masz zamknięty bagażnik", "znaki pionowe"],
    poprawnaOdp: "zachowanie bezpiecznego odstępu", 
    opis: "Zachowanie bezpiecznego odstępu jest priorytetem podczas wyprzedzania." });

tab.push({ 
    nrPytania: 23, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"Odległość od pojazdu jadącego przed nami uzależniona jest od?", 
    odpowiedzi: ["Długości pojazdu", "Szerokości pojazdu", "Nastroju kierowcy", "ilości samochodów w ruchu"],
    poprawnaOdp: "Prędkości", 
    opis: "Pamiętaj aby dostosować prędkość do panujących warunków na drodze. Sam decydujesz, jaką drogę hamowania zapewnisz sobie z razie awarii." });

tab.push({ 
    nrPytania: 24, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"Co powinien mieć ze sobą kierowca?", 
    odpowiedzi: ["AC", "Kartę pojazdu", "Kartę szczepień psa", "Kartę przeglądu gaśnicy"],
    poprawnaOdp: "OC", 
    opis: "Karta ubezpieczenia odpowiedzialności cywilnej jest bardzo ważnym dokumentem. W razie wypadku zapewnia pokrycie szkód wyżądzonych osobom trzecim." });

/*
tab.push({ 
    nrPytania: 25, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"W którym momencie wciśniesz pedał sprzęgła chcąc wykonać typowe (zamierzone) hamowanie z dużej prędkości?", 
    odpowiedzi: ["zanim wciśniesz pedał hamulca", "razem z pedałem hamulca", "Bez znaczenia", "Przy prędkości większej niż 50 km/h"],
    poprawnaOdp: "dopiero wtedy gdy zwolnisz do prędkości minimalnej odpowiedniej dla tej sytuacji", 
    opis: "" });

tab.push({ 
    nrPytania: 26, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"Dlaczego powinno się układać poszkodowanego w pozycji bocznej bezpiecznej ?", 
    odpowiedzi: ["żeby mu było wygodnie czekać na karetke", "żeby nie uszkodzić odcinka szyjnego"],
    poprawnaOdp: "żeby drogi oddechowe byłu udrożnione i nie doszło do zaksztuszenia", 
    opis: "" });

tab.push({ 
    nrPytania: 27, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"W jakiej sytuacji zastosujesz opatrunek uciskowy?", 
    odpowiedzi: ["Złamanie przedramienia", "Małe krwawienie z ucha"],
    poprawnaOdp: "Krwotok", 
    opis: "" });

tab.push({ 
    nrPytania: 28, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"Co ma bezpośredni wpływ na długość hamowania?", 
    odpowiedzi: ["czas reakcji kierowcy", "nawierzchnia"],
    poprawnaOdp: "prędkość", 
    opis: "" });

tab.push({ 
    nrPytania: 29, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"Gdzie powinniśmy rozpocząć hamowanie?", 
    odpowiedzi: ["przed pasem wyłączenia", "obojętnie gdzie" ],
    poprawnaOdp: "na pasie wyłączenia", 
    opis: "" });

tab.push({ 
    nrPytania: 30, 
    punkty: 1, 
    kategoria: 1, 
    pytanie:"Czy możemy zmienić lampy halogenowe w światłach na ksenonowe?", 
    odpowiedzi: ["tylko w ekstremalnych sytuacjach", "tak" ],
    poprawnaOdp: "nie", 
    opis: "" });
    */