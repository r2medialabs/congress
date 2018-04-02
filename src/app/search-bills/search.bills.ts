export interface SearchBill {
    status: string;
	copyright: string;
	results : Array<{
        num_results: number;
        offset: number;
        bills: Array<Bill>
    }>
}

export interface Bill {
    bill_id: string;
    bill_slug: string;
    bill_type: string;
    number: string;
    bill_uri: string;
    title: string;
    short_title: string;
    sponsor_title: string;
    sponsor_id: string;
    sponsor_name: string;
    sponsor_state: string;
    sponsor_party: string;
    sponsor_uri: string;
    gpo_pdf_uri: string;
    congressdotgov_url: string;
    govtrack_url: string;
    introduced_date: string;
    active: boolean;
    last_vote: string;
    house_passage: string;
    senate_passage: string;
    enacted: string;
    vetoed: string;
    cosponsors: number;
    cosponsors_by_party: {
        D: number;
        R: number;
        I: number;
    };
    committees: string;
    committee_codes: Array<{
        string
    }>;
    subcommittee_codes: Array<{
        string
    }>;
    primary_subject: string;
    summary: string;
    summary_short: string;
    latest_major_action_date: string;
    latest_major_action: string;
}