class Either {
    constructor(value) {
        this._value = value;
    }
    get value () {
        return this._value;
    }
    static fromNullable = (a) => !is.defined(a) || is.none(a) ? Either.left(a) : Either.right(a);

    static left = (a) => new Left(a);

    static right = (a) => new Right(a);

    static of = (a) => Either.right(a);
}

class Left extends Either {
    constructor(unexpectedResult) {
        super(unexpectedResult);
    }
    map (fn) {
        return this;
    }
    get value () {
        throw new TypeError(`Can't extract value from a Left() monad`);
    }
    toString () {
        return `[object Either.Left] (value: ${this._value})`;
    }
}

class Right extends Either {
    constructor (value) {
        super(value);
    }
    get value () {
        return this._value;
    }
    toString() {
        return `[object Either.Right] (value: ${this._value})`;
    }
}

const f = x => x === 0 ? Maybe.fail() : Maybe.of(10 / x);

console.log(Either(10).fromNullable(f))