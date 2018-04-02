export interface MemberVotes {
    status:string,
    copyright:string,
    results : Array<any>
}

export interface InMemRecord {
    billid : string;
    description : string;
    congress: string;
    memberid2: string;
    m1countYes : number;
    m1countNo : number;
    m2countYes: number;
    m2countNo: number;
    memberid1: string;
    m1countNV : number;
    m2countNV : number;
}