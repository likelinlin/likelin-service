import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    default: '',
    comment: '手机号',
  })
  phone: string;

  @Column({
    type: 'varchar',
    default: '',
    comment: '邮箱',
  })
  email: string;

  @Column({
    type: 'varchar',
    default: '',
    comment: '密码',
  })
  password: string;

  @Column({
    type: 'varchar',
    default: '',
    comment: '名字',
    name: 'real_name',
  })
  realName: string;

  @Column({
    type: 'varchar',
    default: '',
    comment: '城市',
    name: 'city',
  })
  city: string;

  @Column({
    type: 'varchar',
    default: '',
    comment: '昵称',
    name: 'nick_name',
  })
  nickName: string;

  @Column({
    type: 'int',
    default: 1,
    comment: '性别',
  })
  gender: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    comment: '创建时间',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    comment: '最后更新时间',
  })
  updatedAt: Date;
}
