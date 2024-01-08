export interface SecureHeaders {
    [key: string]: SecureHeader[];
}

export interface SecureHeader {
    name: string;
    value: string;
}
