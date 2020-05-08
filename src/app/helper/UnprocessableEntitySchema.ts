export interface UnprocessableEntitySchema {
    failingConstraints: {
        [key: string]: {
            constraint: string;
            message?: string;
        }[];
    };
}
