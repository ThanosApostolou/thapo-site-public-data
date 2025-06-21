# OMV

![](./omv_logo_100.png)

**Ontology Mapping Visualizer** is a software system developed for the purposes of BE "Electrical and Computer Engineering" of National Technical University of Athens. This system analyzes and compares different Ontologies which have been correlated using an external tool called "Ontology Alignment Tool".

## Modules, Components and Technologies
This project uses the following components:
- omv-server
- omv-client

### omv-server
Our backend serves an http REST API. The main functionality covered by this API is analyzing the given ontologies and serving json data to the frontend so that various information can be displayed.

Technologies:
- Java
- Vertx
- OWLAPI.

### ovm-client
Our frontend passes the Ontologies and mapping files, given by the users, to the backend in order to be analyzed. Then it displays various information per Ontology and 3 comparison views:
- Statistics
- Epoptic View
- View by Rule

Technologies:
- HTML
- CSS
- SVG
- TypeScript
- Vue.js
