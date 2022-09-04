var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var contoBancario = /** @class */ (function () {
    function contoBancario(nome, cognome, codiceSegreto, saldo, iban, transazioniEffettuate) {
        this.nome = nome;
        this.cognome = cognome;
        this.codiceSegreto = codiceSegreto;
        this.saldo = saldo;
        this.iban = iban;
        this.transazioniEffettuate = transazioniEffettuate;
    }
    contoBancario.prototype.tostring = function () {
        return "Ciao ".concat(this.nome, " ").concat(this.cognome, " ecco il tuo Saldo:").concat(this.saldo, "\u20AC IBAN:").concat(this.iban, " movimenti:").concat(this.transazioniEffettuate.join("€ "), "\u20AC");
    };
    return contoBancario;
}());
var card = /** @class */ (function (_super) {
    __extends(card, _super);
    function card(nome, cognome, codiceSegreto, saldo, iban, transazioniEffettuate, numeroCard, cvv) {
        var _this = _super.call(this, nome, cognome, codiceSegreto, saldo, iban, transazioniEffettuate) || this;
        _this.numeroCard = numeroCard;
        _this.cvv = cvv;
        return _this;
    }
    return card;
}(contoBancario));
var stipendio = /** @class */ (function () {
    function stipendio(nome, cognome, saldo) {
        this.nome = nome;
        this.cognome = cognome;
        this.saldo = saldo;
    }
    stipendio.prototype.tostringStipendio = function () {
        return "Il tuo datore di lavoro ".concat(this.nome, " ").concat(this.cognome, ", ti ha inviato il tuo stipendio ").concat(this.saldo, "\u20AC");
    };
    return stipendio;
}());
var datoreLavoro = new stipendio("Marco", "Verdi", 0);
var pippo = new contoBancario("Pippo", "Rossi", "tizio10", 1000, "IT18C0300203280617183785368", [200, 300, 400, 500]);
var pippoCard = new card("Pippo", "Rossi", "tizio10", 1000, "IT18C0300203280617183785368", [200, 300, 400, 500], 8540964656002819, 346);
var tiziano = new contoBancario("Tiziano", "Ferro", "tizio20", 15000, "IT91C0300203280595354844399", [150, 30, 400, 100]);
var tizianoCard = new card("Tiziano", "Ferro", "tizio20", 15000, "IT91C0300203280595354844399", [150, 30, 400, 100], 4268813087592585, 556);
var giovanni = new contoBancario("Giovanni", "Dipaola", "tizio30", 3000, "IT30B0300203280457713285293", [50, 330, 440, 10]);
var giovanniCard = new card("Giovanni", "Dipaola", "tizio30", 3000, "IT30B0300203280457713285293", [50, 330, 440, 10], 4440961653002314, 716);
var conti = [
    pippo,
    pippoCard,
    tiziano,
    tizianoCard,
    giovanni,
    giovanniCard,
];
function accesso(conti, codice) {
    for (var _i = 0, conti_1 = conti; _i < conti_1.length; _i++) {
        var item = conti_1[_i];
        var contoBancario_1 = item;
        var cardConto = item;
        if (codice == contoBancario_1.codiceSegreto) {
            prelevare(contoBancario_1, "tizio10", 0);
            bonifico(contoBancario_1, "tizio10", 0, "IT18C0300203280617183785368");
            acquisto(cardConto, "tizio10", 150, 346, 8540964656002819);
            entrataStipendio(contoBancario_1, datoreLavoro);
            console.log("".concat(contoBancario_1.tostring()));
        }
    }
    //si attiva quando il codice non e coretto
    for (var _a = 0, conti_2 = conti; _a < conti_2.length; _a++) {
        var itemError = conti_2[_a];
        var contoBancario_2 = itemError;
        if (codice !== contoBancario_2.codiceSegreto) {
            console.error("Il conto non \u00E8 presente");
        }
        return;
    }
}
accesso(conti, "tizio10");
function entrataStipendio(contoBancario, datoreLavoro) {
    if (datoreLavoro.saldo > 0) {
        // Questa funzione mette l’ultimo elemento al primo posto del array transazioniEffettuate
        ultimiMovimenti(contoBancario.transazioniEffettuate, datoreLavoro.saldo);
        contoBancario.saldo += datoreLavoro.saldo;
        console.log("".concat(datoreLavoro.tostringStipendio()));
    }
}
function prelevare(contoBancario, codice, prelievo) {
    if (prelievo > 0) {
        if (prelievo <= contoBancario.saldo &&
            contoBancario.codiceSegreto == codice) {
            // Questa funzione mette l’ultimo elemento al primo posto del array transazioniEffettuate
            ultimiMovimenti(contoBancario.transazioniEffettuate, prelievo);
            contoBancario.saldo -= prelievo;
        }
        else if (contoBancario.codiceSegreto !== codice) {
            console.error("il codice e errato");
        }
        else if (prelievo > contoBancario.saldo) {
            console.error("saldo insufficiente hai solamente ".concat(contoBancario.saldo, "\u20AC"));
        }
    }
}
function bonifico(contoBancario, codice, bonifico, iban) {
    if (bonifico > 0) {
        if (bonifico <= contoBancario.saldo &&
            contoBancario.codiceSegreto == codice &&
            contoBancario.iban == iban) {
            // Questa funzione mette l’ultimo elemento al primo posto del array transazioniEffettuate
            ultimiMovimenti(contoBancario.transazioniEffettuate, bonifico);
            contoBancario.saldo -= bonifico;
        }
        else if (contoBancario.codiceSegreto !== codice) {
            console.error("il codice e errato");
        }
        else if (contoBancario.iban !== iban || iban.length !== 27) {
            console.error("l'iban che hai inserito e sbagliato");
        }
        else if (bonifico > contoBancario.saldo) {
            console.error("saldo insufficiente hai solamente ".concat(contoBancario.saldo, "\u20AC"));
        }
    }
}
function acquisto(cardConto, codice, acquisto, cvv, numeroCard) {
    if (acquisto > 0) {
        if (acquisto <= cardConto.saldo &&
            cardConto.codiceSegreto == codice &&
            cardConto.numeroCard == numeroCard &&
            cardConto.cvv == cvv) {
            // Questa funzione mette l’ultimo elemento al primo posto del array transazioniEffettuate
            ultimiMovimenti(cardConto.transazioniEffettuate, acquisto);
            cardConto.saldo -= acquisto;
        }
        else if (cardConto.codiceSegreto !== codice) {
            console.error("il codice e errato");
        }
        else if (cardConto.numeroCard !== numeroCard || cvv.length !== 3) {
            console.log("i dati della carta non sono stati inseriti correttamente");
        }
        else if (acquisto > cardConto.saldo) {
            console.error("saldo insufficiente hai solamente ".concat(cardConto.saldo, "\u20AC"));
        }
    }
}
function ultimiMovimenti(transazioniEffettuate, movimento) {
    transazioniEffettuate.push(movimento);
    return transazioniEffettuate.unshift(transazioniEffettuate.pop());
}
