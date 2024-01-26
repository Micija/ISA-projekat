using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ISA.API.Migrations
{
    /// <inheritdoc />
    public partial class Addedanswertocomplaint : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Answer",
                table: "complaints",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Answer",
                table: "complaints");
        }
    }
}
