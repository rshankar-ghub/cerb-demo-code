export class CRBServiceHeaders {
    CRBUsersDef = [
        {headerName: 'Employee Id' , field:'EmployeeID'}, 
        {headerName: 'Last Name' , field:'LastName'}, 
        {headerName: 'First Name' , field:'FirstName'}, 
        {headerName: 'Manager', field:'REPORTSTO'},
        {headerName: 'Title' , field:'Title'}, 
        {headerName: 'Birth Date' , field:'BirthDate'}, 
        {headerName: 'Home Phone' , field:'HomePhone'}        
    ];
    CRBOrderDef = [
        {headerName: 'Order Id' , field:'OrderID'}, 
        {headerName: 'Employee Name' , field:'EMPLOYEENAME'}, 
        {headerName: 'Order Date' , field:'OrderDate'}, 
        {headerName: 'Shipped Date' , field:'ShippedDate'}, 
        {headerName: 'Ship Name' , field:'ShipName'}, 
    ];
    CRBOrderDtlDef = [
        {headerName: 'Order Id' , field:'OrderID'}, 
        {headerName: 'Product ID' , field:'ProductID'}, 
        {headerName: 'Product Name' , field:'ProductName'}, 
        {headerName: 'UnitPrice' , field:'ShiUnitPriceppedDate'}, 
        {headerName: 'Quantity' , field:'Quantity'}, 
        {headerName: 'Discount' , field:'Discount'}, 
    ];
}
export interface CRBOrderItems {
        OrderID: string
        EmployeeName: string
        OrderDate: string 
        ShippedDate: string 
        ShipName: string    
}