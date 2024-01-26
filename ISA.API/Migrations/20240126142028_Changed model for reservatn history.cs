using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ISA.API.Migrations
{
    /// <inheritdoc />
    public partial class Changedmodelforreservatnhistory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ReservationId",
                table: "reservation_history",
                newName: "TermId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TermId",
                table: "reservation_history",
                newName: "ReservationId");
        }
    }
}
