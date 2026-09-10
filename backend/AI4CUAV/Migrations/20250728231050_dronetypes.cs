using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AI4CUAV.Migrations
{
    /// <inheritdoc />
    public partial class dronetypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DroneType",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "FixedWingClass",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "HybridVTOLClass",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "MultiRotorClass",
                table: "Orders");

            migrationBuilder.AddColumn<string>(
                name: "DroneTypes",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "FixedWingClasses",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HybridVTOLClasses",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MultiRotorClasses",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DroneTypes",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "FixedWingClasses",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "HybridVTOLClasses",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "MultiRotorClasses",
                table: "Orders");

            migrationBuilder.AddColumn<int>(
                name: "DroneType",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FixedWingClass",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "HybridVTOLClass",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MultiRotorClass",
                table: "Orders",
                type: "int",
                nullable: true);
        }
    }
}
