class Either {

    static of = (a) => new Right(a);
    static fail = () => LEFT;

}

class Left extends Either {
    map = (f /*(a: A) => B*/) => this;

    flatMap = (f /*(a: A) => Maybe<B>*/) => this;

    flat = () => this;

    ap = (f /* Maybe<(a: A) => B>*/) => this;

}

const LEFT = new Left();

class Right extends Either {

    value;

    constructor(a) {
        super();
        this.value = a;
    }

    map = (f) => Either.of(f(this.value));

    flatMap = (f) => f(this.value);

    flat = () => this.value; // Только если валью это Майби



    ap = mf => mf.map(f => f(this.value));
}

const f = x => x === 0 ? Either.fail() : Either.of(10 / x);

console.log(Either.of(10).flatMap(f));
console.log(Either.of(0).flatMap(f));
console.log(Either.fail().flatMap(f));
console.log(Either.of(10).ap(Either.of(x => x * 2)));

const print = () => [Either.of(10).flatMap(f), Either.of().flatMap(f)];

console.log(print())
