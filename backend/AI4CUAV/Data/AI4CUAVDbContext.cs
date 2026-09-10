using ai4cuav.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AI4CUAV1.Data
{
    public class AI4CUAVDbContext : IdentityDbContext<IdentityUser>
    {
        public AI4CUAVDbContext(DbContextOptions<AI4CUAVDbContext> dbContextOptions) : base(dbContextOptions)
        {
        }

        public DbSet<Order> Orders { get; set; }
        public DbSet<Dataset> Datasets { get; set; }
        public DbSet<OrderDatasetProof> OrderDatasetProofs => Set<OrderDatasetProof>();

        protected override void OnModelCreating(ModelBuilder b)
        {
            base.OnModelCreating(b);

            // Optional 1-to-1
            b.Entity<Order>()
             .HasOne<OrderDatasetProof>()
             .WithOne(p => p.Order)
             .HasForeignKey<OrderDatasetProof>(p => p.OrderId);
        }
    }
}
