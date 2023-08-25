export default class printTemplate {
    push(template: any): this;
    print(name: string, data?: any): Promise<unknown>;
    getPrintData(name: string, data?: any): Promise<unknown>;
}
