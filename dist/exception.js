"use strict";
const empty_1 = require('./empty');
const option_1 = require('./option');
class Exception extends empty_1.default {
    cause() {
        return option_1.None();
    }
    walk(fn) {
        let current = option_1.Some(this);
        while (current.isSome()) {
            const value = current.value;
            fn(value);
            current = value.cause();
        }
    }
}
exports.Exception = Exception;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZXB0aW9uLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiZXhjZXB0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx3QkFBa0IsU0FBUyxDQUFDLENBQUE7QUFDNUIseUJBQWlDLFVBQVUsQ0FBQyxDQUFBO0FBRTVDLHdCQUF3QyxlQUFLO0lBR2xDLEtBQUs7UUFDUixNQUFNLENBQUMsYUFBSSxFQUFhLENBQUM7SUFDN0IsQ0FBQztJQUVNLElBQUksQ0FBQyxFQUEwQjtRQUNsQyxJQUFJLE9BQU8sR0FBc0IsYUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTVDLE9BQU8sT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7WUFDdEIsTUFBTSxLQUFLLEdBQWUsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUN4QyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDVixPQUFPLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVCLENBQUM7SUFDTCxDQUFDO0FBQ0wsQ0FBQztBQWhCcUIsaUJBQVMsWUFnQjlCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRW1wdHkgZnJvbSAnLi9lbXB0eSc7XG5pbXBvcnQge09wdGlvbiwgU29tZSwgTm9uZX0gZnJvbSAnLi9vcHRpb24nO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRXhjZXB0aW9uIGV4dGVuZHMgRW1wdHkge1xuICAgIHB1YmxpYyBhYnN0cmFjdCBkZXNjcmlwdGlvbigpOiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgY2F1c2UoKTogT3B0aW9uPEV4Y2VwdGlvbj4ge1xuICAgICAgICByZXR1cm4gTm9uZTxFeGNlcHRpb24+KCk7XG4gICAgfVxuXG4gICAgcHVibGljIHdhbGsoZm46IChlOiBFeGNlcHRpb24pID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgbGV0IGN1cnJlbnQ6IE9wdGlvbjxFeGNlcHRpb24+ID0gU29tZSh0aGlzKTtcblxuICAgICAgICB3aGlsZSAoY3VycmVudC5pc1NvbWUoKSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWU6IEV4Y2VwdGlvbiAgPSBjdXJyZW50LnZhbHVlO1xuICAgICAgICAgICAgZm4odmFsdWUpO1xuICAgICAgICAgICAgY3VycmVudCA9IHZhbHVlLmNhdXNlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=