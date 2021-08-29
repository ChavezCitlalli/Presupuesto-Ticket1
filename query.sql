INSERT INTO presupuestos(
	proyecto,
    version,
	mes,
	createdAt,
	updatedAt
)VALUES (
	'Mi primer presupuesto',
	1,
	'febrero',
	'2021-08-29',
	'2021-08-29'

);

INSERT INTO recursos (
	presupuesto_id,
	concepto,
    costo
	
)VALUES (
	1,
	'ejemplo',
	300
	
);
INSERT INTO recursos_valores (
	
	recurso_id,
    valor
	
)VALUES (
	1,
	367
	
);

INSERT INTO ingresos(
	presupuesto_id,
	concepto	
)VALUES (
	1,
	'concepto 1'		
);
INSERT INTO ingresos_valores (
	ingreso_id,
    valor
)VALUES (
	1,
	378
);
INSERT INTO flujoEfectivos(
	presupuesto_id,
	ingreso	
)VALUES (
	1,
	234		
);
INSERT INTO costos_administrativos(
	presupuesto_id,
	concepto	
)VALUES (
	1,
	'concepto 1'		
);
INSERT INTO costos_admin_valores(
	admin_id,
    valor
)VALUES (
	1,
	378
);
INSERT INTO costos_directos(
	presupuesto_id,
	concepto	
)VALUES (
	1,
	'concepto 1'		
);
INSERT INTO costos_valores(
	directo_id,
    valor
)VALUES (
	1,
	378
);


select *from usuarios
select * from presupuestos;