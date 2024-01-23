using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ISA.API.Migrations
{
    /// <inheritdoc />
    public partial class ReservationItemsAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_users_UserId1",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Terms_Reservations_ReservationId",
                table: "Terms");

            migrationBuilder.DropForeignKey(
                name: "FK_Terms_companies_CompanyId",
                table: "Terms");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Terms",
                table: "Terms");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Reservations",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_UserId1",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "Reservations");

            migrationBuilder.RenameTable(
                name: "Terms",
                newName: "terms");

            migrationBuilder.RenameTable(
                name: "Reservations",
                newName: "reservations");

            migrationBuilder.RenameIndex(
                name: "IX_Terms_ReservationId",
                table: "terms",
                newName: "IX_terms_ReservationId");

            migrationBuilder.RenameIndex(
                name: "IX_Terms_CompanyId",
                table: "terms",
                newName: "IX_terms_CompanyId");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "reservations",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddPrimaryKey(
                name: "PK_terms",
                table: "terms",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_reservations",
                table: "reservations",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "reservation_items",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    EquipmentId = table.Column<int>(type: "int", nullable: false),
                    ReservationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reservation_items", x => x.Id);
                    table.ForeignKey(
                        name: "FK_reservation_items_equipment_EquipmentId",
                        column: x => x.EquipmentId,
                        principalTable: "equipment",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_reservation_items_reservations_ReservationId",
                        column: x => x.ReservationId,
                        principalTable: "reservations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_reservations_UserId",
                table: "reservations",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_reservation_items_EquipmentId",
                table: "reservation_items",
                column: "EquipmentId");

            migrationBuilder.CreateIndex(
                name: "IX_reservation_items_ReservationId",
                table: "reservation_items",
                column: "ReservationId");

            migrationBuilder.AddForeignKey(
                name: "FK_reservations_users_UserId",
                table: "reservations",
                column: "UserId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_terms_companies_CompanyId",
                table: "terms",
                column: "CompanyId",
                principalTable: "companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_terms_reservations_ReservationId",
                table: "terms",
                column: "ReservationId",
                principalTable: "reservations",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_reservations_users_UserId",
                table: "reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_terms_companies_CompanyId",
                table: "terms");

            migrationBuilder.DropForeignKey(
                name: "FK_terms_reservations_ReservationId",
                table: "terms");

            migrationBuilder.DropTable(
                name: "reservation_items");

            migrationBuilder.DropPrimaryKey(
                name: "PK_terms",
                table: "terms");

            migrationBuilder.DropPrimaryKey(
                name: "PK_reservations",
                table: "reservations");

            migrationBuilder.DropIndex(
                name: "IX_reservations_UserId",
                table: "reservations");

            migrationBuilder.RenameTable(
                name: "terms",
                newName: "Terms");

            migrationBuilder.RenameTable(
                name: "reservations",
                newName: "Reservations");

            migrationBuilder.RenameIndex(
                name: "IX_terms_ReservationId",
                table: "Terms",
                newName: "IX_Terms_ReservationId");

            migrationBuilder.RenameIndex(
                name: "IX_terms_CompanyId",
                table: "Terms",
                newName: "IX_Terms_CompanyId");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Reservations",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "UserId1",
                table: "Reservations",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Terms",
                table: "Terms",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Reservations",
                table: "Reservations",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_UserId1",
                table: "Reservations",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_users_UserId1",
                table: "Reservations",
                column: "UserId1",
                principalTable: "users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Terms_Reservations_ReservationId",
                table: "Terms",
                column: "ReservationId",
                principalTable: "Reservations",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Terms_companies_CompanyId",
                table: "Terms",
                column: "CompanyId",
                principalTable: "companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
