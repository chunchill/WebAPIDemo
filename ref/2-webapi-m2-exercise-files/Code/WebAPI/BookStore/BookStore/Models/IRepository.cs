using System.Linq;

namespace BookStore.Models
{
    public interface IRepository
    {
        IQueryable<Order> GetAllOrders();
        IQueryable<Order> GetAllOrdersWithDetails();
        Order GetOrder(int id);

    }
}