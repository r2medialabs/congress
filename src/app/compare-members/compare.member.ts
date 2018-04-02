export interface CompareMember {
    status: string;
    copyright: string;
    results : Array<ComparedVotes>
}

export interface ComparedVotes {
    first_member_id: string;
    first_member_api_uri: string;
    second_member_id: string;
    second_member_api_uri: string;
    congress: string;
    chamber: string;
    common_votes: number;
    disagree_votes: number;
    agree_percent: number;
    disagree_percent: number;
}