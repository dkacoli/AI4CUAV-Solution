using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AI4CUAV.Migrations
{
    /// <inheritdoc />
    public partial class dataset_url_added : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DatasetURL",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DatasetURL",
                table: "Orders");
        }
    }
}
