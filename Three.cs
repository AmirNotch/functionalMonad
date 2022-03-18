using System;

namespace ConsoleApp2
{
	public interface Either<L, R>
	{
		Either<L, B> Select<B>(Func<R, B> f);
		Either<L, B> SelectMany<B>(Func<R, Either<L, B>> f);
		Either<L, C> SelectMany<B, C>(Func<R, Either<L, B>> f, Func<R, B, C> p);


	}
 
	public static class Either
	{
		public static Either<L, R> Of<L, R>(R r) => new Right<L, R>(r);
		public static Either<L, R> Fail<L, R>(L l) => new Left<L, R>(l);
	}


	public class Right<L, R> : Either<L, R>
	{
		private R right;

		internal Right(R right) => this.right = right;


		public Either<L, B> Select<B>(Func<R, B> f) =>
			new Right<L, B>(f(right));

		public Either<L, B> SelectMany<B>(Func<R, Either<L, B>> f) =>
			f(right);

		public Either<L, C> SelectMany<B, C>(Func<R, Either<L, B>> f, Func<R, B, C> p) =>
			SelectMany(r => f(r).Select(b => p(r, b)));

		public override string ToString() => $"Right({right})";
	}

//////


	public class Left<L, R> : Either<L, R>
	{
		private L left;

		internal Left(L left) => this.left = left;

		public Either<L, B> Select<B>(Func<R, B> f) =>
			new Left<L, B>(left);

		public Either<L, B> SelectMany<B>(Func<R, Either<L, B>> f) =>
			new Left<L, B>(left);

		public Either<L, C> SelectMany<B, C>(Func<R, Either<L, B>> f, Func<R, B, C> p) =>
			new Left<L, C>(left);

		public override string ToString() => $"Left({left})";
	}

	public class Effect<A>
	{
		private Func<Either<string, A>> eff;

		internal Effect(Func<Either<string, A>> eff) => this.eff = eff;

		public Either<string, A> Run()
		{
			try
			{
				return eff();
			}
			catch (Exception ex)
			{
				return Either.Fail<string, A>(ex.Message);
			}
		}
		public Either<string, A> Runall()
		{
			try
			{
				return eff();
			}
			catch (Exception ex)
			{
				int.TryParse(Console.ReadLine(), out int value);
				Effect.Repeat(value).Runall();
				return Either.Fail<string, A>(ex.Message);
				
			}
		}


		public Effect<B> Select<B>(Func<A, B> f) =>
			Effect.From(() => eff().Select(f));

		public Effect<B> SelectMany<B>(Func<A, Effect<B>> f) =>
			Effect.From(() => eff().SelectMany(a => f(a).eff()));

		public Effect<C> SelectMany<B, C>(Func<A, Effect<B>> f, Func<A, B, C> p) =>
			SelectMany(a => f(a).Select(b => p(a, b)));

		// TODO: 1
		// IfFail - принимает Значение ИЛИ Функцию возвращающую значени ИЛИ эффект и
		// Заменяет результат текущего эффекта на переданное значени, ЕСЛИ текущий эффект провалился 

	}

	public class Unit
	{
		public static Unit unit = new Unit();
	}

	public static class Effect
	{
		public static Effect<A> Of<A>(A a) => new Effect<A>(() => Either.Of<string, A>(a));
		public static Effect<A> Of<A>(Either<string, A> a) => new Effect<A>(() => a);
		public static Effect<A> Fail<A>(string error) => new Effect<A>(() => Either.Fail<string, A>(error));
		public static Effect<A> Fail<A>(Exception ex) => new Effect<A>(() => Either.Fail<string, A>(ex.Message));

		public static Effect<A> From<A>(Func<Either<string, A>> eff) => new Effect<A>(eff);
		public static Effect<A> From<A>(Func<A> eff) => new Effect<A>(() => Either.Of<string, A>(eff()));

		
		public static Effect<A> Repeat<A>(A a) =>
			new Effect<A>(() => Either.Of<string, A>(a));

		
		/*private static int number = 0;
		public static Effect<A> Repeat3<A>(A a) => 
			new Effect<A>(() => a.GetType() == typeof(int) && number != 3 ? Either.Of<string, A>(a) : Repeat3<A>());
			*/
		

		// TODO: 2*
		// static repeat - 1. Повторяет эффект пока не получит успех (тестить на вводе с консоли)
		//                 2. Повторяет эффект не больше чем n раз 

	}



	public class Program
	{
		public static Effect<int> ParseInt(string input) =>
			Effect.From(() => int.Parse(input));

		public static Effect<Unit> Log(string s) =>
			Effect.From(() =>
			{
				Console.WriteLine(s);
				return Unit.unit;
			});


		public static Effect<Unit> PrintResult<A>(Effect<A> eff) =>
			from a in eff
			from _ in Log($"Result: {a}")
			select _;

		public static void Main()
		{
			/*Console.WriteLine(
				//from a in Either.Of<string, int>(10)
				from a in Either.Fail<string, int>("Error")

				from b in Either.Of<string, int>(20)
				select a + b
			);

			Console.WriteLine(Effect.Of(10).Run());
			Console.WriteLine(Effect.Fail<int>("Error!!").Run());

			Console.WriteLine(Effect.Fail<int>(new ArgumentException("asdf")).Run());

			Console.WriteLine(ParseInt("10").SelectMany(x => Effect.Of(x * 2)).Run());

			Console.WriteLine("asdf");

			var p = (
				from a in ParseInt("10")
				let x = a + 10

				from b in ParseInt("ASDF")
				select x + b);

			Console.WriteLine(PrintResult(
				//p.SelectMany(r1 => p.Select(r2 => r1 + r2))
				from r1 in p
				from r2 in p
				select r1 + r2


				//from a in Either.Of<string, int>(10)

			));*/

			int.TryParse(Console.ReadLine(), out int value);
			
			Console.WriteLine(Effect.Repeat(value).Runall());

		}
	}
}



// TODO: 3
// НА ДЖС 
// Калькулятор: поле для ввода + кнопка посчитать
// В поле для вводим выражение:
// + - * / - с учетом приоритета
// скобочки 
// sqrt(x) - корень

// (1 + sqrt(5 + 2 * 2)) * 3  = 12

// НЕ использовать eval
