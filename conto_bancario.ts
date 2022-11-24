interface account {
  nome: string;
  cognome: string;
  codiceSegreto: string;
}

class contoBancario {
  nome: string;
  cognome: string;
  codiceSegreto: string;
  saldo: number;
  iban: string;
  transazioniEffettuate: number[];

  constructor(
    nome: string,
    cognome: string,
    codiceSegreto: string,
    saldo: number,
    iban: string,
    transazioniEffettuate: number[]
  ) {
    this.nome = nome;
    this.cognome = cognome;
    this.codiceSegreto = codiceSegreto;
    this.saldo = saldo;
    this.iban = iban;
    this.transazioniEffettuate = transazioniEffettuate;
  }

  tostring(): string {
    return `Ciao ${this.nome} ${this.cognome} ecco il tuo Saldo:${this.saldo}€ IBAN:${this.iban} movimenti:${this.transazioniEffettuate.join("€ ")}€`;
  }
}

class card extends contoBancario {
  numeroCard: number;
  cvv: number;

  constructor(
    nome: string,
    cognome: string,
    codiceSegreto: string,
    saldo: number,
    iban: string,
    transazioniEffettuate: number[],
    numeroCard: number,
    cvv: number
  ) {
    super(nome, cognome, codiceSegreto, saldo, iban, transazioniEffettuate);
    this.numeroCard = numeroCard;
    this.cvv = cvv;
  }
}

class stipendio {
  nome: string;
  cognome: string;
  saldo: number;

  constructor(nome: string, cognome: string, saldo: number) {
    this.nome = nome;
    this.cognome = cognome;
    this.saldo = saldo;
  }

  tostringStipendio(): string {
    return `Il tuo datore di lavoro ${this.nome} ${this.cognome}, ti ha inviato il tuo stipendio ${this.saldo}€`;
  }
}

const datoreLavoro = new stipendio("Marco", "Verdi", 1300);

const pippo = new contoBancario(
  "Pippo",
  "Rossi",
  "tizio10",
  1000,
  "IT18C0300203280617183785368",
  [200, 300, 400, 500]
);

const pippoCard = new card(
  "Pippo",
  "Rossi",
  "tizio10",
  1000,
  "IT18C0300203280617183785368",
  [200, 300, 400, 500],
  8540964656002819,
  346
);

const tiziano = new contoBancario(
  "Tiziano",
  "Ferro",
  "tizio20",
  15000,
  "IT91C0300203280595354844399",
  [150, 30, 400, 100]
);

const tizianoCard = new card(
  "Tiziano",
  "Ferro",
  "tizio20",
  15000,
  "IT91C0300203280595354844399",
  [150, 30, 400, 100],
  4268813087592585,
  556
);

const giovanni = new contoBancario(
  "Giovanni",
  "Dipaola",
  "tizio30",
  3000,
  "IT30B0300203280457713285293",
  [50, 330, 440, 10]
);

const giovanniCard = new card(
  "Giovanni",
  "Dipaola",
  "tizio30",
  3000,
  "IT30B0300203280457713285293",
  [50, 330, 440, 10],
  4440961653002314,
  716
);

const conti: account[] = [
  pippo,
  pippoCard,
  tiziano,
  tizianoCard,
  giovanni,
  giovanniCard,
];

function accesso(conti: account[], codice: string) {
  for (let item of conti) {
    const contoBancario = <contoBancario>item;
    const cardConto = <card>item;

    if (codice == contoBancario.codiceSegreto) {
      prelevare(contoBancario, "tizio10", 0);
      bonifico(contoBancario, "tizio10", 0, "IT18C0300203280617183785368");
      acquisto(cardConto, "tizio10", 150, 346, 8540964656002819);

      entrataStipendio(contoBancario, datoreLavoro);

      console.log(`${contoBancario.tostring()}`);
    }
  }

  //si attiva quando il codice non e coretto
  for (const itemError of conti) {
    const contoBancario = <contoBancario>itemError;

    if (codice !== contoBancario.codiceSegreto) {
      console.error(`Il conto non è presente`);
    }
    return;
  }
}
accesso(conti, "tizio10");

function entrataStipendio(contoBancario: any, datoreLavoro: any) {
  if (datoreLavoro.saldo > 0) {
    // Questa funzione mette l’ultimo elemento al primo posto del array transazioniEffettuate
    ultimiMovimenti(contoBancario.transazioniEffettuate, datoreLavoro.saldo);

    contoBancario.saldo += datoreLavoro.saldo;

    console.log(`${datoreLavoro.tostringStipendio()}`);
  }
}

function prelevare(contoBancario: any, codice: string, prelievo: number) {
  if (prelievo > 0) {
    if (
      prelievo <= contoBancario.saldo &&
      contoBancario.codiceSegreto == codice
    ) {
      // Questa funzione mette l’ultimo elemento al primo posto del array transazioniEffettuate
      ultimiMovimenti(contoBancario.transazioniEffettuate, prelievo);

      contoBancario.saldo -= prelievo;
    } else if (contoBancario.codiceSegreto !== codice) {
      console.error(`il codice e errato`);
    } else if (prelievo > contoBancario.saldo) {
      console.error(
        `saldo insufficiente hai solamente ${contoBancario.saldo}€`
      );
    }
  }
}

function bonifico(
  contoBancario: any,
  codice: string,
  bonifico: number,
  iban: string
) {
  if (bonifico > 0) {
    if (
      bonifico <= contoBancario.saldo &&
      contoBancario.codiceSegreto == codice &&
      contoBancario.iban == iban
    ) {
      // Questa funzione mette l’ultimo elemento al primo posto del array transazioniEffettuate
      ultimiMovimenti(contoBancario.transazioniEffettuate, bonifico);

      contoBancario.saldo -= bonifico;
    } else if (contoBancario.codiceSegreto !== codice) {
      console.error(`il codice e errato`);
    } else if (contoBancario.iban !== iban || iban.length !== 27) {
      console.error(`l'iban che hai inserito e sbagliato`);
    } else if (bonifico > contoBancario.saldo) {
      console.error(
        `saldo insufficiente hai solamente ${contoBancario.saldo}€`
      );
    }
  }
}

function acquisto(
  cardConto: any,
  codice: string,
  acquisto: number,
  cvv: any,
  numeroCard: any
) {
  if (acquisto > 0) {
    if (
      acquisto <= cardConto.saldo &&
      cardConto.codiceSegreto == codice &&
      cardConto.numeroCard == numeroCard &&
      cardConto.cvv == cvv
    ) {
      // Questa funzione mette l’ultimo elemento al primo posto del array transazioniEffettuate
      ultimiMovimenti(cardConto.transazioniEffettuate, acquisto);

      cardConto.saldo -= acquisto;
    } else if (cardConto.codiceSegreto !== codice) {
      console.error(`il codice e errato`);
    } else if (cardConto.numeroCard !== numeroCard || cvv.length !== 3) {
      console.log(`i dati della carta non sono stati inseriti correttamente`);
    } else if (acquisto > cardConto.saldo) {
      console.error(`saldo insufficiente hai solamente ${cardConto.saldo}€`);
    }
  }
}

function ultimiMovimenti(transazioniEffettuate: any, movimento: number) {
  transazioniEffettuate.push(movimento);
  return transazioniEffettuate.unshift(transazioniEffettuate.pop());
}
