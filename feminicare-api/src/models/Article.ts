import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Administrator } from './Administrator';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ default: 0 })
  ratingCount: number;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ length: 100, nullable: true })
  category: string;

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