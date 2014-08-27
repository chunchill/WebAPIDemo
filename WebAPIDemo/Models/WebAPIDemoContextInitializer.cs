using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;


namespace WebAPIDemo.Models
{
    public class WebAPIDemoContextInitializer : DropCreateDatabaseAlways<WebAPIDemoContext>
    {
        protected override void Seed(WebAPIDemoContext context)
        {
            var books = new List<Book>
            {
                new Book(){Name="Book 1",Author="Author 1",Price=19.31M},
                new Book(){Name="Book 2",Author="Author 2",Price=19.32M},
                new Book(){Name="Book 3",Author="Author 3",Price=19.33M},
                new Book(){Name="Book 4",Author="Author 4",Price=19.34M},
                new Book(){Name="Book 5",Author="Author 5",Price=19.35M},
                new Book(){Name="Book 6",Author="Author 6",Price=19.36M},
                new Book(){Name="Book 7",Author="Author 7",Price=19.37M},
            };
            books.ForEach(b => context.Books.Add(b));
            context.SaveChanges();

            var order = new Order() { Customer = "Customer 1", OrderDate = new DateTime(2014, 8, 05) };
            var details = new List<OrderDetail>()
            {
                new OrderDetail(){Book=books[0],Quatity=1,Order=order},
                new OrderDetail(){Book=books[1],Quatity=2,Order=order},
                new OrderDetail(){Book=books[2],Quatity=5,Order=order},
                new OrderDetail(){Book=books[3],Quatity=12,Order=order}
            };
            context.Orders.Add(order);
            details.ForEach(o => context.OrderDetails.Add(o));
            context.SaveChanges();

            order = new Order() { Customer = "Customer 2", OrderDate = new DateTime(2014, 8, 05) };
            details = new List<OrderDetail>()
            {
                new OrderDetail(){Book=books[0],Quatity=1,Order=order},
                new OrderDetail(){Book=books[4],Quatity=2,Order=order},
                new OrderDetail(){Book=books[1],Quatity=5,Order=order},
                new OrderDetail(){Book=books[3],Quatity=12,Order=order}
            };
            context.Orders.Add(order);
            details.ForEach(o => context.OrderDetails.Add(o));
            context.SaveChanges();

            base.Seed(context);
        }
    }
}