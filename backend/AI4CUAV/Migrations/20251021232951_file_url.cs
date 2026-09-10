using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AI4CUAV.Migrations
{
    /// <inheritdoc />
    public partial class file_url : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FileURL",
                table: "Datasets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileURL",
                table: "Datasets");
        }
    }
}
