import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Administrator } from './Administrator';

@Entity('contents')
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ length: 100 })
  category: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: 'json', nullable: true })
  tags: string[];

  @ManyToOne(() => Administrator)
  @JoinColumn({ name: 'adminId' })
  author: Administrator;

  @Column()
  adminId: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}