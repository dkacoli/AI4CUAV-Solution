using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AI4CUAV.Migrations
{
    /// <inheritdoc />
    public partial class test_ : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OrderDatasetProofs_OrderId",
                table: "OrderDatasetProofs");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDatasetProofs_OrderId",
                table: "OrderDatasetProofs",
                column: "OrderId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OrderDatasetProofs_OrderId",
                table: "OrderDatasetProofs");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDatasetProofs_OrderId",
                table: "OrderDatasetProofs",
                column: "OrderId");
        }
    }
}
