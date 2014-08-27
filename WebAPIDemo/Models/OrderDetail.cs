using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WebAPIDemo.Models
{
    public class OrderDetail
    {
        public int Id { get; set; }

        public int Quatity { get; set; }

        public int OrderId { get; set; }

        public int BookId { get; set; }

        public virtual Book Book { get; set; }

        public virtual Order Order { get; set; }
    }
}
