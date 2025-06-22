# MNHMH 2


![](./mnhmh2_logo_100.png)


Application implementing a web interface for managing and exporting tables and aggregated statements for the needs of the "General Material Management Office" of the 196 Α/Κ ΜΒΠ Army Unit.

## Modules, Components and Technologies
This project uses the following components:
- mnhmh2-server
- mnhmh2-client
- mssql database

### mnhmh2-server
Our backend exposes a simple REST API with CRUD capabilities over all the entities needed for the Material Management Office duties.

Technologies:
- TypeScript
- Express.js
- TypeORM


### mnhmh2-client
Our frontend consists of a GUI application enabling the users to manage the various entities of the Material Management Office/

Technologies:
- TypeScript
- HTML
- CSS
- React
- material-ui

### mssql database
An MsSQL database stores all the entities information of the Material Management.
