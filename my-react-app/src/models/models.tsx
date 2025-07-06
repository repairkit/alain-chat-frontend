export interface MessageModel {
    id?: number;
    position: 'left' | 'right' ;
    content: string;
    date: Date;
    role?: 'user' | 'assistant' | 'system';
}

