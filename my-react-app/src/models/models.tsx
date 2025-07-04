export interface MessageModel {
    id?: number; // オプションとしてidを追加
    position: 'left' | 'right' ;
    content: string;
    date: Date;
    role?: 'user' | 'assistant' | 'system';
}