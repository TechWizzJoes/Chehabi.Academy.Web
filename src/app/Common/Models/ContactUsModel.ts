export namespace ContactUsModel {
    export class ContactUsModelReq {
        constructor(
            public Email: string,
            public FirstName: string,
            public LastName: string,
            public Description: string,) { }
    }
}