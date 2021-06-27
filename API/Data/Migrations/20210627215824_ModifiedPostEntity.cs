using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class ModifiedPostEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Users_postedById",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "body",
                table: "Posts");

            migrationBuilder.RenameColumn(
                name: "postedById",
                table: "Posts",
                newName: "PostedById");

            migrationBuilder.RenameColumn(
                name: "title",
                table: "Posts",
                newName: "Caption");

            migrationBuilder.RenameIndex(
                name: "IX_Posts_postedById",
                table: "Posts",
                newName: "IX_Posts_PostedById");

            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "Posts",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Users_PostedById",
                table: "Posts",
                column: "PostedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Users_PostedById",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "Posts");

            migrationBuilder.RenameColumn(
                name: "PostedById",
                table: "Posts",
                newName: "postedById");

            migrationBuilder.RenameColumn(
                name: "Caption",
                table: "Posts",
                newName: "title");

            migrationBuilder.RenameIndex(
                name: "IX_Posts_PostedById",
                table: "Posts",
                newName: "IX_Posts_postedById");

            migrationBuilder.AddColumn<string>(
                name: "body",
                table: "Posts",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Users_postedById",
                table: "Posts",
                column: "postedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
