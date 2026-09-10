using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AI4CUAV.Migrations
{
    /// <inheritdoc />
    public partial class Dataset_table_updated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UsersDatasets_Orders_OrderId",
                table: "UsersDatasets");

            migrationBuilder.DropIndex(
                name: "IX_UsersDatasets_OrderId",
                table: "UsersDatasets");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "UsersDatasets");

            migrationBuilder.DropColumn(
                name: "UploadedAt",
                table: "UsersDatasets");

            migrationBuilder.RenameColumn(
                name: "TargetTechnology",
                table: "UsersDatasets",
                newName: "SensorType");

            migrationBuilder.RenameColumn(
                name: "HostingLocation",
                table: "UsersDatasets",
                newName: "Resolution");

            migrationBuilder.RenameColumn(
                name: "Format",
                table: "UsersDatasets",
                newName: "ProjectPartner");

            migrationBuilder.RenameColumn(
                name: "AdditionalNotes",
                table: "UsersDatasets",
                newName: "Commentss");

            migrationBuilder.AlterColumn<string>(
                name: "NumberOfSamples",
                table: "UsersDatasets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DataFormat",
                table: "UsersDatasets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Datasource",
                table: "UsersDatasets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FrameRate",
                table: "UsersDatasets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ModelType",
                table: "UsersDatasets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "TaskType",
                table: "UsersDatasets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "TestingSize",
                table: "UsersDatasets",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "TrainingSize",
                table: "UsersDatasets",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "ValidationSize",
                table: "UsersDatasets",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

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
                name: "FK_Orders_UsersDatasets_DatasetId",
                table: "Orders",
                column: "DatasetId",
                principalTable: "UsersDatasets",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_UsersDatasets_DatasetId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_DatasetId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "DataFormat",
                table: "UsersDatasets");

            migrationBuilder.DropColumn(
                name: "Datasource",
                table: "UsersDatasets");

            migrationBuilder.DropColumn(
                name: "FrameRate",
                table: "UsersDatasets");

            migrationBuilder.DropColumn(
                name: "ModelType",
                table: "UsersDatasets");

            migrationBuilder.DropColumn(
                name: "TaskType",
                table: "UsersDatasets");

            migrationBuilder.DropColumn(
                name: "TestingSize",
                table: "UsersDatasets");

            migrationBuilder.DropColumn(
                name: "TrainingSize",
                table: "UsersDatasets");

            migrationBuilder.DropColumn(
                name: "ValidationSize",
                table: "UsersDatasets");

            migrationBuilder.DropColumn(
                name: "DatasetId",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "SensorType",
                table: "UsersDatasets",
                newName: "TargetTechnology");

            migrationBuilder.RenameColumn(
                name: "Resolution",
                table: "UsersDatasets",
                newName: "HostingLocation");

            migrationBuilder.RenameColumn(
                name: "ProjectPartner",
                table: "UsersDatasets",
                newName: "Format");

            migrationBuilder.RenameColumn(
                name: "Commentss",
                table: "UsersDatasets",
                newName: "AdditionalNotes");

            migrationBuilder.AlterColumn<int>(
                name: "NumberOfSamples",
                table: "UsersDatasets",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<Guid>(
                name: "OrderId",
                table: "UsersDatasets",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UploadedAt",
                table: "UsersDatasets",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_UsersDatasets_OrderId",
                table: "UsersDatasets",
                column: "OrderId",
                unique: true,
                filter: "[OrderId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_UsersDatasets_Orders_OrderId",
                table: "UsersDatasets",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id");
        }
    }
}
