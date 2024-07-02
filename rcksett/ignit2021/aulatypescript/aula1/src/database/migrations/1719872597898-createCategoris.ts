import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createCategoris1719872597898 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'categorias',
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isUnique: true,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '255',
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('categorias');
    }
}
