interface props {
    id: string;
    value: string;
    type: string;
    expiresAt: Date;
}

export class TokenContract {
    private id: string;
    private value: string;
    private type: string;
    private expiresAt: Date;

    constructor(tokenProps: props) {
        this.id = tokenProps.id;
        this.value = tokenProps.value;
        this.type = tokenProps.type;
        this.expiresAt = tokenProps.expiresAt;
    }

    toJson() {
        return {
            value: this.value,
            type: this.type,
            expiresAt: this.expiresAt
        }
    }
}
