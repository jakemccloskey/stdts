// Instances created with this class won't actually have any of these properties but typescript will think they do so we
// need to mark them as private so they can't be used (at least not outside of the class).
declare class Empty {
    private 'constructor': Empty;
    private toString: any;
    private toLocaleString: any;
    private valueOf: any;
    private hasOwnProperty: any;
    private isPrototypeOf: any;
    private propertyIsEnumerable: any;
}

export default Empty;
