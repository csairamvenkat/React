import {
 Table,
 Column,
 Model,
 DataType
} from 'sequelize-typescript';

@Table({
 tableName: 'Users',
 timestamps: true
})
export class User extends Model {

 @Column(DataType.STRING)
 declare username: string;

 @Column(DataType.STRING)
 declare password: string;

 @Column(DataType.STRING)
 declare role: string;

 @Column(DataType.BOOLEAN)
 declare isActive: boolean;
}