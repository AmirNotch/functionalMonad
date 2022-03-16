class Maybe {

    static of = (a) => new Just(a);
    static fail = () => NOTHING;

}


class Nothing extends Maybe {
    map = (f /*(a: A) => B*/) => this;

    flatMap = (f /*(a: A) => Maybe<B>*/) => this;

    flat = () => this;

    ap = (f /* Maybe<(a: A) => B>*/) => this;

}

const NOTHING = new Nothing();

class Just extends Maybe {

    value;

    constructor(a) {
        super();
        this.value = a;
    }

    map = (f) => Maybe.of(f(this.value));

    flatMap = (f) => f(this.value);

    flat = () => this.value; // Только если валью это Майби



    ap = mf => mf.map(f => f(this.value));
}


const f = x => x === 0 ? Maybe.fail() : Maybe.of(10 / x);

console.log(Maybe.of(10).flatMap(f));
console.log(Maybe.of(0).flatMap(f));
console.log(Maybe.fail().flatMap(f));
console.log(Maybe.of(10).ap(Maybe.of(x => x * 2)));


console.log(
    Maybe.of(10)
        .map(x => x * 10)
        .flatMap(f)
        .map(x => x + "!"));


const ma = Maybe.of(10);
const mb = Maybe.of(1);


const lift2 = f => ma => mb =>
    mb.ap(ma.map(f));

const sum = a => b => a + b;

const sumM = lift2 (sum);

<!-- const sum = ma => mb => mc => 	ma.flatMap(a => mb.flatMap(b => mc.map(c => a + b + c))); -->

console.log(sumM (ma) (mb));


// type Either<L, R> = Left<L> | Right<R>


/*const f = x => x === 0 ? Maybe.fail("Div by zero!") : Maybe.of(10 / x);

/!*Either.of(10);
Either.of("Parsing error expected nubmer");*!/





console.log(Maybe.of(10).flatMap(f));
console.log(Maybe.of(0).flatMap(f));
console.log(Maybe.fail().flatMap(f));
console.log(Maybe.of(10).ap(Maybe.of(x => x * 2)));


console.log(
    Maybe.of(10)
        .map(x => x * 10)
        .flatMap(f)
        .map(x => x + "!"));


const ma = Maybe.of(10);
const mb = Maybe.of(1);


const lift2 = f => ma => mb =>
    mb.ap(ma.map(f));

const sum = a => b => a + b;

const sumM = lift2 (sum);


console.log(sumM (ma) (mb));


// Effect () => A  Aff  () => new Promise() | Reader (env) => A | Writer () => [A, Log] | State (S) => [A, S]


const print = a => () => [console.log(), ""];

program.run();*/
