export interface HighlightResponse {
    data: HighlightDataProps|null;
    error_code:number;
    message:string;
}
export interface HighlightDataProps {
    total_draft:number;
    total_pending:number;
    total_rejected:number;
}
