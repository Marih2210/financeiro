// Model de result para tratar o retorno

export interface Result<T> {
    item: T | null;
    message: string;
    error: boolean;
    errorType: number;
    success: boolean;
}