using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BookStore.Models
{
    public class Order
    {
        public Order()
        {
            OrderDetails = new List<OrderDetail>();
        }
        public int Id { get; set; }
        [Required]
        public string Customer { get; set; }
        public DateTime OrderDate { get; set; }

        //Navigation
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}