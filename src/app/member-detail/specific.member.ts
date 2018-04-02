export interface SpecificMember {
    status: string;
    copyright: string;
    results : Array<GeneralMember>
}

export interface GeneralMember {
    member_id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    suffix: string;
    date_of_birth: string;
    gender: string;
    url: string;
    times_topics_url: string;
    times_tag: string;
    govtrack_id: string;
    cspan_id: string;
    votesmart_id: string;
    icpsr_id: string;
    twitter_account: string;
    facebook_account: string;
    youtube_account: string;
    crp_id: string;
    google_entity_id: string;
    rss_url: string;
    in_office: boolean;
    current_party: string;
    most_recent_vote: string;
    roles: Array<Roles>
}

export interface Roles {
    congress: string;
    chamber: string;
    title: string;
    short_title: string;
    state: string;
    party: string;
    leadership_role: string;
    fec_candidate_id: string;
    seniority: string;
    district: string;
    at_large: boolean;
    ocd_id: string;
    start_date: string;
    end_date: string;
    office: string;
    phone: string;
    fax: string;
    contact_form: string;
    bills_sponsored: number;
    bills_cosponsored: number;
    missed_votes_pct: number;
    votes_with_party_pct: number;
    committees: Array<Committee>;
    subcommittees: Array<Subcommittee>
}

export interface Committee {
     name: string ;
     code: string ;
     api_uri: string;
     side: string;
     title: string;
     rank_in_party: number;
     begin_date: string;
     end_date: string;
}

export interface Subcommittee {
     name: string;
     code: string;
     parent_committee_id: string;
     api_uri: string;
     side: string;
     title: string;
     rank_in_party: number;
     begin_date: string;
     end_date: string;
}
