export interface RecentVotes {
    status:  string;
    copyright:  string;
    results: {
        chamber:  string;
        offset: number;
        num_results: number;
        votes: Votes[]
        }
    }

export interface Votes { 
    congress: number;
    chamber: string;
    session: number;
    roll_call: number;
    source: string;
    url: string;
    vote_uri: string;
    bill: Array<Bill>,
    amendment: Array<Amendment>,
    question:  string;
    description:  string;
    vote_type:  string;
    date:  string;
    time:  string;
    result:  string;
    democratic: Array<Democratic>,
    republican: Array<Republican>,
    independent: Array<Independent>,
    total: Array<Total>
}

export interface Bill {
    bill_id: string;
    number: string;
    sponsor_id: string;
    api_uri: string;
    title: string;
    latest_action: string;
}

export interface Amendment {
    number: string;
    api_uri: string;
    sponsor_id: string;
    sponsor: string;
    sponsor_uri: string;
    sponsor_party: string;
    sponsor_state: string;
}

export interface Democratic {
    yes: number;
    no: number;
    present: number;
    not_voting: number;
    majority_position: string;                
}

export interface Republican {
    yes: number;
    no: number;
    present: number;
    not_voting: number;
    majority_position: string;                
}

export interface Independent {
    yes: number;
    no: number;
    present: number;
    not_voting: number;                
}

export interface Total {
    yes: number;
    no: number;
    present: number;
    not_voting: number;                
}