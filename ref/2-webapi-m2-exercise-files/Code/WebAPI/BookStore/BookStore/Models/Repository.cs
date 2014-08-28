using System.Linq;

namespace BookStore.Models
{
    public class Repository : IRepository
    {
        private BookStoreContext db;

        public Repository(BookStoreContext db)
        {
            this.db = db;
        }

        public IQueryable<Order> GetAllOrders()
        {
            return db.Orders;
        }

        public IQueryable<Order> GetAllOrdersWithDetails()
        {
            return db.Orders.Include("OrderDetails");
        }

        public Order GetOrder(int id)
        {
            return db.Orders.Include("OrderDetails.Book").FirstOrDefault(o => o.Id == id);
        }

    }
}