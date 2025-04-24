export interface Article {
    articles_id: number;
    article_title: string;
    retrieved_at: string;
    published_at: string;
    lang: string;
    domain: string;
    url: string;
    articles_categories_id: number;
    articles_sentiments_id?: number;
    short_summary_id?: number;
    long_summary_id?: number;
    statuses_id?: number;
    description?: string;
    status_description?: string;
}
