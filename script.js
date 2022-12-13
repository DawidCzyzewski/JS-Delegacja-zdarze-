//Jeśli kilka/dużo elementów robi w naszym JS podobną rzecz, możemy delegować wykonywanie takich rzeczy, zwłaszcza kodu asynchronicznego w górę, gdzieś wyżej. Pod warunkiem, że wszystko co jest niżej będzie odbierało informację, która przychodzi z góry. Przesyłanie informacji między sobą nazywamy propagacją.

// PROPAGACJA

// Propagacja - przekazywanie eventu (np. click) od elementu najbardziej pojemnego (w JS jest to window) do każdego dziecka tego window i odwrotnie, jak klikniemy w dziecko, to ono przekazuje w górę daną informację (event)

// const wrapper = document.querySelector(".wrapper");
// const box = document.querySelector(".box");

// wrapper.addEventListener("click", function (e) {
//   console.log("Wrapper clicked");
// });

// box.addEventListener("click", function (e) {
//   console.log("Box clicked");
// });

// Tu możemy zauważyć zasadę zachowania JS zwaną bąbelkowaniem, tj.
// po kliknięciu we wrapper w konsoli wyświetla nam się wrapper clicked. Ale po kliknięciu w box, który jest w środku wrappera, wyświetli nam się:
// Box clicked
// Wrapper clicked
// Czyli zadziałaliśmy na oba elementy

// window.addEventListener("click", function (e) {
//   console.log("Window clicked");
// });

// Na tym polega bąbelkowanie. Jeśli klikniemy w coś "małego", to klikniemy również we wszystkich jego rodziców, czyli elementy większe. Nazywa się to bubblingface?
// ZAWSZE JAK WYKONAMY JAKIŚ EVENT, TO DOMYŚLNIE WYKONUJE SIĘ BUBBLING, CHYBA ŻE JEST ZMIENIONY NA CAPTURE.
// CAPTURE MUSI BYĆ WYWOŁANY ZA RĘCZNIE. TARGET JEST ZAWSZE, ALE NIE JEST TO FAZA JAK POWYŻSZE TYLKO WARTOŚĆ PRZETRZYMYWANA. MOŻEMY NP. USTAWIĆ TARGET NA DUŻY EVENT, ŻEBY GO PRZETRZYMYWAŁ.

// Mamy też odwrotną drogę, tj. od największego do najmniejszego
// Nazywa się to capture (przechwytywanie)

// CAPTURE - przechwytywanie

// Zróbmy sobie teraz metodę, której użyjemy do przykładów powyżej

// const handleClick = (e) => {
//   console.log(`${e.target.textContent} clicked`);
// };

// Musieliśmy powyżej wpisać do targetu jeszcze textContent, ponieważ wyświetlał tylko html element a nie zawartość. Teraz okno nam nie wyświetli textContentu, bo go nie posiada, ale pozostałe wyświetlą, więc usuniemy window

// wrapper.addEventListener("click", handleClick);

// box.addEventListener("click", handleClick);

// I teraz po kliknięciu wydarzyło nam się dokładnie coś odwrotnego, tj. jak klikniemy inside, to zostaje kliknięty tylko on, natomiast klikając outside, klikniemy w oba. Jest to właśnie capture - przechwytywanie. Captureface

// Dzieje się tak dlatego, że

// Możemy tym sterować, ponieważ eventListener przyjmuje trzeci parametr, o którym wcześniej nie mówiliśmy, a jest on bardzo przydatny, ponieważ ten parametr to useCapture i określamy go jako true lub false. Jest to pytanie czy chcemy używać tej propagacji od ogółu do szczegółu. Domyślna wartość to false. W tym przypadku jak klikniemy na dziecko (box) to najpierw wywoła się dziecko później rodzic (i jego rodzice) (wrapper).
// Natomiast jeśli ustawimy wartość na true, to najpierw wyświetli się rodzic (i jego rodzice) (wrapper) a później dziecko (box).
// To nazywa się propagacją odwróconą czyli capture - przechwytywanie
// W praktyce wykorzystuje się to wtedy, gdy zajdzie potrzeba wykonania tego np.
// mamy klawiaturę programisty i mamy na niej dwa tryby przycisków. Możemy albo kliknąć w przycisk i wywołać jego wartość albo druga funkcja, że chcemy wywołać przypisaną do niego rzecz (funkcję?). I w takim przypadku możemy chcieć być NAJPIERW np. zapytani przez program czy na pewno chcemy wywołać funkcję.
// Można to też wykorzystać np w dużym UI i chcemy, żeby kliknięcie w jednym miejscu mogło być wywołane jak kliknięcie w kilku, np. chcemy, żeby kliknięcie jakiegoś pola w formularzu automatycznie też uzupełniało inne pola. W praktyce pewnie dalibyśmy nasłuch i ręcznie wypełnili formularz ale można to tu zastosować.

// const handleClick1 = (e) => {
//   console.log("box clicked");
// };
// const handleClick2 = (e) => {
//   console.log("wrapper clicked");
// };

// wrapper.addEventListener("click", handleClick2, true);

// box.addEventListener("click", handleClick1, true);

// Teraz działa. textContent z targetu wrappera zewnętrznego to jest zarówno outside jak i inside. Stworzę nową funkcję handleClick2 bez textContent.

// Jak widzimy po kliknięciu w inside, jest on kliknięty jakby dwa razy. Jest to prawda, ponieważ został wywołany dwa razy:
// Przechwycony na boxie oraz na wrapperze, w którym znajduje się box

// Przejdźmy teraz do delegacji.
// const handleClick3 = (e) => {
//   e.stopPropagation();
//   console.log(e.target);
// };

// wrapper.addEventListener("click", handleClick3);

// box.addEventListener("click", handleClick3);

// powiedzmy, że na początek chcemy zatrzymać nasze bąbelkowanie, tj. nie chcemy żeby event wychodził na zewnątrz.
// Jeśli nie chcemy, żeby evety propagowały się nigdzie dalej, w którąkolwiek stronę. możemy użyć metody stopPropagation() powyżej
// Działa to trochę jak preventDefault z tym, że preventDefault wstrzymuje nam domyślne zachowanie przeglądarki, natomiast stopPropagation wstrzymuje nam propagację zdarzeń. W związku z tym, jeśli teraz klikniemy w inside, nie pokaże się on jak wcześniej dwa razy, a jedynie jeden raz

// TERAZ SOBIE ZROBIMY TAK..., że będziemy zapełniać elementami, więc komentujemy część html
const wrapper = document.querySelector(".wrapper");

// funkcja, która wyświetli numer elementu, który został wybrany eventListenerem załączonym do każdego elementu w pętli for
// const handleClick = (e) => {
//   console.log(e.target.textContent);
// };

// for (let i = 0; i < 50; i++) {
//   const box = document.createElement("div");
//   box.addEventListener("click", handleClick);
//   const innerBox = document.createElement("span");
//   innerBox.textContent = i; //Będzie miał cyfrę równą indexowi
//   innerBox.classList.add("box"); //dodajemy klasę
//   box.appendChild(innerBox); //box bierze innerBox jako child
//   wrapper.appendChild(box);
// }
// Jak będziemy klikać to każdy z tych boxów ma zapięty eventListener, w momencie tworzenia tworzymy nowy eventListener dla każdego z nich. Teraz mamy zapięte 50 eventListerów. W tym przypadku to działa, ale w zależności od obciążenia wydarzeń może to zamulić stronę. Wejdźmy sobie w (w firefox) debuger, następnie punkty wstrzymania obserwatora zdarzeń,(w chrome źródła => punkty przerwanie detektora zdarzeń) i zaznaczmy np. mysz w tym przypadku, to jak ją zaznaczymy to wstrzymamy wykonywanie tego listenera to jak klikamy w strzałkę na górze, to możemy zaobserwować ile rzeczy po kolei się wykonuje. Takie wydarzenie może długo trwać. Nie jest dobre by nasłuchiwać kilkadziesiąt elementów, które np. w tym przypadku nie są oddalone i mają taki sam efekt wykonania, takie same wykonanie a już w ogóle, jeśli siedzą w tym samym miejscu. Możemy np. nasłuchiwać rodzica. Nie jest dobre, żeby nasłuchiwać window, bo window nasłuchuje wszystko. Umieszczamy więc element nasłuchiwania możliwie najniżej, w pierwszym możliwym rodzicu. Nasze kwadraciki mają wspólnego rodzica wrapper i możemy na niego zapiąć sobie nasłuch

// const handleClick = (e) => {
//   if (
//     e.target.classList.contains("outerBox") ||
//     e.target.classList.contains("box") //I teraz już nasłuchujemy tylko elementów, które zawierają klase outerBox lub box, bo nigdy nie wiemy co będzie naszym targetem, czy trafimy konretnie w cyferki (span) czy obok nich (div)
//   ) {
//     console.log(e.target.textContent);
//   }
// };

// wrapper.addEventListener("click", handleClick);

// for (let i = 0; i < 50; i++) {
//   const box = document.createElement("div");
//   box.classList.add("outerBox"); //tutaj dajemy klasę, której nie posiada wrapper, żeby odwołać się w funkcji handleClick do konkretnych elementów
//   // box.addEventListener("click", handleClick);
//   const innerBox = document.createElement("span");
//   innerBox.textContent = i; //Będzie miał cyfrę równą indexowi
//   innerBox.classList.add("box"); //dodajemy klasę
//   box.appendChild(innerBox); //box bierze innerBox jako child
//   wrapper.appendChild(box);
// }
// Teraz nasłuchujemy na jednym elemencie, ale on zawiera w sobie wszystkie inne, bo następuje propagacja tj. dziecko przekazuje funkcję do rodzica, rodzic tak naprawdę nasłucjuje, ale jak klikamy w dziecko to rodzic odbiera click. Nawet jak pomiędzy nimi klikniemy to wyświetla się textContent wszystkich elementów, bo są one w rodzicu. Żeby to ograniczyć, damy w handleClick klasę dla elementów box, której nie ma wrapper i do niej powiążemy wykonanie elementu.

// Ten układ jest jednak prosty, jednak gdybyw w każdym elemencie były po cztery pudełka, formularze i przyciski, to już zwiększa to problematyczność. Chemy wtedy nasłuchiwać oczywiście każdego z elementów, przycisków i mają one wykonywać inne zadania. Wtedy np.dodajemy konkretny dataset w html. W tym przypadku dodamy do html data-id="". Dataset to taki uniwersalny znacznik, który możemy dodać zawsze i wszędzie i te elementy będą posiadać taką indywidualną wartość i możemy go użyć później tak jak classList.contains.
// classList.contains porównuje ze stringiem i w związku z tym jest prostsze i częściej używane
// matches -prawie to samo co classList.contains ale ono porównuje z wyrażeniami regularnymi

// Powiększmy sobie tę funkcję, żeby pokazać co jeśli jest bardziej zawile

// const handleClick = (e) => {
//   if (
//     e.target.classList.contains("outerBox") ||
//     e.target.classList.contains("box") || //I teraz już nasłuchujemy tylko elementów, które zawierają klase outerBox lub box, bo nigdy nie wiemy co będzie naszym targetem, czy trafimy konretnie w cyferki (span) czy obok nich (div)
//     e.target.classList.contains("innerBoxBtn") //Teraz dodajemy sobie kolejną klasę
//   ) {
//     console.log(e.target.textContent);
//   }
// };

// wrapper.addEventListener("click", handleClick);

// for (let i = 0; i < 50; i++) {
//   const box = document.createElement("div");
//   box.classList.add("outerBox"); //tutaj dajemy klasę, której nie posiada wrapper, żeby odwołać się w funkcji handleClick do konkretnych elementów
//   // box.addEventListener("click", handleClick);
//   const innerBox = document.createElement("div");
//   const innerBoxBtn = document.createElement("button");
//   innerBox.textContent = i; //Będzie miał cyfrę równą indexowi, ale trzeba przenieść do góry, bo zasłania clicka (button)
//   innerBoxBtn.textContent = "Click";
//   innerBoxBtn.classList.add("innerBoxBtn");
//   innerBox.appendChild(innerBoxBtn);
//   innerBox.classList.add("box"); //dodajemy klasę
//   box.appendChild(innerBox); //box bierze innerBox jako child
//   wrapper.appendChild(box);
// }
// Teraz jak klikniemy czerwone pole, to wyświetli sięnumer i click. Jak klikniemy w cyfrę to tak samo (bo oba zawierają button w sobie). Ale jak kliknę button to on już kliknie tylko siebie ale numeru nie.

// JEŚLI NATOMIAST CHCIELIBYŚMY CELOWAĆ W KONKRETNE ELEMENTY, MUSIMY SOBIE ZROBIĆ TROCHĘ INACZEJ DIVY
// Możemy się pobawić w switchStatement co jest pozostałością po C++. Na początku rozpiszemy to ifami a później rozpiszemy w switchStatement
// const handleClick = (e) => {
//   if (
//     //chcę logować tylko i wyłącznie span (np. nr "7") albo tylko i wyłącznie clicka
//     // dajemy jeśli nasz element ma klasę box i pytamy tu o target
//     e.target.classList.contains("box")
//   ) {
//     console.log("Box clicked");
//   }
//   //robimy kolejnego diva
//   if (e.target.classList.contains("innerBoxBtn")) {
//     console.log("innerBoxBtn clicked");
//   }
//   //domyślnie jednak, jeśli klikniemy w cokolwiek innego, nie rób nic:
//   return;
// };

//te same warunki if możemy rozpisać na switch, tutaj on przyjmuje zmienną (value w tym przy[adku]), po której będzie decydował jaki warunek realizwać, a w przyadku case podajemy możliwe wartości

// switch (value) //value tu podajemy zmienną a poniżej case to możliwe wartości
//  {
//   case =
// }

const handleClick = (e) => {
  // e.stopPropagation();
  if (e.target.classList.contains("box")) {
    console.log("Box clicked");
  }
  if (e.target.classList.contains("innerBoxBtn")) {
    console.log("Inner box btn clicked");
  }

  // switch (e.target.classList) {
  //   case e.target.classList.contains("box"):
  //     console.log("Box clicked");
  //     break; //nie zapominamy o OBOWIĄZKOWYM BREAK
  //   case e.target.classList.contains("innerBoxBtn"):
  //     console.log("innerBoxBtn clicked");
  //     break;
  // }
  // return;
};

wrapper.addEventListener("click", handleClick);

for (let i = 0; i < 50; i++) {
  const box = document.createElement("div");
  box.classList.add("outerBox"); //tutaj dajemy klasę, której nie posiada wrapper, żeby odwołać się w funkcji handleClick do konkretnych elementów
  // box.addEventListener("click", handleClick);
  const innerBox = document.createElement("div");
  const innerBoxBtn = document.createElement("button");
  innerBox.textContent = i; //Będzie miał cyfrę równą indexowi, ale trzeba przenieść do góry, bo zasłania clicka (button)
  innerBoxBtn.textContent = "Click";
  innerBoxBtn.classList.add("innerBoxBtn");
  innerBox.appendChild(innerBoxBtn);
  innerBox.classList.add("box"); //dodajemy klasę
  box.appendChild(innerBox); //box bierze innerBox jako child
  wrapper.appendChild(box);
}
