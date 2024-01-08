interface Contact{
    id: number;
    name: string;
    birtDate?: Date;
    status: ContactStatus;
}


enum ContactStatus {
    Active = "active",
    Inactive = "Inactive",
    New = "new"
}


let sagarContact: Contact = {
    id: 12,
    name: "sagar",
    status: ContactStatus.Active

}