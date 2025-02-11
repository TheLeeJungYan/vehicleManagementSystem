export interface HighlightResponse {
    data: HighlightProps|null;
    error_code:number;
    message:string;
}

export interface HighlightProps {
    total_draft:number;
    total_pending:number;
    total_rejected:number;
}
