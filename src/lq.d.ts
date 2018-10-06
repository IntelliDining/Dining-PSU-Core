interface LQ {
    on(event: string, callback: (message?: any) => void): void;

    emit(event: string, data?: any): void;
}

declare var LiquidCore: LQ;
