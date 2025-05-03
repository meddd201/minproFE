export interface Attendee {
    id: string;
    userEventId: string;
    ticketId: string;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    tickets: {
        name: string;
    };
    usersEvents: {
        users: {
            id: string;
            username: string;
            email: string;
            profilePict: string | null;
        };
    };
}
