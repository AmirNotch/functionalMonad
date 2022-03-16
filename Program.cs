using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace ConsoleApp2
{
    public interface Effect<A>
    {
        public Effect<B> Select<B>(Func<A, B> f);

        public Effect<B> SelectMany<B>(Func<A, Effect<B>> f);
        public Effect<C> SelectMany<B, C>(Func<A, Effect<B>> f, Func<A, B, C> p);
    }

    public static class Effect
    {
        public static Effect<A> Of<A>(A value) => new Just<A>(value);
        public static Effect<A> Fail<A>() => new Nothing<A>();
    }

    public class Nothing<A> : Effect<A>
    {
        public Effect<B> Select<B>(Func<A, B> f) => new Nothing<B>();
        
        public Effect<B> SelectMany<B>(Func<A, Effect<B>> f) => new Nothing<B>();
        
        public Effect<C> SelectMany<B, C>(Func<A, Effect<B>> f, Func<A, B, C> p) => new Nothing<C>();

        public override string ToString() => "Nothing";
    }

    public class Just<A> : Effect<A>
    {
        private A value;
	
        public Just(A value) => this.value = value;

        public Effect<B> Select<B>(Func<A, B> f) => new Just<B>(f(value));

        public Effect<B> SelectMany<B>(Func<A, Effect<B>> f) => f(value);

        public Effect<C> SelectMany<B, C>(Func<A, Effect<B>> f, Func<A, B, C> p) =>
            this.SelectMany(a => f(a).Select(b => p(a, b)));

        public override string ToString() => $"Just({value})";
    }

    
    public class Second {
        
        public static int sum (int a, int b) => a + b;
        public static int sumElement (int a, int b, int c, int d, int e) => a + b + c + d + e;
        
        

        public static Effect<int> div(Effect<int> ma) => ma.SelectMany(a => a == 0 ? Effect.Fail<int>() : Effect.Of(10 / a));
	
        public static Effect<int> add1(Effect<int> ma) => 
            from a in ma
            select a + 1;
	
        public static Effect<int> sum (Effect<int> xs, Effect<int> bs) => 
            from x			in xs
            from b 			in bs
            select 			sum(x, b);
        
        
        public static Effect<int> sumFiveElem (Effect<int> xs, Effect<int> bs, Effect<int> cs, Effect<int> ds, Effect<int> es) => 
            from x			in Effect.Of(Convert.ToInt32(Console.ReadLine()))
            from b 			in Effect.Of(Convert.ToInt32(Console.ReadLine()))
            from c 			in Effect.Of(Convert.ToInt32(Console.ReadLine()))
            from d 			in Effect.Of(Convert.ToInt32(Console.ReadLine()))
            from e 			in Effect.Of(Convert.ToInt32(Console.ReadLine()))
            select 			sumElement(x, b, c, d, e);
        
        public static Effect<int> devide(Effect<int> ma, Effect<int> mb) => 
            from a in Effect.Of(Convert.ToInt32(Console.ReadLine()))
            from b in Effect.Of(Convert.ToInt32(Console.ReadLine()))
            select a + b;
        
        
        public static Effect<int> multiply() => 
            from a in Effect.Of(Convert.ToInt32(Console.ReadLine()))
            from b in Effect.Of(Convert.ToInt32(Console.ReadLine()))
            from c in Effect.Of(Convert.ToInt32(Console.ReadLine()))
            select a * b * c;
        
        public static void Main()
        {
            Console.WriteLine(div(Effect.Of(0)));
		
            Console.WriteLine(add1(Effect.Of(10)));
		
            Console.WriteLine(add1(Effect.Fail<int>()));
		
		
            //sum().Run();
		
            Console.WriteLine(sum(Effect.Of<int>(2), Effect.Of(10)));
            
            Console.WriteLine(sumFiveElem(Effect.Of<int>(0), Effect.Of(0),
                Effect.Of<int>(0), Effect.Of(0),Effect.Of<int>(0)));
            
            Console.WriteLine(devide(Effect.Of(0),Effect.Of(0)));
            
            Console.WriteLine(multiply());


        }
    }
}
