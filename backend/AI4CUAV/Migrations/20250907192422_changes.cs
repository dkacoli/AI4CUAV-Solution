using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AI4CUAV.Migrations
{
    /// <inheritdoc />
    public partial class changes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Datasets_DatasetId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_DatasetId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "DatasetId",
                table: "Orders");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "DatasetId",
                table: "Orders",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_DatasetId",
                table: "Orders",
                column: "DatasetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Datasets_DatasetId",
                table: "Orders",
                column: "DatasetId",
                principalTable: "Datasets",
                principalColumn: "Id");
        }
    }
}
