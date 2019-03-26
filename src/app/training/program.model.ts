export interface Program {
    id: string;
    name: string;
    duration: number;
    calories: number;
    date?:Date;
    state?: 'cancelled' | 'completed'  | null;
}
