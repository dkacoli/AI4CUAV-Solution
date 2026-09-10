using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AI4CUAV.Migrations
{
    /// <inheritdoc />
    public partial class Datasetverifiedproof : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_UsersDatasets_DatasetId",
                table: "Orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UsersDatasets",
                table: "UsersDatasets");

            migrationBuilder.RenameTable(
                name: "UsersDatasets",
                newName: "Datasets");

            migrationBuilder.AddColumn<bool>(
                name: "IsDatasetVerified",
                table: "Orders",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Datasets",
                table: "Datasets",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "OrderDatasetProofs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FileName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    ContentType = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    SizeBytes = table.Column<long>(type: "bigint", nullable: false),
                    Content = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    UploadedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderDatasetProofs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderDatasetProofs_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderDatasetProofs_OrderId",
                table: "OrderDatasetProofs",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Datasets_DatasetId",
                table: "Orders",
                column: "DatasetId",
                principalTable: "Datasets",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Datasets_DatasetId",
                table: "Orders");

            migrationBuilder.DropTable(
                name: "OrderDatasetProofs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Datasets",
                table: "Datasets");

            migrationBuilder.DropColumn(
                name: "IsDatasetVerified",
                table: "Orders");

            migrationBuilder.RenameTable(
                name: "Datasets",
                newName: "UsersDatasets");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsersDatasets",
                table: "UsersDatasets",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_UsersDatasets_DatasetId",
                table: "Orders",
                column: "DatasetId",
                principalTable: "UsersDatasets",
                principalColumn: "Id");
        }
    }
}
