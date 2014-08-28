using BookStore.Models;
using System.Linq;
using System.Web.Http;

namespace BookStore.Controllers
{
    public class OrderController : ApiController
    {
        private IRepository _repo;

        public OrderController(IRepository repo)
        {
            _repo = repo;
        }

        public IQueryable<Order> Get()
        {
                return _repo.GetAllOrders();
        }

    [System.Web.Http.Queryable(PageSize = 2)]
        public IQueryable<Order> Get(bool includeDetails)
        {
            IQueryable<Order> query;

            if (includeDetails)
            {
                query = _repo.GetAllOrdersWithDetails();
            }
            else
            {
                query = _repo.GetAllOrders();
            }

            return query;
        }



        public Order Get(int id)
        {
            return _repo.GetOrder(id);
        }
    }
}
