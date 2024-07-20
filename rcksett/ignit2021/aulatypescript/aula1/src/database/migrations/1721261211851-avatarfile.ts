import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class Avatarfile1721261211851 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
          "users",
          new TableColumn({
            name: "avatar",
            type: "varchar",
            isNullable: true, // Definindo como nullable diretamente
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "avatar");
      }
    
}
